/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Link } from "react-router-dom";
import facebookIcon from "../../assets/images/facebook.svg";
import instagramIcon from "../../assets/images/instagram.svg";
import smsIcon from "../../assets/images/sms.svg";
import productImg from "../../assets/images/product-img.png";
import WaitList from "./waitList";

function FooterComponent({ getStylist }) {
  return (
    <div>
      <WaitList getStylist={getStylist} />

      <div className="bg-purple-200 md:p-10 py-6 px-4 flex flex-col md:flex-row  justify-between items-start relative z-20">
        <div className="w-full max-w-280 md:w-1/3">
          <p className="text-white text-base ">
            The online curated experience to help you reach your wavy and curly
            dreams.
          </p>
          <div className="flex mt-8">
            <img className="mr-5" src={facebookIcon} alt="Facebook icon" />
            <img className="mr-5" src={instagramIcon} alt="Instagram icon" />
            <img src={smsIcon} alt="Sms icon" />
          </div>
          <div className="mt-20 text-sm text-gray-300 hidden md:block">
            &copy; Curly Sister, {new Date().getFullYear()}
          </div>
        </div>
        <div className="w-full mb-10 md:mb-0 md:w-1/6 text-gray-100 mt-10 md:mt-0">
          <Link to="/stylists">
            <p className=" text-sm mb-2">Find stylist</p>
          </Link>
          <Link to="/learn">
            <p className=" text-sm mb-2">Learn</p>
          </Link>
          <Link to="/about">
            <p className=" text-sm mb-2">About</p>
          </Link>
          <Link to="/terms-and-privacy">
            <p className=" text-sm mb-2">Terms & privacy</p>
          </Link>
        </div>
        <div className="w-full md:w-1/3  border-2 border-orange-200 rounded-lg md:px-2 md:py-1 p-2 flex items-center">
          <img
            src={productImg}
            alt="product-img"
            loading="lazy"
            className="h-150 w-120 md:h-120  object-cover rounded-xl"
          />
          <div className="ml-4 flex-1">
            <h4 className="text-white font-bold text-base mb-2">
              Our curated products
            </h4>
            <p className="text-gray-100 text-sm mb-2 font-normal">
              Over 100+ hand selected, trusted items for your hair.
            </p>
            <Link to="/">
              <p className="text-orange-200 font-semibold text-sm ">Get them</p>
            </Link>
          </div>
        </div>
        <div className="mt-10 text-sm text-gray-300  md:hidden">
          &copy; Curly Sister, {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
