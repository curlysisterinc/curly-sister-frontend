/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Calendar from "react-calendar";
import "./calender.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import { getDay, format, minutesToHours } from "date-fns";
import OrangeBtn from "components/customButton/orangeBtn";
import SelectOptions from "components/selectOptions";
import wallet from "../../../assets/images/wallet.svg";
import { ReactComponent as TimerImg } from "../../../assets/images/timer.svg";
import { timeArr } from "../../admin/dashboard/users/data";
import TimeInvtervals from "./timeRange";
import Modal from "../../modal";
import "react-datepicker/dist/react-datepicker.css";
import timeZoneList from "../../../assets/timezone.json";

const days = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 0,
};

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
  bookingTime,
  setBookingTime,
  booking,
  setBooking,
  timeZone,
  changeTimeZone,
}) {
  const [isActive, setIsActive] = React.useState("everyone");

  const [blockedDays, setBlockedDays] = useState([]);
  const [daysAvailable, setDaysAvaiable] = useState([]);
  const [timeRange, setTimeRange] = useState({
    from: null,
    to: null,
  });

  const timerRef = useRef(null);

  const BOOKING_FEE_PERCENT = 0;
  React.useEffect(() => {
    if (data?.bookedservice && serviceOffered) {
      const { default_price } = serviceOffered.find(
        (item) => item._id === data?.bookedservice
      );
      const fee = parseFloat((default_price * BOOKING_FEE_PERCENT) / 100);
      const total = parseInt(default_price, 10) + fee;
      setBookingTotal(total);
      setBookingFee(fee);
    }
  }, [data]);

  const closeModal = () => {
    const content = document.querySelector("#content");
    content.style.position = "unset";
    content.style.position = "initial";
    setVisible(false);
  };

  const continueButton = (e) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, day: booking, time: bookingTime }));
    closeModal();
    setHasService(true);
  };

  const servicesForStylists = useMemo(() => {
    return serviceOffered?.filter(
      (service) => service?.who_is_this_for === "Stylists"
    );
  }, [serviceOffered]);

  const servicesForOthers = useMemo(() => {
    return serviceOffered?.filter(
      (service) => service?.who_is_this_for === "Others"
    );
  }, [serviceOffered]);

  const getDatesInRange = useCallback(
    (dateRange) => {
      const { from, to } = dateRange;

      let currentDate = new Date(from).getTime();
      const endDate = new Date(to).getTime();
      const dates = [];
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate = new Date(currentDate).setDate(
          new Date(currentDate).getDate() + 1
        );
      }
      return dates;
    },
    [availability]
  );

  useEffect(() => {
    if (availability) {
      const blocked = availability.blocked_dates
        .map((item) => getDatesInRange(item))
        .flatMap((v) => v);

      const daysRange = availability.range
        .map((item) => item.days)
        .flatMap((i) => i);
      const numberedDays = daysRange.map((a) => days[a]);
      setDaysAvaiable(numberedDays);
      setBlockedDays(blocked);
    }
  }, [availability]);

  const isAvailableday = (date) => {
    const day = getDay(date);
    return daysAvailable.includes(day);
  };

  const handleTimerDisplay = (selectedBooking) => {
    const day = getDay(selectedBooking);
    const currentDay = Object.keys(days).find((item) => {
      if (days[item] === day) {
        return item;
      }
      return null;
    });

    const time = availability.range.find((item) =>
      item.days.includes(currentDay)
    )?.time_range;
    const { from, to } = time;
    const bookingString = selectedBooking?.toString().split(" ");
    const bookingFromString = [...bookingString];
    const bookingToString = [...bookingString];
    bookingFromString[4] = from;
    bookingToString[4] = to;

    const timerItem = {
      from: new Date(bookingFromString.join(" ")),
      to: new Date(bookingToString.join(" ")),
    };

    timerRef.current = timerItem;
  };

  const handleChangeDate = (a, b) => {
    setBooking(a);
    handleTimerDisplay(a);
    setBookingTime(null);
  };

  const setTimerFunc = (a, b) => {
    const newTime = a.toString().split(" ")[4];
    const timerString = timerRef.current?.from?.toString().split(" ");
    timerString[4] = newTime;
    const finalTime = new Date(timerString.join(" "));
    console.log(finalTime);
    setBookingTime(finalTime);
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  const handleFormatTime = useCallback(
    (totalMinutes) => {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);
      const hoursText = hours > 1 ? "hours" : "hour";
      const minutesText = minutes > 1 ? "minutes" : "minutes";

      const hoursValue =
        hours > 0 ? ` ${padTo2Digits(hours)} ${hoursText}` : "";
      const minutesValue =
        minutes > 0 ? ` ${padTo2Digits(minutes)} ${minutesText}` : "";
      return `${hoursValue} ${minutesValue} `;
    },
    [servicesForOthers, servicesForStylists]
  );

  const handleDisabled = useMemo(() => {
    if (!data.bookedservice || !booking || !bookingTime) {
      return true;
    }
    return false;
  }, [data, booking, bookingTime]);

  const handleTimerDuration = useMemo(() => {
    return serviceOffered.find((item) => item?._id === data?.bookedservice)
      ?.duration;
  }, [serviceOffered, data.bookedservice, booking]);

  return (
    <Modal
      isOpen={visible}
      onRequestClose={closeModal}
      overlayColor=" rgba(68, 60, 77, 0.8)"
    >
      <form
        onSubmit={continueButton}
        className="bg-white rounded-2xl shadow-md  min-h-full relative  w-95vw max-w-1170 h-90vh max-h-screen md:max-h-700  flex flex-col md:flex-row overflow-auto m-auto"
      >
        <div className="  border-r border-gray-250 grow-0 basis-1/2 md:basis-428 ">
          <div>
            <div className="p-4 md:p-8">
              <p className="text-sm text-gray-400">Choose a service</p>
              <div className="flex items-center space-x-5 w-full mt-3">
                {!!servicesForOthers?.length && (
                  <button
                    type="button"
                    onClick={() => setIsActive("everyone")}
                    className={`text-sm pb-1 border-b-4 cursor-pointer ${
                      isActive === "everyone"
                        ? "text-purple-100  border-purple-100 "
                        : "text-gray-300 border-white"
                    }`}
                  >
                    For everyone
                  </button>
                )}
                {!!servicesForStylists?.length && (
                  <button
                    type="button"
                    onClick={() => setIsActive("stylists")}
                    className={`text-sm pb-1 cursor-pointer border-b-4 ${
                      isActive === "stylists"
                        ? "text-purple-100  border-purple-100 "
                        : "text-gray-300 border-white"
                    }`}
                  >
                    For stylists
                  </button>
                )}
              </div>
            </div>
            <div className="h-400 overflow-y-scroll">
              {isActive === "everyone" && (
                <div className="divide-y divide-gray-250">
                  {servicesForOthers?.map((service) => {
                    return (
                      <div
                        key={service?._id}
                        className={`${
                          data.bookedservice === service?._id
                            ? "bg-purple-50"
                            : "bg-gray-50"
                        } p-4 pt-6 md:p-8 flex items-start space-x-4`}
                      >
                        <input
                          id={service.name}
                          type="radio"
                          name="everyone"
                          onChange={() =>
                            setData((prev) => ({
                              ...prev,
                              bookedservice: service?._id,
                            }))
                          }
                          value={service?._id}
                          checked={data.bookedservice === service?._id}
                          className="w-6 h-6 text-purple-100 bg-transparent rounded-full border-gray-250 focus:ring-purple-100 dark:focus:ring-purple-100 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={service.name}
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
                                <p className="text-gray-400 ml-1.5">
                                  ${service.default_price}
                                </p>
                              </div>
                            </div>
                            <div className="bg-white inline-block w-auto rounded-md  p-1">
                              <div className="flex items-center text-sm ">
                                <TimerImg />
                                <p className="text-gray-400 ml-1.5">
                                  {handleFormatTime(service.duration)}
                                </p>
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
                <div className="divide-y divide-gray-250">
                  {servicesForStylists?.map((service) => {
                    return (
                      <div
                        key={service?._id}
                        className={`${
                          data.bookedservice === service?._id
                            ? "bg-purple-50"
                            : "bg-gray-50"
                        } p-4 pt-6 md:p-8 flex items-start space-x-4`}
                      >
                        <input
                          id="default-checkbox"
                          type="radio"
                          name="stylist"
                          onChange={() =>
                            setData((prev) => ({
                              ...prev,
                              bookedservice: service?._id,
                            }))
                          }
                          value={service?._id}
                          checked={data.bookedservice === service?._id}
                          className="w-6 h-6 text-purple-100 bg-transparent rounded-full border-gray-250 focus:ring-purple-100 dark:focus:ring-purple-100 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                                <TimerImg />
                                <p className="text-gray-400 ml-1.5">
                                  {handleFormatTime(service.duration)}
                                </p>
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
        <div className="p-4 pt-6 md:px-4 lg:px-10 md:py-8 grow-0 md:flex-1 w-full">
          {data.bookedservice && (
            <section>
              <header>
                <h4 className="text-sm">Choose a date and time</h4>
              </header>
              <div className="py-4">
                <section className="flex flex-col lg:flex-row pb-6 relative w-full">
                  <div className="pb-6 border-b border-gray-250 text-center mb-6 lg:basis-350 lg:p-0 lg:grow-0 lg:border-none lg:margin-none lg:pr-5 w-full no-shadow">
                    <DatePicker
                      selected={booking}
                      inline
                      onChange={handleChangeDate}
                      filterDate={isAvailableday}
                      minDate={Date.now()}
                      excludeDates={blockedDays}
                      disabled
                    />
                  </div>

                  {booking && (
                    <section className="md:col-start-3 md:col-end-4 flex-grow">
                      <header className="pb-6 border-b border-gray-250 text-center">
                        <h5 className="text-sm">
                          {format(booking, "E, d LLL yyyy")}
                        </h5>
                      </header>
                      <DatePicker
                        selected={bookingTime}
                        onChange={(date) => setTimerFunc(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        inline
                        timeIntervals={handleTimerDuration}
                        minTime={timerRef?.current?.from}
                        maxTime={timerRef?.current?.to}
                        dateFormat="h:mm aa"
                      />
                    </section>
                  )}
                </section>
                <section className="border-t-0 md:border-t border-solid border-gray-250 md:pt-6 lg:flex flex-col md:flex-row">
                  <div className="flex mb-6 justify-center items-center h-fit flex-1 lg:mr-4">
                    <TimerImg />
                    <SelectOptions
                      placeholder="Select Timezone"
                      value={timeZone}
                      onChange={changeTimeZone}
                      name="timeZone"
                      // selectedValue="label"
                      optionvalue="label"
                      optionlabelvalue="label"
                      collection={timeZoneList}
                      containerStyle="ml-4 border-0"
                      className="border-0 cursor-pointer"
                    />
                  </div>
                  <div className="mb-3 flex-1 lg:ml-4">
                    <SelectOptions
                      name="timeZone"
                      optionvalue="label"
                      optionlabelvalue="label"
                      collection={["Virtual", "Walk-in"]}
                      containerStyle="mb-3"
                    />
                    <SelectOptions
                      // placeholder="Select Timezone"
                      // value={timeZone}
                      // onChange={changeTimeZone}
                      name="timeZone"
                      // selectedValue="label"
                      optionvalue="label"
                      optionlabelvalue="label"
                      collection={["One time", "Repeated"]}
                      // className="mb-3"
                    />
                    <div className="flex justify-end items-end">
                      <OrangeBtn
                        type="submit"
                        buttonAction="Continue"
                        className="mt-4 rounded-full w-auto px-10 h-12"
                        disabled={handleDisabled}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </section>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ChooseServiceModal;
