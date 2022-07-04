/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React from "react";
import ChooseServiceModal from "./chooseServiceModal";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { BsCreditCard2Back } from "react-icons/bs";
import { RiGift2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import brandLogo from "../../../assets/images/brand-logo.svg";
import PayPal from "../../../assets/images/PayPal.svg";
import avatar from "../../../assets/images/product-recommendation.png";
import lock from "../../../assets/images/lock.svg";
import { AuthRoutes } from "constants";

const BookServiceCard = () => {
  // const [hasService, setHasService] = React.useState(false);
  const [chooseServiceVisible, setChooseServiceVisible] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-xl h-auto w-auto">
      <div className="px-6 pt-6">
        <p className="text-base text-gray-400">Booking details</p>
        <div className="flex items-center space-x-3 mt-3">
          <img src={avatar} alt="" />
          <p className="text-base font-BeatriceSemiBold text-gray-400">
            All Naturals
          </p>
        </div>
        <div className="border border-gray-250 rounded-full w-full my-4 flex justify-between items-center h-12 px-3">
          <p className="text-sm text-gray-400">Select service, day and time</p>
          <MdArrowForwardIos
            color="#8E8695"
            onClick={() => setChooseServiceVisible(true)}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="">
            <p className="text-sm text-gray-400">Product recommendation</p>
            <p className="text-xs text-gray-200 mb-1">
              Tues, 22 Mar · 12:00 PM (GMT+1)
            </p>
          </div>
          <p className="text-sm text-gray-400">$35</p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="text-sm text-gray-400">Booking fee</p>

          <p className="text-sm text-gray-400">$5</p>
        </div>
        <hr className="w-full border border-gray-600 my-4" />
        <div className="flex justify-between items-center ">
          <p className="text-sm text-gray-400">Total</p>

          <p className="text-base text-gray-400 font-BeatriceSemiBold">$40</p>
        </div>
      </div>
      <div className="p-6 ">
        <button
          onClick={() => navigate(AuthRoutes.successfullBooking)}
          className="disabled:opacity-40 bg-orange-200 rounded-full w-full h-12 flex justify-center items-center text-white font-BeatriceSemiBold"
        >
          Pay and confirm booking
        </button>
      </div>
      <ChooseServiceModal
        visible={chooseServiceVisible}
        setVisible={setChooseServiceVisible}
        // setHasService={setHasService}
      />
    </div>
  );
};

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-80 bg-gray-50 px-12 h-screen fixed border-r border-gray-100 shadow flex flex-col justify-between">
      <Link to="/">
        <img src={brandLogo} alt="brand logo" />
      </Link>
      <div
        className="flex space-x-2 items-center cursor-pointer pt-4  px-6"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack color="#8E8695" />
        <p className="text-sm font-AvenirLTPro-Heavy text-gray-300 uppercase">
          GO Back
        </p>
      </div>
    </div>
  );
};

function ConfirmBooking() {
  // const navigate = useNavigate();
  const [isClicked, setIsClicked] = React.useState("paypal");
  const [checkGift, setCheckGift] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const handleChange = (event) => {
    setCheckGift(!checkGift);
    if (event.target.checked) {
      setOpenForm(true);
    } else {
      setOpenForm(false);
    }
  };
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBar />
      <div className="ml-80 bg-white px-0 pt-10 pb-20 w-full min-h-screen relative">
        <div className="flex justify-between px-16 relative">
          <div className="w-7/12">
            <h4 className="text-2xl font-BeatriceSemiBold text-gray-400 mb-2">
              Pay and confirm booking
            </h4>
            <p className="text-base text-gray-200">
              You’re almost there. Make payment and you’re good to go. Don’t
              have the entire amount? You can opt to pay a deposit first.
            </p>
            <div className="mt-4">
              <h4 className="text-base font-BeatriceSemiBold text-gray-400 mb-2">
                Pay with
              </h4>
              <div className="grid grid-cols-2 gap-6 mt-3">
                <div
                  onClick={() => setIsClicked("paypal")}
                  className={` cursor-pointer shadow rounded-xl   p-4 flex items-center space-x-3 col-1 overflow-hidden border-2 hover:bg-gray-550 hover:border-purple-100 ${
                    isClicked === "paypal"
                      ? "bg-gray-550 border-purple-100"
                      : "bg-white border-gray-600"
                  }`}
                >
                  <img src={PayPal} alt="" />
                  <p
                    className={`text-base ${
                      isClicked === "paypal"
                        ? " text-purple-100"
                        : "text-gray-400 "
                    }`}
                  >
                    PayPal
                  </p>
                </div>
                <div
                  onClick={() => setIsClicked("card")}
                  className={` cursor-pointer shadow rounded-xl p-4 flex items-center space-x-3 col-1 overflow-hidden border-2 hover:bg-gray-550 hover:border-purple-100 ${
                    isClicked === "card"
                      ? "bg-gray-550 border-purple-100 "
                      : "bg-white border-gray-600"
                  }`}
                >
                  <BsCreditCard2Back
                    color={isClicked === "card" ? "#590BA9" : "#443C4D"}
                  />
                  <p
                    className={`text-base ${
                      isClicked === "card"
                        ? " text-purple-100"
                        : "text-gray-400 "
                    }`}
                  >
                    Debit/credit card
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-lg bg-orange-250 border border-orange-350 p-5 flex items-start space-x-5">
              <img src={lock} alt="" />
              <p className="text-xs text-gray-200">
                All payments are securely processed by our industry-standard
                payment partners. We never store your card details.
              </p>
            </div>
            <hr className="w-full border border-gray-600 my-10" />

            <div
              className={`p-5 rounded-lg border-2  ${
                checkGift
                  ? "bg-gray-550 border-purple-100"
                  : "bg-white border-gray-600"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    checked={checkGift}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-100 bg-transparent rounded border-gray-250 "
                  />
                  <label
                    htmlFor="default-checkbox"
                    className=" w-full text-base text-purple-100"
                  >
                    Gift this booking
                  </label>

                  {/* <BsFillCheckSquareFill color="#590BA9" /> */}
                </div>
                <RiGift2Line
                  color={checkGift ? "#590BA9" : "#443C4D"}
                  size={20}
                />
              </div>
              {openForm && (
                <div className="mt-3">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      className="col-1 border border-gray-650 rounded-lg bg-white placeholder:text-gray-700 text-gray-700 text-sm"
                      placeholder="Name of recipient"
                    />
                    <input
                      type="text"
                      className="col-1 border border-gray-650 rounded-lg bg-white placeholder:text-gray-700 text-gray-700 text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <textarea
                    className="mt-3 w-full border border-gray-650 rounded-lg bg-white placeholder:text-gray-700 text-gray-700 text-sm"
                    placeholder="Message (optional)"
                    rows="2"
                  />
                </div>
              )}
            </div>
          </div>
          <div className=" h-auto ">
            <BookServiceCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBooking;
