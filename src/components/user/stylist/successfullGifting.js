/* eslint-disable import/order */
import React from "react";
import SideBarComponent from "../../sidebar/sidebar";
import Hurray from "../../../assets/images/hurray.svg";

function SuccessfullGifting() {
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="stylist" />
      <div className="ml-80 bg-white  pt-14 w-full min-h-screen">
        <div className="border border-orange-100 bg-orange-300 rounded-xl w-1/2 mx-auto p-8">
          <img src={Hurray} alt="" />
          <p className="text-base font-BeatriceSemiBold text-gray-400 my-4">
            Gifting successful!
          </p>
          <p className="text-sm text-gray-400 my-4">
            Ellen Wu <i>ellen@gmail.com</i> has received your booking gift.
            We’ve sent an email on your behalf to let them know. Thanks for
            bringing joy into their lives.
          </p>
          <div className="cursor-pointer inline-block w-auto rounded-full bg-orange-200 text-white text-sm px-5 py-3 ">
            Explore stylists
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessfullGifting;
