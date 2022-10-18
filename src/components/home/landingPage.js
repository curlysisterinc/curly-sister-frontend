/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { useToasts } from "react-toast-notifications";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import useVerifyUsersAccount from "hooks/useVerifyUsersAccount";
import Image from "components/image";
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
  const { addToast } = useToasts();
  const {
    state: { isSignedIn, email_verified },
  } = useAuthContext();

  const verifyUsersAccount = useVerifyUsersAccount();

  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/stylists`, {
      state: { city: inputRef.current.value },
    });
  };
  return (
    <div className="p-0">
      <div className="relative mt-69 md:mt-0">
        <img className="absolute w-full" src={bgOne} alt="" />

        <form
          onSubmit={handleSearch}
          className="absolute z-10 bottom-24 md:bottom-64 w-11/12 md:w-3/4   left-1/2 transform -translate-x-1/2 p-2 md:p-3 shadow"
        >
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
