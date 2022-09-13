/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { AuthRoutes } from "constants";
import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import avatar2 from "../assets/images/gradient-avatar.svg";
import galleryBanner from "../assets/images/stylist-profile-banner.png";

export default function CommonCard({ stylist }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/stylists/profile/${stylist._id}`);
      }}
      className="col-1 rounded-2xl shadow-s01 relative overflow-hidden cursor-pointer w-full border border-gray-600"
    >
      <div className="absolute top-0 right-0 mr-4 mt-4 ">
        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
          <MdOutlineBookmarkBorder color="white" />
        </span>
      </div>
      <div className="w-full h-40">
        {stylist.gallery.length > 0 ? (
          <img
            src={stylist.gallery[0]}
            className="w-full h-40 object-cover "
            alt=""
          />
        ) : (
          <img
            src={galleryBanner}
            className="w-full h-40 absolute object-none"
            alt=""
          />
        )}
      </div>
      <div className="bg-white px-5 py-3 relative">
        <div className="flex justify-between items-start">
          <img
            className="-mt-14  w-20 h-20 rounded-full object-cover"
            src={stylist.photo ? stylist.photo : avatar2}
            alt=""
          />
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
            {stylist.business_name}
          </p>
          <p className="text-sm text-gray-400 line-clamp-2">
            {stylist.description}
          </p>
          <p className="text-sm text-gray-200">{stylist.address}</p>
        </div>
      </div>
    </div>
  );
}
