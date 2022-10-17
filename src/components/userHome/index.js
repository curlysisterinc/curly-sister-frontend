import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import Image from "components/image";

import authHandler from "../../authHandler";
import profileDp from "../../assets/images/profile-dp.png";
import { ReactComponent as RiSearchLine } from "../../assets/images/search-normal.svg";
import productRecommendation from "../../assets/images/product-recommendation.png";
import trendingVideo from "../../assets/images/trending-video.png";
import curatedProduct from "../../assets/images/curated-product.png";
import continueLearning from "../../assets/images/continue-learning.png";
import arrowIcon from "../../assets/images/arrow.svg";
import { QuestionSection } from "./QuestionSection";
import { StylistSection } from "./StylistSection";

function UserHome({ upcomingBookings }) {
  const {
    state: { isSignedIn },
  } = useAuthContext();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    if (isSignedIn) {
      const userDetails = authHandler.getUser("users");
      const userFirstName = userDetails.firstName;
      setFirstName(userFirstName);
    }

    return function cleanup() {
      ac.abort();
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/stylists`, {
      state: { city: inputRef.current.value },
    });
  };

  return (
    <div className="bg-white px-3 md:px-10 py-8 pt-20 md:pt-12 w-full">
      <div className="flex flex-col w-full lg:flex-row justify-between items-center gap-2">
        <div className="flex justify-start items-center ">
          <img className="mr-3" src={profileDp} alt="profile pix" />
          <div className="">
            <p className="font-semibold text-gray-400 text-lg">
              Hello {firstName} 👋
            </p>
            <p className="text-sm text-gray-200">
              We hope your day is coming along great
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="relative h-12  mb-4 w-full lg:w-2/5 "
        >
          <input
            placeholder="What city do you live in?"
            className="border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3 lg:px-6"
            id="searchInput"
            ref={inputRef}
            // value={searchValue}
            // onChange={debouncedResults}
          />
          <button
            type="submit"
            className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-orange-200 rounded-full"
          >
            <RiSearchLine color="white" size={20} />
          </button>
        </form>
      </div>

      {/* flexed-content */}
      <div className="  md:grid md:grid-cols-12 gap-10 mt-5 md:mt-10 w-full ">
        {/* left-content */}
        <div className="col-span-8">
          <div className="bg-orange-300 border border-orange-100 rounded-lg p-3 md:p-6">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3 mb-0 md:mb-5">
              <p className="text-gray-400 text-base">Your upcoming bookings</p>
              <Link
                to="/all-bookings"
                className="text-sm font-bold text-purple-100"
              >
                View all bookings
              </Link>
            </div>
            {upcomingBookings &&
              upcomingBookings.map((booking) => {
                return (
                  <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
                    <Image
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
                );
              })}
          </div>

          {/* popular arund you */}
          <div className="mt-10">
            <StylistSection />
          </div>

          {/* questions */}
          <div className="mt-10">
            <QuestionSection />
          </div>
        </div>

        {/* right-content */}
        <div className="col-span-4">
          <div>Trending Videos</div>
          <div className="mt-8">
            <Image
              src={trendingVideo}
              alt="trending video"
              className="w-full"
            />
          </div>
          <div className="border border-gray-50 w-full my-6" />
          <div className="mt-3 rounded-lg w-full border bg-orange-150 overflow-hidden border-orange-200 shadow">
            <Image
              src={curatedProduct}
              alt="trending video"
              className="w-full"
            />
            <div className="bg-white p-3">
              <p className="font-BeatriceSemiBold text-base my-3 text-gray-400">
                Our curated products
              </p>
              <p className="text-sm text-gray-200">
                Over 100+ hand selected, trusted items for your hair.
              </p>
              <div className="flex text-orange-200 font-BeatriceSemiBold text-sm mt-3">
                Get them
                <img className="ml-3" src={arrowIcon} alt="arrow icon" />
              </div>
            </div>
          </div>
          <div className="border border-gray-50 w-full my-6 overflow-hidden" />

          <div className="mt-8">
            <p>Continue Learning</p>
            <div className="mt-3 rounded-lg w-full border border-gray-50 shadow">
              <Image
                src={continueLearning}
                alt="trending video"
                className="w-full"
              />
              <div className="bg-white p-3">
                <p className="text-sm text-gray-200">
                  Oprah Winfrey · 11 Feb 2022
                </p>
                <p className="font-BeatriceSemiBold text-base my-3 text-gray-400">
                  Here’s help for drying your textured hair the right way
                </p>
                <p className="text-sm text-gray-200">
                  A speech caused a remarkable sensation among the party. Some
                  of the birds hurried off at once to see...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
