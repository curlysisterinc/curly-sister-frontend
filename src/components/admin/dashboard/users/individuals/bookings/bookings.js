/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../../../../../constants";
import backArrow from "../../../../../../assets/images/back-arrow.svg";
import rightArrow from "../../../../../../assets/images/right-arrow.svg";
import audre from "../../../../../../assets/images/allyn.png";
import kebabIcon from "../../../../../../assets/images/kebab.svg";
import addIcon from "../../../../../../assets/images/add.svg";
import productRecommendation from "../../../../../../assets/images/product-recommendation.png";

function IndividualsBookings() {
  const navigate = useNavigate();

  return (
    <div className="bg-white px-10 py-8 w-full flex items-start">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate(AuthRoutes.dashboard)}
      >
        <img className="mr-2" src={backArrow} alt="back arrow" />
        Go Back
      </div>
      <div className="ml-28 w-4/6 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-start">
            <img src={audre} alt="" />
            <div className="ml-3">
              <h5 className="text-gray-400 text-base">Audre Lorde</h5>
              <p className="text-sm text-gray-200">audre@yahoo.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <img className="h-4" src={backArrow} alt="" />
            <img className="mx-3 h-4" src={rightArrow} alt="" />
            <img src={kebabIcon} alt="" />
          </div>
        </div>
        <hr className="border border-gray-600 w-full mt-3 mb-8" />
        <div className="rounded-lg border border-orange-100 bg-orange-300 w-full p-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-200 text-sm">15 bookings</p>
            <div className="flex">
              <div className="flex text-purple-100 text-sm items-center cursor-pointer">
                <img className="mr-2" src={addIcon} alt="" />
                Add booking
              </div>
              <div className="mx-4 border border-gray-800 rounded-full text-sm text-gray-400 p-2 cursor-pointer">
                More filters
              </div>
              <div>
                <select
                  id="link"
                  name="link"
                  className="focus:ring-indigo-500 focus:border-indigo-500 py-2 pl-2 pr-7 border-gray-800 bg-transparent text-gray-400 sm:text-sm rounded-full cursor-pointer"
                >
                  <option>Upcoming</option>
                  <option>Incoming</option>
                  <option>Latest</option>
                  <option>Facebook</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-white shadow-md w-full p-5 rounded-md flex justify-between items-center mb-6">
              <div className="flex items-center">
                <img src={productRecommendation} alt="" />
                <div className="ml-3">
                  <h5 className="text-gray-400 text-base">
                    Product recommendation
                  </h5>
                  <p className="text-sm text-gray-200">
                    All Naturals · Fri, 18 Mar · 4:30 PM (GMT +1)
                  </p>
                </div>
              </div>

              <img src={rightArrow} alt="" />
            </div>

            <div className="bg-white shadow-md w-full p-5 rounded-md flex justify-between items-center mb-6">
              <div className="flex items-center">
                <img src={productRecommendation} alt="" />
                <div className="ml-3">
                  <h5 className="text-gray-400 text-base">
                    Micro teaching session
                  </h5>
                  <p className="text-sm text-gray-200">
                    Curly Helen · Mon, 21 Mar · 06:00 AM (GMT +1)
                  </p>
                </div>
              </div>
              <img src={rightArrow} alt="" />
            </div>

            <div className="bg-white shadow-md w-full p-5 rounded-md flex justify-between items-center ">
              <div className="flex items-center">
                <img src={productRecommendation} alt="" />
                <div className="ml-3">
                  <h5 className="text-gray-400 text-base">Consultation</h5>
                  <p className="text-sm text-gray-200">
                    All Naturals · Tue, 22 Mar · 05:00 PM (GMT +1)
                  </p>
                </div>
              </div>
              <img src={rightArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualsBookings;
