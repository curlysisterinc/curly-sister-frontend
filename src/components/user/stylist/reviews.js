/* eslint-disable array-callback-return */
/* eslint-disable import/order */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import reviewAvatar1 from "../../../assets/images/about-pix1.png";
import reviewAvatar2 from "../../../assets/images/funmi.png";
import { FaEllipsisH } from "react-icons/fa";

const GeneralReviewCard = () => {
  return (
    <div className="rounded-xl bg-gray-650 p-6 flex items-center justify-between">
      <div>
        <div className="bg-purple-100 rounded-lg text-white px-10 py-4">
          <span className="text-sm font-BeatriceMedium">
            4.89{" "}
            <span className="text-slate-400 text-xs font-BeatriceRegular">
              (12 reviews)
            </span>
          </span>
        </div>
        <div className="flex justify-center mt-3 space-x-2">
          <AiTwotoneStar color="#590BA9" size={18} />
          <AiTwotoneStar color="#590BA9" size={18} />
          <AiTwotoneStar color="#590BA9" size={18} />
          <AiTwotoneStar color="#590BA9" size={18} />
          <AiTwotoneStar color="#C6C2CA" size={18} />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-12 gap-2 ">
          <p className="text-sm text-gray-200 col-span-4">Excellent</p>
          <div className="w-120 h-1 bg-gray-250 rounded-full overflow-hidden relative col-span-6 place-self-center">
            <div className=" h-full w-11/12 bg-purple-100 absolute top-0 left-0" />
          </div>
          <p className="text-sm text-gray-200 col-span-2">64</p>
        </div>
        <div className="grid grid-cols-12 gap-2 ">
          <p className="text-sm text-gray-200 col-span-4">Very good</p>
          <div className="w-120 h-1 bg-gray-250 rounded-full overflow-hidden relative col-span-6 place-self-center">
            <div className=" h-full w-5/12 bg-purple-100 absolute top-0 left-0" />
          </div>
          <p className="text-sm text-gray-200 col-span-2">23</p>
        </div>{" "}
        <div className="grid grid-cols-12 gap-2 ">
          <p className="text-sm text-gray-200 col-span-4">Average</p>
          <div className="w-120 h-1 bg-gray-250 rounded-full overflow-hidden relative col-span-6 place-self-center">
            <div className=" h-full w-1/4 bg-purple-100 absolute top-0 left-0" />
          </div>
          <p className="text-sm text-gray-200 col-span-2">15</p>
        </div>{" "}
        <div className="grid grid-cols-12 gap-2 ">
          <p className="text-sm text-gray-200 col-span-4">Poor</p>
          <div className="w-120 h-1 bg-gray-250 rounded-full overflow-hidden relative col-span-6 place-self-center">
            <div className=" h-full w-1/12 bg-purple-100 absolute top-0 left-0" />
          </div>
          <p className="text-sm text-gray-200 col-span-2">8</p>
        </div>{" "}
        <div className="grid grid-cols-12 gap-2 ">
          <p className="text-sm text-gray-200 col-span-4">Terrible</p>
          <div className="w-120 h-1 bg-gray-250 rounded-full relative col-span-6 place-self-center " />
          <p className="text-sm text-gray-200 col-span-2">0</p>
        </div>
      </div>
    </div>
  );
};

const ViewReview = ({ review }) => {
  return (
    <div className="rounded-xl bg-gray-650 p-6 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={review.avatar} alt="" />
          <div className="">
            <p className="text-base text-gray-400">{review.name}</p>
            <div className="flex space-x-2 items-center">
              <div className="flex justify-center space-x-1">
                <AiTwotoneStar color="#590BA9" size={12} />
                <AiTwotoneStar color="#590BA9" size={12} />
                <AiTwotoneStar color="#590BA9" size={12} />
                <AiTwotoneStar color="#590BA9" size={12} />
                <AiTwotoneStar color="#590BA9" size={12} />
              </div>
              <p className="text-gray-300 text-sm">{review.rate}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-300 text-sm">{review.date}</p>
          <FaEllipsisH color="#8E8695" />
        </div>
      </div>
      <p className="text-gray-300 text-sm">{review.description}</p>
    </div>
  );
};

const reviewLists = [
  {
    id: 1,
    avatar: `${reviewAvatar1}`,
    name: "Martha Stewart",
    rate: "5.0",
    date: "22 Mar 21",
    description:
      "Here’s the title. She found her way into a tidy little room with a table in the window, and on it a fan and two or three pairs.",
  },
  {
    id: 2,
    avatar: `${reviewAvatar2}`,
    name: "Racheal Johnson",

    rate: "3.0",
    date: "19 Mar 21",
    description:
      "Alice looked all round. Stare at the flowers and the blades of grass, but she did not see anything that looked like us.",
  },
];
function Reviews() {
  return (
    <div className="flex flex-col space-y-3">
      <GeneralReviewCard />
      {reviewLists.map((review) => {
        return <ViewReview review={review} />;
      })}
    </div>
  );
}

export default Reviews;
