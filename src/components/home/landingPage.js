/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* global google */ // To disable any eslint 'google not defined' errors

import { useToasts } from "react-toast-notifications";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import useVerifyUsersAccount from "hooks/useVerifyUsersAccount";
import Image from "components/image";
import Script from "react-load-script";
import girl0 from "../../assets/images/girl-0.png";
import girl1 from "../../assets/images/girl-1.png";
import girl2 from "../../assets/images/girl-2.png";
import girl3 from "../../assets/images/girl-3.png";
import girl4 from "../../assets/images/girl-4.png";
import bgOne from "../../assets/images/bg-one.png";

import LearnSection from "./learn";
import BookStylist from "./bookStylist";
import CommunitySection from "./community";
import FooterComponent from "../footer/footer";
import searchIcon, {
  ReactComponent as RiSearchLine,
} from "../../assets/images/search-normal.svg";

function LandingPage({ getStylist }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const { addToast } = useToasts();
  const {
    state: { isSignedIn, email_verified },
  } = useAuthContext();

  const verifyUsersAccount = useVerifyUsersAccount();

  const navigate = useNavigate();
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
    <div className="p-0">
      <div className="relative mt-69 md:mt-0">
        <img className="absolute w-full" src={bgOne} alt="" />

        <form
          // onSubmit={handleSearch}
          className="absolute z-10 bottom-24 md:bottom-64 w-11/12 md:w-3/4   left-1/2 transform -translate-x-1/2 p-2 md:p-3 shadow"
        >
          <Script
            url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&libraries=places`}
            onLoad={handleScriptLoad}
          />
          <div className="relative h-12 lg:h-16 mb-4">
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
          </div>
        </form>
        <div className="bg-purple-200 p-4 md:px-10 md:pt-14">
          <div className="relative text-center w-full border border-orange-100 flex flex-col justify-center items-center py-16 md:py-24">
            <h1 className="text-white font-bold text-2xl md:text-5xl font-GTSuperTextBlack">
              Let’s find you a stylist
            </h1>
            <p className="text-white text-sm md:text-lg mt-6">
              Find thousands of curly hair stylists right at your fingertips
            </p>
          </div>
        </div>
        <div className="flex justify-start flex-nowrap overflow-x-hidden h-28 md:h-72">
          <Image src={girl0} alt="girl with hair" />
          <Image src={girl1} alt="girl with hair" />
          <Image src={girl2} alt="girl with hair" />
          <Image src={girl3} alt="girl with hair" />
          <Image src={girl4} alt="girl with hair" />
        </div>
      </div>
      <div className="md:mt-20">
        <BookStylist getStylist={getStylist} />
        <LearnSection />
        <CommunitySection />
      </div>
      <FooterComponent />
    </div>
  );
}

export default LandingPage;
