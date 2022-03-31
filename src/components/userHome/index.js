/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */

import React from "react";
import { Link } from "react-router-dom";
import SideBarComponent from "../sidebar";
import authHandler from "../../authHandler";
import profileDp from "../../assets/images/profile-dp.png";
import searchIcon from "../../assets/images/search-normal.svg";
import productRecommendation from "../../assets/images/product-recommendation.png";
import stylistPlace1 from "../../assets/images/stylist-place-1.png";
import stylistPlace2 from "../../assets/images/stylist-place-2.png";

function UserHome() {
  const userDetails = authHandler.getUser("users");
  const userFirstName = userDetails.firstName;

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border-r border-gray-50">
      <SideBarComponent active="home" isLoggedIn />
      <div className="ml-72 bg-white px-10 pt-14 w-full">
        <div className="flex flex-col w-full lg:flex-row justify-between items-center">
          <div className="flex justify-start items-center ">
            <img className="mr-3" src={profileDp} alt="profile pix" />
            <div className="">
              <p className="font-semibold text-gray-400 text-lg">
                Hello {userFirstName} 👋
              </p>
              <p className="text-sm text-gray-200">
                We hope your day is coming along great
              </p>
            </div>
          </div>
          <div className="rounded-full px-3 py-3 relative w-full lg:w-2/5 h-12 mt-6 lg:mt-0 border border-gray-250 flex justify-between items-center">
            <input
              type="text"
              className="border-0 outline-none   h-full w-full"
              placeholder="San Francisco, CA, USA"
            />
            <div className="ml-2 rounded-full bg-orange-200 h-10 w-10 flex justify-center items-center cursor-pointer">
              <img src={searchIcon} alt="Search icon" />
            </div>
          </div>
        </div>

        {/* flexed-content */}
        <div className="flex justify-between items-start mt-10 w-full ">
          {/* left-content */}
          <div className="w-8/12">
            <div className="bg-orange-300 border border-orange-100 rounded-lg p-6">
              <div className="w-full flex justify-between items-center mb-5">
                <p className="text-gray-400 text-base">
                  Your upcoming bookings
                </p>
                <Link
                  to="/all-bookings"
                  className="text-sm font-bold text-purple-100"
                >
                  View all bookings
                </Link>
              </div>
              <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
                <img
                  className="mr-3"
                  src={productRecommendation}
                  alt="circle"
                />
                <div>
                  <p className="font-semibold text-gray-400 text-base">
                    Product recommendation
                  </p>
                  <p className="text-sm text-gray-200">
                    All Naturals · Fri, 18 Mar · 4:30 PM (GMT +1)
                  </p>
                </div>
              </div>
              <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
                <img
                  className="mr-3"
                  src={productRecommendation}
                  alt="circle"
                />
                <div>
                  <p className="font-semibold text-gray-400 text-base">
                    Micro teaching lesson
                  </p>
                  <p className="text-sm text-gray-200">
                    Curly Helen · Mon, 21 Mar · 06:00 AM (GMT +1)
                  </p>
                </div>
              </div>
              <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
                <img
                  className="mr-3"
                  src={productRecommendation}
                  alt="circle"
                />
                <div>
                  <p className="font-semibold text-gray-400 text-base">
                    Consultation
                  </p>
                  <p className="text-sm text-gray-200">
                    All Naturals · Tue, 22 Mar · 05:00 PM (GMT +1)
                  </p>
                </div>
              </div>
            </div>

            {/* popular arund you */}
            <div className="mt-10">
              <div className="w-full flex justify-between items-center mb-5">
                <p className="text-gray-400 text-base">
                  Popular around you
                  <span>.</span>
                  <span className="text-gray-200">Interesting styles</span>
                </p>
                <Link
                  to="/stylists"
                  className="text-sm font-bold text-purple-100"
                >
                  View more
                </Link>
              </div>

              {/* stylists */}
              <div className="grid grid-cols-2 gap-8">
                <div className="shadow rounded-xl">
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
                          fill="none"
                          aria-hidden="true"
                          className="mr-1 stroke-current dark:stroke-indigo-500"
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
                      <p className="text-gray-400 font-bold">
                        Sade’s Beauty Place
                      </p>
                      <p className="text-gray-400 text-sm">
                        Here’s a short version of a bio where one has been
                        provided.
                      </p>
                      <p className="text-gray-200 text-sm pt-3">
                        (636) 763-9867 · 333, Fremont Str, SF, CA (12km) ·
                        Certified
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shadow rounded-xl">
                  <img
                    className="w-full object-cover"
                    src={stylistPlace2}
                    alt="stylist place"
                  />
                  <div className="p-5">
                    <dl className="mt-4 text-xs  flex justify-end items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                      <dt className="sr-only">Reviews</dt>
                      <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          aria-hidden="true"
                          className="mr-1 stroke-current dark:stroke-indigo-500"
                        >
                          <path
                            d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          3.2{" "}
                          <span className="text-gray-200 font-normal">
                            (98 reviews)
                          </span>
                        </span>
                      </dd>
                    </dl>
                    <div className="mt-5 p">
                      <p className="text-gray-400 font-bold">All Naturals</p>
                      <p className="text-gray-400 text-sm">
                        Suddenly she came upon a little three-legged table, all
                        made up.
                      </p>
                      <p className="text-gray-200 text-sm pt-3">
                        (636) 145-9831 · 546, Mandela Avenue, SF, CA (23km) ·
                        Certified
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* questions */}
              <div className="mt-10">
                <div className="w-full flex justify-between items-center mb-5">
                  <p className="text-gray-400 text-base">New questions</p>
                  <Link
                    to="/stylists"
                    className="text-sm font-bold text-purple-100"
                  >
                    View more
                  </Link>
                </div>
                <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
                  <img
                    className="mr-3"
                    src={productRecommendation}
                    alt="circle"
                  />
                  <div>
                    <p className="font-semibold text-gray-400 text-base">
                      How do you style your hair in winter?
                    </p>
                    <div>
                      <p className="text-sm text-gray-200">
                        What has been your biggest hair challenge?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
