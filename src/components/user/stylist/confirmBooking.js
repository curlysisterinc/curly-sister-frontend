/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import brandLogo from "../../../assets/images/brand-logo.svg";
import PayPal from "../../../assets/images/PayPal.svg";
import avatar from "../../../assets/images/product-recommendation.png";
import lock from "../../../assets/images/lock.svg";
import { AuthRoutes } from "constants";
import PayPalCheckoutButton from "./checkout/PayPalCheckoutButton";
// import StripeCheckout from "react-stripe-checkout";
import admin from "../../../api/admin";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { moment } from "moment";
import SideBarComponent from "../../sidebar/sidebar";

const BookServiceCard = ({
  product,
  handleToken,
  service,
  paymentOption,
  handleStripeSubmit,
  handlePaypalSubmit,
  isProcessing,
  hasGifting,
  discountCheck,
  setDiscountCheck,
  bookingFee,
  BOOKING_FEE_TOTAL,
}) => {
  const [chooseServiceVisible, setChooseServiceVisible] = React.useState(false);
  const navigate = useNavigate();
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        border: "1px solid red",
      },
      invalid: {
        color: "red",
      },
    },
    hidePostalCode: true,
  };
  // create a payment intent

  return (
    <form
      onSubmit={handleStripeSubmit}
      className="bg-white rounded-lg shadow-xl h-auto w-80"
    >
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
            <p className="text-sm text-gray-400">
              {service.bookedservice.name}
            </p>
            <p className="text-xs text-gray-200 mb-1">
              {service?.day.toString()}
            </p>
          </div>
          <p className="text-sm text-gray-400">
            ${service.bookedservice.default_price}
          </p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="text-sm text-gray-400">Booking fee</p>

          <p className="text-sm text-gray-400">{service.bookingFee}</p>
        </div>
        <hr className="w-full border border-gray-600 my-4" />
        <div className="flex justify-between items-center ">
          <p className="text-sm text-gray-400">Total</p>

          <p className="text-base text-gray-400 font-BeatriceSemiBold">
            ${service.bookingTotal}
          </p>
        </div>
      </div>
      <div className="p-6 ">
        {/* <div className="paypal-button-container absolute opacity-0">
          {paymentOption === "paypal" && (
            <PayPalCheckoutButton product={product} />
          )}
        </div> */}
        {paymentOption === "stripe" && (
          <div className="mb-3 ">
            <CardElement options={cardElementOptions} />
          </div>
        )}

        {paymentOption === "paypal" && (
          <button
            type="button"
            disabled={isProcessing}
            onClick={handlePaypalSubmit}
            // onClick={() => navigate(AuthRoutes.successfullBooking)}
            className="disabled:opacity-40 bg-orange-200 rounded-full w-full h-12 flex justify-center items-center text-white font-BeatriceSemiBold"
          >
            Pay and confirm booking
          </button>
        )}
        {paymentOption === "stripe" && (
          <button
            type="button"
            disabled={isProcessing}
            onClick={handlePaypalSubmit}
            // onClick={() => navigate(AuthRoutes.successfullBooking)}
            className="disabled:opacity-40 bg-orange-200 rounded-full w-full h-12 flex justify-center items-center text-white font-BeatriceSemiBold"
          >
            Pay and confirm booking
          </button>
        )}
        {!hasGifting && (
          <div className="">
            <div className="flex justify-center flex-col items-center text-center space-y-3 mt-4">
              <label className=" block text-black" htmlFor="check-discount">
                <input
                  id="check-discount"
                  className="w-4 h-4 text-gray-400 bg-transparent rounded border-gray-250 mr-2"
                  type="checkbox"
                  checked={discountCheck}
                  onChange={() => setDiscountCheck(!discountCheck)}
                />
                <span className="text-sm">Pay just deposit first</span>
              </label>
              {discountCheck && (
                <div>
                  <p className="text-sm mb-3">
                    You’ll pay $10 now. To confirm your booking, you’ll need to
                    pay the balance of $30 before 15 Mar 2022.
                  </p>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    // onClick={() => navigate(AuthRoutes.successfullBooking)}
                    className="disabled:opacity-40 bg-white rounded-full w-full h-12 flex justify-center items-center text-gray-400 border border-gray-400 font-BeatriceSemiBold"
                  >
                    Pay deposit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

function ConfirmBooking() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState("");
  const { state } = useLocation();
  console.log(state, "state");
  const [checkGift, setCheckGift] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [service, setService] = React.useState(state);
  const [discountCheck, setDiscountCheck] = React.useState(false);
  const [bookingFee, setBookingFee] = React.useState(0);
  const [paymentOption, setPaymentOption] = React.useState("paypal");
  const stripe = useStripe();
  const elements = useElements();
  const user = localStorage.getItem("user");
  const [giftingDetails, setGiftingDetails] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const BOOKING_FEE_PERCENT = 0;
  let BOOKING_FEE_TOTAL = 0;
  const handleStripeCheckout = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      const cardElement = elements.getElement(CardElement);
      let hasGifting =
        giftingDetails.name.trim().length ||
        giftingDetails.email.trim().length ||
        giftingDetails.message.trim().length;
      const bookedServiceData = hasGifting
        ? {
            service: service.bookedservice._id,
            stylist: service.stylistId,
            price: service.bookingTotal,
            date: service.day.toString(),
            booking_kind: "gift",
            email: giftingDetails.email,
            name: giftingDetails.name,
          }
        : {
            service: service.bookedservice._id,
            stylist: service.stylistId,
            price: service.bookingTotal,
            date: service.day.toString(),
            partialPayment: discountCheck,
          };

      const bookedService = await admin
        .BookService(bookedServiceData)
        .then((response) => {
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
      console.log(bookedService, "booked service");
      const {
        paymentIntent: { status },
      } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      setIsProcessing(false);
      if (status === "succeeded") {
        navigate(AuthRoutes.successfullBooking);
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };

  const handlePaypalCheckout = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      let hasGifting =
        giftingDetails.name.trim().length ||
        giftingDetails.email.trim().length ||
        giftingDetails.message.trim().length;
      const bookedServiceData = hasGifting
        ? {
            service: service.bookedservice._id,
            stylist: service.stylistId,
            price: service.bookingTotal,
            date: service.day.toString(),
            booking_kind: "gift",
            email: giftingDetails.email,
            name: giftingDetails.name,
          }
        : {
            service: service.bookedservice._id,
            stylist: service.stylistId,
            price: service.bookingTotal,
            date: service.day.toString(),
            partialPayment: discountCheck,
          };

      const bookedService = await admin
        .BookService(bookedServiceData)
        .then((response) => {
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
      console.log(bookedService, "booked service");

      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };
  const handleGiftFormCheck = (event) => {
    setCheckGift(!checkGift);
    if (event.target.checked) {
      setOpenForm(true);
    } else {
      setOpenForm(false);
    }
  };

  const handleChange = (e) => {
    setGiftingDetails({ ...giftingDetails, [e.target.name]: e.target.value });
  };

  React.useEffect(async () => {
    const fee = parseFloat(
      (service.bookedservice.default_price * BOOKING_FEE_PERCENT) / 100
    );
    setBookingFee(fee);
    BOOKING_FEE_TOTAL = bookingFee + service.bookedservice.default_price;
    const response = await admin.StripeCheckout({
      amount: BOOKING_FEE_TOTAL * 100,
    });
    setClientSecret(response.data.data);
  }, []);

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border relative border-gray-50">
      <SideBarComponent active="stylist" />
      <div className="ml-80 bg-white px-0 pt-10 pb-20 w-full min-h-screen relative">
        <button
          className="flex space-x-0 items-center cursor-pointer pt-4  px-6 mb-6"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
          <p className="text-sm font-AvenirLTPro-Heavy text-gray-400 uppercase">
            GO Back
          </p>
        </button>
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
                  onClick={() => setPaymentOption("paypal")}
                  className={` cursor-pointer shadow rounded-xl   p-4 flex items-center space-x-3 col-1 overflow-hidden border-2 hover:bg-gray-550 hover:border-purple-100 ${
                    paymentOption === "paypal"
                      ? "bg-gray-550 border-purple-100"
                      : "bg-white border-gray-600"
                  }`}
                >
                  <img src={PayPal} alt="" />
                  <p
                    className={`text-base ${
                      paymentOption === "paypal"
                        ? " text-purple-100"
                        : "text-gray-400 "
                    }`}
                  >
                    PayPal
                  </p>
                </div>
                <div
                  onClick={() => setPaymentOption("stripe")}
                  className={` cursor-pointer shadow rounded-xl p-4 flex items-center space-x-3 col-1 overflow-hidden border-2 hover:bg-gray-550 hover:border-purple-100 ${
                    paymentOption === "stripe"
                      ? "bg-gray-550 border-purple-100 "
                      : "bg-white border-gray-600"
                  }`}
                >
                  <BsCreditCard2Back
                    color={paymentOption === "stripe" ? "#590BA9" : "#443C4D"}
                  />
                  <p
                    className={`text-base ${
                      paymentOption === "stripe"
                        ? " text-purple-100"
                        : "text-gray-400 "
                    }`}
                  >
                    Stripe
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
                    onChange={handleGiftFormCheck}
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
                      value={giftingDetails.name}
                      name="name"
                      onChange={handleChange}
                      className="col-1 border border-gray-650 rounded-lg bg-white placeholder:text-gray-700 text-gray-700 text-sm"
                      placeholder="Name of recipient"
                    />
                    <input
                      type="email"
                      required
                      value={giftingDetails.email}
                      onChange={handleChange}
                      name="email"
                      className="col-1 border border-gray-650 rounded-lg bg-white placeholder:text-gray-700 text-gray-700 text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <textarea
                    value={giftingDetails.message}
                    onChange={handleChange}
                    name="message"
                    className="mt-3 w-full border border-gray-650 rounded-lg bg-white placeholder:text-gray-700 text-gray-700 text-sm"
                    placeholder="Message (optional)"
                    rows="2"
                  />
                </div>
              )}
            </div>
          </div>
          <div className=" h-auto ">
            <BookServiceCard
              handleStripeSubmit={handleStripeCheckout}
              handlePaypalSubmit={handlePaypalCheckout}
              service={service}
              disabled={isProcessing}
              paymentOption={paymentOption}
              hasGifting={checkGift}
              discountCheck={discountCheck}
              setDiscountCheck={setDiscountCheck}
              bookingFee={bookingFee}
              BOOKING_FEE_TOTAL={BOOKING_FEE_TOTAL}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBooking;
