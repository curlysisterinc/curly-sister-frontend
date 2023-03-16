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

import { IoIosArrowBack } from "react-icons/io";
import { HiOutlinePhotograph } from "react-icons/hi";

import { AiTwotoneStar } from "react-icons/ai";
import avatar from "../../../assets/images/avatar1.png";
import profilePix1 from "../../../assets/images/stylist-profile1.png";
import profilePix2 from "../../../assets/images/stylist-profile2.png";
import Reviews from "./reviews";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import GalleryModal from "./profile/galleryModal";
import { BookServiceCard } from "./BookServiceCard";

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
      <div className="bg-white px-0 pt-4 pb-10 w-full min-h-screen relative">
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
