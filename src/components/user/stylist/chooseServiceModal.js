import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calender.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import wallet from "../../../assets/images/wallet.svg";
// import timer from "../../../assets/images/timer.svg";
import { timeArr } from "../../admin/dashboard/users/data";
import TimeInvtervals from "./timeRange";
import Modal from "../../modal";

function ChooseServiceModal({
  availability,
  serviceOffered,
  visible,
  setData,
  data,
  setVisible,
  setBookingFee,
  setHasService,
  setBookingTotal,
}) {
  const [isActive, setIsActive] = React.useState("everyone");
  const [booking, setBooking] = useState(new Date());
  const [timer, setTimer] = useState("");

  console.log(availability, "availability");
  const BOOKING_FEE_PERCENT = 0;
  React.useEffect(() => {
    if (data?.bookedservice?.default_price) {
      const fee = parseFloat(
        (data.bookedservice.default_price * BOOKING_FEE_PERCENT) / 100
      );
      console.log(fee, "fee");
      const total = parseInt(data.bookedservice.default_price, 10) + fee;
      setBookingTotal(total);
      setBookingFee(fee);
    }
  }, [data]);
  // const {
  //   blocked_dates: [{ startDate, endDate }],
  //   range: [{ days, time_range }],
  // } = availability;

  // console.log(days, time_range, "days");
  // console.log(startDate, endDate, "startend");
  // console.log(new Date(startDate), "start", new Date(endDate), "end");

  const styleDates = ({ date, view }) => {
    const current = new Date();
    // const start_date = new Date(startDate);
    // const end_date = new Date(endDate);

    if (view === "month") {
      if (
        date.getDate() === current.getDate() &&
        current.getMonth() === date.getMonth() &&
        current.getFullYear() === date.getFullYear()
      ) {
        return "text-white text-sm bg-purple-100 rounded-full w-8 h-8 flex-none";
      }
      if (
        booking.getDate() === date.getDate() &&
        booking.getMonth() === date.getMonth()
      ) {
        return "text-white text-sm bg-orange-200 rounded-full w-8 h-8 flex-none";
      }
      // if ([1, 7, 13, 9].includes(date.getDate())) {
      //   return "text-purple-100 font-semibold";
      // }
      // if (
      //   start_date.getFullYear() >= date.getFullYear() &&
      //   end_date.getFullYear() >= date.getFullYear() &&
      //   start_date.getMonth() >= date.getMonth() &&
      //   end_date.getMonth() >= date.getMonth()
      // ) {
      //   return "text-purple-100 font-semibold";
      // }

      return "text-gray-700 text-sm w-8 h-8 flex-none";
    }
    return "";
  };

  // eslint-disable-next-line no-unused-vars
  const disableDates = ({ date }) => {
    // const start_date = new Date(startDate);
    // const end_date = new Date(endDate);

    // if (start_date.getDate() > date.getDate() > end_date.getDate()) {
    //   return true;
    // }

    // if (.includes(date.getDate())) {
    // }
    return false;
  };

  const closeModal = () => {
    setVisible(false);
  };
  const continueButton = (e) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, day: booking, time: timer }));
    setVisible(false);
    setHasService(true);
  };

  const getServices2 = serviceOffered?.filter(
    (service) =>
      service?.who_is_this_for === "Every" ||
      service?.who_is_this_for === "Others"
  );

  const getServices1 = serviceOffered?.filter(
    (service) =>
      service?.who_is_this_for !== "Every" ||
      service?.who_is_this_for !== "Others"
  );

  console.log(getServices1, "stylist", getServices2, "every");

  return (
    <Modal isOpen={visible} onRequestClose={closeModal}>
      <form
        onSubmit={continueButton}
        className="bg-white rounded-2xl shadow-md overflow-hidden h-full relative  w-full grid grid-cols-12 "
      >
        <div className=" col-span-5 border-r border-gray-250">
          <div>
            <div className="p-8">
              <p className="text-sm text-gray-400">Choose a service</p>
              <div className="flex items-center space-x-5 w-full mt-3">
                <button
                  type="button"
                  onClick={() => setIsActive("everyone")}
                  className={`text-sm pb-3 border-b-4 cursor-pointer ${
                    isActive === "everyone"
                      ? "text-purple-100  border-purple-100 "
                      : "text-gray-300 border-white"
                  }`}
                >
                  For everyone
                </button>
                <button
                  type="button"
                  onClick={() => setIsActive("stylists")}
                  className={`text-sm pb-3 cursor-pointer border-b-4 ${
                    isActive === "stylists"
                      ? "text-purple-100  border-purple-100 "
                      : "text-gray-300 border-white"
                  }`}
                >
                  For stylists
                </button>
              </div>
            </div>
            <div className="h-400 overflow-y-scroll">
              {isActive === "everyone" && (
                <div className="divide-y divide-gray-250">
                  {getServices1.map((service) => {
                    return (
                      <div
                        key={service?._id}
                        className="bg-gray-50 p-8 flex items-start space-x-4"
                      >
                        <input
                          id="default-checkbox"
                          type="radio"
                          name="everyone"
                          onChange={() =>
                            setData((prev) => ({
                              ...prev,
                              bookedservice: { ...service },
                            }))
                          }
                          value={service}
                          className="w-6 h-6 text-blue-600 bg-transparent rounded-full border-gray-250 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          <p className="text-base font-BeatriceSemiBold text-gray-400 mb-2">
                            {service.name}
                          </p>
                          <p className="text-sm text-gray-200">
                            {service.description}
                          </p>
                          <div className="flex space-x-3 mt-3">
                            <div className="bg-white inline-block w-auto rounded-md  p-1">
                              <div className="flex items-center text-sm">
                                <img src={wallet} alt="" />
                                <p>${service.default_price}</p>
                              </div>
                            </div>
                            <div className="bg-white inline-block w-auto rounded-md  p-1">
                              <div className="flex items-center text-sm">
                                <img src={timer} alt="" />
                                <p>{service.duration} mins</p>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
              {isActive === "stylists" && (
                <div>
                  {getServices2.map((service) => {
                    return (
                      <div
                        key={service?._id}
                        className="bg-gray-50 p-8 flex items-start space-x-4"
                      >
                        <input
                          id="default-checkbox"
                          type="radio"
                          name="stylist"
                          onChange={() =>
                            setData((prev) => ({
                              ...prev,
                              bookedservice: { ...service },
                            }))
                          }
                          value={service}
                          className="w-6 h-6 text-blue-600 bg-transparent rounded-full border-gray-250 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          <p className="text-base font-BeatriceSemiBold text-gray-400 mb-2">
                            {service.name}
                          </p>
                          <p className="text-sm text-gray-200">
                            {service.description}
                          </p>
                          <div className="flex space-x-3 mt-3">
                            <div className="bg-white inline-block w-auto rounded-md  p-1">
                              <div className="flex items-center text-sm">
                                <img src={wallet} alt="" />
                                <p>${service.default_price}</p>
                              </div>
                            </div>
                            <div className="bg-white inline-block w-auto rounded-md  p-1">
                              <div className="flex items-center text-sm">
                                <img src={timer} alt="" />
                                <p>{service.duration} mins</p>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" col-span-7 px-10 py-8 ">
          <section>
            <header>
              <h4 className="text-sm">Choose a date and time</h4>
            </header>
            <div className="py-4">
              <section className="grid grid-cols-bookings pb-6">
                <Calendar
                  className="col-start-1 col-end-2"
                  tileClassName={styleDates}
                  tileDisabled={disableDates}
                  // tileDisabled={({ date }) =>
                  //   [1, 7, 13, 9].includes(date.getDate())
                  // }
                  view="month"
                  onClickDay={(e) => console.log(e)}
                  onChange={setBooking}
                  value={booking}
                />
                <section className="col-start-3 col-end-4">
                  <header className="pb-3 border-b border-gray-800 text-center">
                    <h5 className="text-sm">Tue, 22 Mar 2022</h5>
                  </header>
                  <div className="pt-8 flex h-80 overflow-y-scroll flex-col gap-y-2">
                    {timeArr
                      // .filter((time, index) => {
                      //   const from = timeArr.indexOf(
                      //     (itm) => itm.value === time_range.from
                      //   );
                      //   const to = timeArr.indexOf(
                      //     (itm) => itm.value === time_range.to
                      //   );
                      //   if (from >= index >= to) {
                      //     return true;
                      //   }
                      //   return false;
                      // })
                      ?.map((time) => (
                        <TimeInvtervals
                          key={time.label}
                          changeHandler={setTimer}
                          selected={timer}
                          title={time.label}
                          value={time.value}
                        />
                      ))}
                  </div>
                </section>
              </section>
              <section className="border-t border-solid border-gray-800 pt-6 grid grid-cols-bookings">
                <div>
                  <img src={timer} alt="timezone" />
                  <p>GMT +1: Central European Time (01:28)</p>
                </div>
                <div>
                  <p>Virtual</p>
                </div>
              </section>
            </div>
            <div className="flex justify-end items-end">
              <button
                type="submit"
                // onClick={continueButton}
                className="mt-4 bg-orange-200 rounded-full w-auto px-10 h-12 inline-block text-white font-BeatriceSemiBold"
              >
                Continue
              </button>
            </div>
          </section>
        </div>
      </form>
    </Modal>
  );
}

export default ChooseServiceModal;
