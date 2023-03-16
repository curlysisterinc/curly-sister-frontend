/* global google */ // To disable any eslint 'google not defined' errors

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import Image from "components/image";
import Script from "react-load-script";

import dayjs from "dayjs";
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
  const autocompleteRef = useRef(null);

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

  const handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ["(cities)"],
    };

    // Initialize Google Autocomplete
    autocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById("searchInput"),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);

    // Fire Event when a suggested name is selected
    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = autocompleteRef.current.getPlace();
    const address = addressObject.address_components;
    // Check if address is valid
    if (address) {
      // setCity(address[0].long_name);
      // setQuery(addressObject.formatted_address);
      handleSearch(addressObject.formatted_address);
    }
  };

  const handleSearch = (city) => {
    navigate(`/stylists`, {
      state: { city },
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
          // onSubmit={handleSearch}
          className="relative h-12  mb-4 w-full lg:w-2/5 "
        >
          <Script
            url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&libraries=places`}
            onLoad={handleScriptLoad}
          />
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
          {upcomingBookings.length ? (
            <div className="bg-orange-300 border border-orange-100 rounded-lg p-3 md:p-6 mb-10">
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3 mb-0 md:mb-5">
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
              {upcomingBookings &&
                upcomingBookings.map((booking) => {
                  return (
                    <div className="mb-4 bg-white flex shadow-s01 rounded-xl border border-gray-250 w-full p-3 ">
                      <div className="w-12 mr-3">
                        <Image src={productRecommendation} alt="circle" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-400 text-base">
                          {booking?.service?.name ?? "Booked Service"}
                        </p>
                        <p className="text-sm text-gray-200">
                          {booking?.stylist?.stylist_name ||
                            booking?.stylist?.business_name}{" "}
                          ·{dayjs(booking?.booked_date).format("ddd, DD MMM")} ·
                          {dayjs(booking?.booked_date).format("h :mm A (Z)")}
                          {/* 4:30 PM (GMT +1) */}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : null}

          {/* popular arund you */}
          <div className="mb-10">
            <StylistSection />
          </div>

          {/* questions */}
          <div className="mb-10">
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
