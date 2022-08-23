/* eslint-disable import/order */
import React from "react";
import communityPix1 from "../../assets/images/community-pix1.png";
import communityPix2 from "../../assets/images/community-pix2.png";
import { NonAuthRoutes } from "../../constants";
import { useNavigate } from "react-router-dom";

function CommunitySection() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-10 flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <img
          className="h-auto w-20 md:w-auto md:h-52"
          src={communityPix1}
          alt="community pix"
        />

        <div className="text-center md:mt-20 md:mx-16 my-6 mb-0">
          <p className="text-gray-200  md:text-base text-xs mb-2">
            ASK, SHARE, AND LEARN
          </p>
          <h2 className="text-2xl font-GTSuperTextBlack md:text-4xl text-gray-400 font-bold mb-4 md:my-3">
            There’s a place for you
          </h2>
          <p className="text-sm md:text-base text-center font-BeatriceRegular text-gray-200">
            Find timely help from the community of curly sisters around the
            globe. Share experiences and tips together.
          </p>
          <button
            onClick={() => {
              navigate(NonAuthRoutes.communities);
            }}
            type="button"
            className="bg-purple-100 text-sm rounded-full w-48 mt-5 py-3 text-white shadow"
          >
            Visit the community
          </button>
        </div>
        <img
          className="mt-6 md:mt-40 h-auto md:h-52 w-20 md:w-auto self-end"
          src={communityPix2}
          alt="community pix"
        />
      </div>
    </div>
  );
}

export default CommunitySection;
