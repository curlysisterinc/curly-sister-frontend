import React from "react";
import { Link } from "react-router-dom";
import facebookIcon from "../../assets/images/facebook.svg";
import instagramIcon from "../../assets/images/instagram.svg";
import smsIcon from "../../assets/images/sms.svg";
import productImg from "../../assets/images/product-img.svg";
import bgOne2 from "../../assets/images/bg-one2.png";

function FooterComponent() {
  return (
    <div>
      <div className="bg-orange-50 p-10 flex justify-between items-center relative ">
        <img
          className="absolute w-full object-fit top-0 z-0"
          src={bgOne2}
          alt=""
        />

        <div className="relative z-10">
          <h3 className="font-bold text-2xl text-gray-400 mb-2">
            Are you a stylist?
          </h3>
          <p className="text-gray-200">
            Get listed so new clients can find you
          </p>
        </div>
        <div className="relative z-10">
          <button
            type="button"
            className="rounded-full bg-gray-400 w-44 py-3 text-white font-semibold"
          >
            Get listed
          </button>
        </div>
      </div>
      <div className="bg-purple-200 p-10 flex justify-between items-start relative z-20">
        <div className="w-1/3">
          <p className="text-white text-base ">
            The online curated experience to help you reach your wavy and curly
            dreams.
          </p>
          <div className="flex mt-8">
            <img className="mr-5" src={facebookIcon} alt="Facebook icon" />
            <img className="mr-5" src={instagramIcon} alt="Instagram icon" />
            <img src={smsIcon} alt="Sms icon" />
          </div>
          <div className="mt-20 text-sm text-gray-300">
            &copy; Curly Sister, 2020
          </div>
        </div>
        <div className="w-1/6 text-gray-100">
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
        <div className="w-1/3  border-2 border-orange-200 rounded-lg px-2 py-1 flex items-center">
          <img src={productImg} alt="product-img" />
          <div className="ml-3">
            <h4 className="text-white font-bold text-base mb-2">
              Our curated products
            </h4>
            <p className="text-gray-100 text-sm mb-2">
              Over 100+ hand selected, trusted items for your hair.
            </p>
            <Link to="/">
              <p className="text-orange-200 font-semibold text-sm">Get them</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
