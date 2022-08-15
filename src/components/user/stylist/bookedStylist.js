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
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import GalleryModal from "./profile/galleryModal";
import ChooseServiceModal from "./chooseServiceModal";
import { AuthRoutes } from "constants";

export const BookServiceCard = ({
  serviceOffered,
  availability,
  stylistId,
}) => {
  const [hasService, setHasService] = React.useState(false);
  const [chooseServiceVisible, setChooseServiceVisible] = React.useState(false);
  const [data, setData] = React.useState({ stylistId });
  const navigate = useNavigate();
  console.log(data);
  const [bookingFee, setBookingFee] = React.useState(0);
  const [bookingTotal, setBookingTotal] = React.useState(0);

  return (
    <div className="bg-white rounded-lg shadow-xl h-auto w-auto">
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
                {data?.bookedservice.name}
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

function BookedStylistProfile() {
  const [hasReview, setHasReview] = React.useState(true);
  const [galleryVisible, setGalleryVisible] = React.useState(false);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
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
        <div className=" w-full h-500 absolute mt-5 ">
          <div className="relative book-stylist">
            <div
              onClick={() => setGalleryVisible(true)}
              className="absolute z-40 right-10 top-10 bg-white p-1 rounded-lg flex items-center space-x-1 cursor-pointer"
            >
              <HiOutlinePhotograph color="black" size={20} />
              <p className="text-sm text-gray-400">View gallery</p>
            </div>
            <Slider {...settings}>
              <div>
                <img src={profilePix2} alt="" className="w-full " />
              </div>
              <div>
                <img src={profilePix1} alt="" className="w-full " />
              </div>{" "}
              <div>
                <img src={profilePix2} alt="" className="w-full " />
              </div>{" "}
              <div>
                <img src={profilePix1} alt="" className="w-full " />
              </div>
              <div>
                <img src={profilePix2} alt="" className="w-full " />
              </div>
            </Slider>
          </div>
        </div>
        <div className="flex justify-between px-16 relative z-40 mt-48">
          <div className="w-7/12 ">
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
            <BookServiceCard />
          </div>
        </div>
      </div>
      <GalleryModal visible={galleryVisible} setVisible={setGalleryVisible} />
    </div>
  );
}

export default BookedStylistProfile;
