import React from "react";
import videoGirl from "../../assets/images/video-girl.png";
import playBtn from "../../assets/images/play-btn.svg";

function LearnSection() {
  return (
    <div className="relative w-full ">
      <img className="w-full" src={videoGirl} alt="video clip" loading="lazy" />
      <img
        className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
        src={playBtn}
        alt="play btn"
      />
      <div className="p-10 absolute flex justify-start items-center bg-gradient-to-r from-purple-200 w-5/6 h-full  left-0 top-1/2 transform -translate-y-1/2">
        <div className="w-2/4 pr-14">
          <p className="text-gray-100 text-base">LEARN HAIR CARE</p>
          <h2 className="text-4xl text-white font-bold my-5 font-GTSuperTextBlack">
            Get to know how to care for your unique hair
          </h2>
          <p className="text-gray-100 text-base pr-10 leading-7">
            We have a collection of over 70 hours of pro videos & articles to
            help you achieve the best quality of curly or coily hair.
          </p>
          <button
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
