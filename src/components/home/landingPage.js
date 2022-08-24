/* eslint-disable import/no-cycle */
import { useToasts } from "react-toast-notifications";
import React, { useEffect } from "react";
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
import searchIcon from "../../assets/images/search-normal.svg";

function LandingPage({ getStylist }) {
  return (
    <div className="p-0">
      <div className="relative mt-69 md:mt-0">
        <img className="absolute w-full" src={bgOne} alt="" />
        <div className="absolute z-10 bottom-24 md:bottom-64 bg-white rounded-full w-11/12 md:w-3/4   left-1/2 transform -translate-x-1/2 p-2 md:p-3 shadow">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="What city do you live in?"
              className="border-0 outline-none w-11/12 p-0 pl-3"
            />
            <div className="rounded-full bg-orange-200 h-6 w-6 md:h-11 md:w-11 flex justify-center items-center cursor-pointer">
              <img
                src={searchIcon}
                alt="Search icon"
                className="h-3 w3 md:h-6 md:w-6"
              />
            </div>
          </div>
        </div>
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
          <img src={girl0} alt="girl with hair" />
          <img src={girl1} alt="girl with hair" />
          <img src={girl2} alt="girl with hair" />
          <img src={girl3} alt="girl with hair" />
          <img src={girl4} alt="girl with hair" />
        </div>
      </div>
      <div className="md:mt-20">
        <BookStylist getStylist={getStylist} />
        <LearnSection />
        <CommunitySection />
      </div>
      <FooterComponent getStylist={getStylist} />
    </div>
  );
}

export default LandingPage;
