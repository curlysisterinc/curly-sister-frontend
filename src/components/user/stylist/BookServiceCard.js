import React, { useMemo, useState } from "react";

import {
  MdArrowForwardIos,
  MdOutlineBookmark,
  MdOutlineMail,
} from "react-icons/md";
import { HiOutlineLocationMarker, HiOutlinePhotograph } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "constants";
import { format } from "date-fns";
import ChooseServiceModal from "./chooseServiceModal";

export function BookServiceCard({
  serviceOffered,
  availability,
  stylistId,
  ...props
}) {
  const [hasService, setHasService] = React.useState(false);
  const [chooseServiceVisible, setChooseServiceVisible] = React.useState(false);
  const [data, setData] = React.useState({ stylistId });
  const navigate = useNavigate();
  const [bookingFee, setBookingFee] = React.useState(0);
  const [bookingTotal, setBookingTotal] = React.useState(0);
  const [bookingTime, setBookingTime] = useState(null);
  const [booking, setBooking] = useState(null);
  const [timeZone, setTimeZone] = useState(null);

  console.log({ serviceOffered, availability, stylistId, ...props });

  const bookedservice = useMemo(() => {
    return serviceOffered.find((item) => item._id === data?.bookedservice);
  }, [serviceOffered, data]);

  const changeTimeZone = (e) => {
    console.log(e);
  };

  return (
    <div className="bg-white rounded-lg shadow-s05 h-auto w-auto">
      <div className="px-4 pt-6">
        <p className="text-base font-BeatriceSemiBold text-gray-400">
          Book a service
        </p>
        {/* <button
          type="button"
          onClick={() => setChooseServiceVisible((prev) => !prev)}
          className="border border-gray-250 rounded-full w-full my-4 flex justify-between items-center h-12 px-3"
        >
          <span className="text-sm text-gray-400">
            Select service, day and time
          </span>
          <span className="text-sm text-gray-400">
            Select service, day and time
          </span>
          <MdArrowForwardIos color="#8E8695" />
        </button> */}
      </div>
      {/* {hasService && (
        <div className="bg-gray-50 p-4 mb-5">
          <div className="flex justify-between items-start mb-4">
            <div className="">
              <p className="text-sm text-gray-400">{bookedservice?.name}</p>
              <p className="text-xs text-gray-200 mb-1">
                {bookingTime && format(bookingTime, "E, d LLL - KK:mm a (O)")}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              ${bookedservice?.default_price}
            </p>
          </div>
          <div className="flex justify-between items-center ">
            <p className="text-sm text-gray-400">Booking fee</p>

            <p className="text-sm text-gray-400">${bookingFee}</p>
          </div>
          <hr className="w-full border border-gray-600 my-4" />
          <div className="flex justify-between items-center ">
            <p className="text-sm text-gray-400">Total</p>

            <p className="text-base text-gray-400 font-BeatriceSemiBold">
              ${bookingTotal}
            </p>
          </div>
        </div>
      )} */}
      <div className="px-6 ">
        {/* <button
          type="button"
          disabled={!hasService}
          onClick={() =>
            navigate(AuthRoutes.confirmBooking, {
              state: { ...data, bookingTotal, bookingFee },
            })
          }
          className="disabled:opacity-40 bg-orange-200 rounded-full w-full h-12 flex justify-center items-center text-white font-BeatriceSemiBold"
        >
          Continue
        </button>
        <p className="text-xs text-gray-300 text-center mt-3">
          Don’t worry, you won’t be charged yet
        </p> */}

        {/* <a
          href="mailto:info@curlysister.com&subject=Request%20a%20booking%20with%20a%20stylist" */}

        <a
          href={`mailto:info@curlysister.com?subject=Request%20a%20booking%20with%20${props.business_name}&body=i'd%20like%20to%20request%20a%20booking%20with%20${props.business_name}%20whose%20profile%20can%20be%20found%20here%20${window.location.href}`}
          target="_blank" // type="button"
          // onClick={() => setChooseServiceVisible((prev) => !prev)}
          className="disabled:opacity-40 bg-orange-200 rounded-full w-full h-12 flex justify-center items-center text-white font-BeatriceSemiBold my-4 "
          rel="noreferrer"
        >
          Request a booking
        </a>
      </div>
      <hr className="w-full border border-gray-600 my-4" />
      <div className="px-6 py-3 flex flex-col space-y-3">
        {props?.address && (
          <div className="flex items-center space-x-3">
            <HiOutlineLocationMarker color="#443C4D" />
            <p className="text-sm text-gray-400">{props.address}</p>
          </div>
        )}
        {props?.phone_no && (
          <div className="flex items-center space-x-3">
            <BsTelephone color="#443C4D" />
            <p className="text-sm text-gray-400">{props?.phone_no}</p>
          </div>
        )}
        {props?.email && (
          <div className="flex items-center space-x-3">
            <MdOutlineMail color="#443C4D" />
            <p className="text-sm text-gray-400">{props.email}</p>
          </div>
        )}
      </div>
      <hr className="w-full border border-gray-600 my-4" />
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-5">
          {props.facebook && (
            <a
              href={`https://${props.facebook.replace("https://", "")}`}
              target="_blank"
              aria-describedby="users facebook account"
              rel="noreferrer"
            >
              <ImFacebook2 color="#443C4D" size={22} />
            </a>
          )}

          {props.instagram && (
            <a
              href={`https://${props.instagram.replace("https://", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="users instagram account"
            >
              <FiInstagram color="#443C4D" size={22} />
            </a>
          )}

          {props.website && (
            <a
              href={props.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="users website account"
            >
              <RiGlobalLine color="#443C4D" size={22} />
            </a>
          )}
        </div>
        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
          <MdOutlineBookmark color="white" size={26} />
        </span>
      </div>
      {chooseServiceVisible && (
        <ChooseServiceModal
          serviceOffered={serviceOffered}
          availability={availability}
          setData={setData}
          data={data}
          visible={chooseServiceVisible}
          setVisible={setChooseServiceVisible}
          setHasService={setHasService}
          setBookingFee={setBookingFee}
          setBookingTotal={setBookingTotal}
          bookingTime={bookingTime}
          setBookingTime={setBookingTime}
          booking={booking}
          setBooking={setBooking}
          timeZone={timeZone}
          changeTimeZone={changeTimeZone}
        />
      )}
    </div>
  );
}
