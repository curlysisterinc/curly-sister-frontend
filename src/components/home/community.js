/* eslint-disable import/order */
import React from "react";
import communityPix1 from "../../assets/images/community-pix1.png";
import communityPix2 from "../../assets/images/community-pix2.png";
import { NonAuthRoutes } from "../../constants";
import { useNavigate } from "react-router-dom";

function CommunitySection() {
  const navigate = useNavigate();

  return (
    <div className=" p-10 flex justify-center items-center">
      <div className="flex justify-between w-full">
        <img className="h-52" src={communityPix1} alt="community pix" />

        <div className="text-center mt-20 mx-16">
          <p className="text-gray-200 text-base ">ASK, SHARE, AND LEARN</p>
          <h2 className="text-4xl text-gray-400 font-bold my-3">
            There’s a place for you
          </h2>
          <p className="text-base text-center ">
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
        <img className="mt-40 h-52" src={communityPix2} alt="community pix" />
      </div>
    </div>
  );
}

export default CommunitySection;
