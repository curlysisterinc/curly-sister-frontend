/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Link } from "react-router-dom";
import facebookIcon from "../../assets/images/facebook.svg";
import instagramIcon from "../../assets/images/instagram.svg";
import smsIcon from "../../assets/images/sms.svg";
import productImg from "../../assets/images/product-img.svg";
import bgOne2 from "../../assets/images/bg-one2.png";
import stylistPlace1 from "../../assets/images/stylist-place-1.png";
import ratingIcon from "../../assets/images/rating.svg";

function FooterComponent() {
  return (
    <div>
      <div className="bg-orange-50 p-10 flex justify-between items-center relative ">
        <img
          className="absolute w-full object-fit top-0 z-0"
          src={bgOne2}
          alt=""
        />

        <div className="relative z-10 flex justify-start items-center">
          <div className="w-1/2 shadow rounded-xl bg-white overflow-hidden mr-20">
            <img
              className="w-full object-cover"
              src={stylistPlace1}
              alt="stylist place"
            />
            <div className="p-5">
              <dl className="mt-4 text-xs  flex justify-end items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                <dt className="sr-only">Reviews</dt>
                <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                  <svg
                    width="24"
                    height="24"
                    fill="purple-100"
                    aria-hidden="true"
                    className="mr-1 stroke-current dark:stroke-purple-100"
                  >
                    <path
                      d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    4.5{" "}
                    <span className="text-gray-200 font-normal">
                      (12 reviews)
                    </span>
                  </span>
                </dd>
              </dl>
              <div className="mt-5 p">
                <p className="text-gray-400 font-bold flex mb-2">
                  Sade’s Beauty Place
                  <img src={ratingIcon} alt="rating" className="ml-2" />
                </p>
                <p className="text-gray-400 text-sm">
                  Here’s a short version of a bio where one has been provided.
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-gray-300 text-base mb-2">ARE YOU A STYLIST?</p>
            <h3 className="font-GTSuperTextBlack text-4xl text-gray-400 mb-2">
              It’s time to get listed
            </h3>
            <p className="text-gray-200 text-base">
              Join our database of over 10,000+ stylists around the world so new
              clients can easily find you.
            </p>
            <div className="pt-10">
              <a
                href="https://hevxcdnqqzt.typeform.com/to/dPCDRkOk?typeform-source=curlysister.com"
                className="rounded-full bg-purple-100 w-44 px-6 py-4 text-white font-BeatriceSemiBold"
              >
                Get listed
              </a>
            </div>
          </div>
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
