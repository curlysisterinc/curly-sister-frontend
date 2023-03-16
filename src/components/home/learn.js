/* eslint-disable import/order */
import React from "react";
import videoGirl from "../../assets/images/video-girl.png";
import playBtn from "../../assets/images/play-btn.svg";
import { NonAuthRoutes } from "../../constants";
import { useNavigate } from "react-router-dom";
import Image from "components/image";

function LearnSection() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-520 ">
      <img
        className="w-full object-cover h-full"
        src={videoGirl}
        alt="video clip"
        loading="lazy"
      />
      <img
        className="absolute left-1/2 top-20 md:top-1/2 transform -translate-y-1/2 -translate-x-1/2"
        src={playBtn}
        alt="play btn"
      />
      <div className="p-4 w-full md:w-3/5 md:p-10 absolute flex justify-start items-center bg-gradient h-full  left-0 top-1/2 transform -translate-y-1/2">
        <div className="w-full p-0 relative top-69">
          <p className="text-gray-100  text-xs md:text-base">LEARN HAIR CARE</p>
          <h2 className="text-2xl w-full md:text-4xl text-white font-extrabold mt-2 mb-4 md:my-5 font-GTSuperTextBlack max-w-480">
            Get to know how to care for your unique hair
          </h2>
          <p className="text-gray-100 text-sm md:text-base p-0  leading-7 max-w-480">
            We have a collection of over 70 hours of pro videos & articles to
            help you achieve the best quality of curly or coily hair.
          </p>
          <button
            onClick={() => {
              navigate(NonAuthRoutes.learn);
            }}
            type="button"
            className="bg-purple-100 rounded-full w-44 py-3 text-white font-semibold mt-6"
          >
            Start learning
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearnSection;
