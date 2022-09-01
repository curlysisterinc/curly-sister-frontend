/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prefer-const */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React from "react";

import {
  MdArrowForwardIos,
  MdOutlineBookmark,
  MdOutlineMail,
} from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineLocationMarker, HiOutlinePhotograph } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import { AiTwotoneStar } from "react-icons/ai";
import SideBarComponent from "../../sidebar";
import avatar from "../../../assets/images/avatar1.png";
import profilePix1 from "../../../assets/images/stylist-profile1.png";
import profilePix2 from "../../../assets/images/stylist-profile2.png";
import Reviews from "./reviews";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import GalleryModal from "./profile/galleryModal";
import ChooseServiceModal from "./chooseServiceModal";
import { AuthRoutes } from "constants";

export const BookServiceCard = ({
  serviceOffered,
  availability,
  stylistId,
  ...props
}) => {
  const [hasService, setHasService] = React.useState(false);
  const [chooseServiceVisible, setChooseServiceVisible] = React.useState(false);
  const [data, setData] = React.useState({ stylistId });
  const navigate = useNavigate();
  const [bookingFee, setBookingFee] = React.useState(0);
  const [bookingTotal, setBookingTotal] = React.useState(0);

  return (
    <div className="bg-white rounded-lg shadow-s05 h-auto w-auto">
      <div className="px-4 pt-6">
        <p className="text-base font-BeatriceSemiBold text-gray-400">
          Book a service
        </p>
        <button
          onClick={() => setChooseServiceVisible((prev) => !prev)}
          className="border border-gray-250 rounded-full w-full my-4 flex justify-between items-center h-12 px-3"
        >
          <span className="text-sm text-gray-400">
            Select service, day and time
          </span>
          <MdArrowForwardIos color="#8E8695" />
        </button>
      </div>
      {hasService && (
        <div className="bg-gray-50 p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="">
              <p className="text-sm text-gray-400">
                {data?.bookedservice?.name}
              </p>
              <p className="text-xs text-gray-200 mb-1">
                {/* Tues, 22 Mar · 12:00 PM (GMT+1) */}
                {data?.day.toString()}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              ${data?.bookedservice?.default_price}
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
      )}
      <div className="px-6 ">
        <button
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
        </p>
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
              href={`https://${props.facebook.replace("https://")}`}
              target="_blank"
              aria-describedby="users facebook account"
              rel="noreferrer"
            >
              <ImFacebook2 color="#443C4D" size={22} />
            </a>
          )}

          {props.instagram && (
            <a
              href={`https://${props.instagram.replace("https://")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="users instagram account"
            >
              <FiInstagram color="#443C4D" size={22} />
            </a>
          )}

          {props.website && (
            <a
              href={`https://${props.website.replace("https://")}`}
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
        />
      )}
    </div>
  );
};
