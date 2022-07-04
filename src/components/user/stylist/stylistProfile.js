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
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import { AiTwotoneStar } from "react-icons/ai";
import SideBarComponent from "../../sidebar/sidebar";
import avatar from "../../../assets/images/avatar1.png";
import banner from "../../../assets/images/stylist-profile-banner.png";
import Reviews from "./reviews";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "constants";

const BookServiceCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-xl h-auto w-auto">
      <div className="p-6">
        <p className="text-base font-BeatriceSemiBold text-gray-400">
          Book a service
        </p>
        <div className="border border-gray-250 rounded-full w-full my-4 flex justify-between items-center h-12 px-3">
          <p className="text-sm text-gray-400">Select service, day and time</p>
          <MdArrowForwardIos color="#8E8695" />
        </div>
      </div>
      <div className="bg-gray-50 p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="">
            <p className="text-sm text-gray-400">Product recommendation</p>
            <p className="text-xs text-gray-200 mb-1">
              Tues, 22 Mar · 12:00 PM (GMT+1)
            </p>
          </div>
          <p className="text-sm text-gray-400">$35</p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="text-sm text-gray-400">Booking fee</p>

          <p className="text-sm text-gray-400">$5</p>
        </div>
        <hr className="w-full border border-gray-600 my-4" />
        <div className="flex justify-between items-center ">
          <p className="text-sm text-gray-400">Total</p>

          <p className="text-base text-gray-400 font-BeatriceSemiBold">$40</p>
        </div>
      </div>
      <div className="p-6">
        <button
          onClick={() => navigate(AuthRoutes.confirmBooking)}
          className="mt-4 bg-orange-200 rounded-full w-full h-12 flex justify-center items-center text-white font-BeatriceSemiBold"
        >
          Continue
        </button>
        <p className="text-xs text-gray-300 text-center mt-3">
          Don’t worry, you won’t be charged yet
        </p>
      </div>
      <hr className="w-full border border-gray-600 my-4" />
      <div className="px-6 py-3 flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <HiOutlineLocationMarker color="#443C4D" />
          <p className="text-sm text-gray-400">
            333, Fremont Street, SF, CA (12km)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <BsTelephone color="#443C4D" />
          <p className="text-sm text-gray-400">(636) 763-9867</p>
        </div>
        <div className="flex items-center space-x-3">
          <MdOutlineMail color="#443C4D" />
          <p className="text-sm text-gray-400">hello@allnaturals.com</p>
        </div>
      </div>
      <hr className="w-full border border-gray-600 my-4" />
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-5">
          <ImFacebook2 color="#443C4D" size={22} />
          <FiInstagram color="#443C4D" size={22} />
          <RiGlobalLine color="#443C4D" size={22} />
        </div>
        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
          <MdOutlineBookmark color="white" size={26} />
        </span>
      </div>
    </div>
  );
};

const NotBookServiceCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl h-auto w-auto">
      <div className="p-6 flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <HiOutlineLocationMarker color="#443C4D" />
          <p className="text-sm text-gray-400">
            333, Fremont Street, SF, CA (12km)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <BsTelephone color="#443C4D" />
          <p className="text-sm text-gray-400">(636) 763-9867</p>
        </div>
        <div className="flex items-center space-x-3">
          <MdOutlineMail color="#443C4D" />
          <p className="text-sm text-gray-400">hello@allnaturals.com</p>
        </div>
      </div>
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-5">
          <ImFacebook2 color="#443C4D" size={22} />
          <FiInstagram color="#443C4D" size={22} />
          <RiGlobalLine color="#443C4D" size={22} />
        </div>
        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
          <MdOutlineBookmark color="white" size={26} />
        </span>
      </div>
    </div>
  );
};
function StylistProfile() {
  const [hasReview, setHasReview] = React.useState(true);
  const [bookedService, setBookedService] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="stylist" />
      <div className="ml-80 bg-white px-0 pt-4 pb-10 w-full min-h-screen relative">
        <div
          className="flex space-x-0 items-center cursor-pointer pt-4  px-6"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
          <p className="text-sm font-AvenirLTPro-Heavy text-gray-400 uppercase">
            GO Back
          </p>
        </div>
        <img src={banner} alt="" className="w-full " />
        <div className="flex justify-between px-16 -mt-24">
          <div className="w-7/12">
            <div className="flex justify-between items-end">
              <img className="" src={avatar} alt="" />
              <div className="flex  space-x-2">
                <AiTwotoneStar color="#590BA9" />
                <span className="text-sm font-BeatriceMedium">
                  4.89{" "}
                  <span className="text-slate-400 text-xs font-BeatriceRegular text-gray-200">
                    (12 reviews)
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-3 mt-4">
              <p className="text-base font-BeatriceSemiBold text-gray-400">
                All Naturals
              </p>
              <p className="text-sm text-gray-400">
                Here’s a short version of a bio where one has been provided.
                We’ve worked with celebrity clients including Beyonce, Rihanna,
                and Lady Gaga.
              </p>
            </div>
            <div className="mt-8 flex flex-col space-y-8">
              <div className="">
                <p className="text-base text-gray-400">Certifications</p>
                <div className="flex space-x-3 items-center mt-5">
                  <div className="rounded-full px-3 py-2 border border-purple-100 bg-white text-purple-100 text-sm">
                    Deva Level 1
                  </div>
                  <div className="rounded-full px-3 py-2 border border-purple-100 bg-white text-purple-100 text-sm">
                    Ouidad
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-base text-gray-400">Services</p>
                <div className="flex space-x-3 items-center mt-5">
                  <div className="rounded-full px-3 py-2 border border-purple-100 bg-white text-purple-100 text-sm">
                    Product recommendation
                  </div>
                  <div className="rounded-full px-3 py-2 border border-purple-100 bg-white text-purple-100 text-sm">
                    Consultation
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-base text-gray-400">Tags</p>
                <div className="flex space-x-3 items-center mt-5">
                  <div className="rounded-full px-3 py-2 border border-purple-100 bg-white text-purple-100 text-sm">
                    Color specialist
                  </div>
                  <div className="rounded-full px-3 py-2 border border-purple-100 bg-white text-purple-100 text-sm">
                    Works with kids
                  </div>
                  <div className="rounded-full px-3 py-2 border border-purple-100 bg-white text-purple-100 text-sm">
                    All hair types
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-base text-gray-400 mb-5">Reviews</p>
                {hasReview ? <Reviews /> : <p>No reviews yet</p>}
              </div>
            </div>
          </div>
          <div className=" h-auto ">
            {bookedService ? <BookServiceCard /> : <NotBookServiceCard />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StylistProfile;
