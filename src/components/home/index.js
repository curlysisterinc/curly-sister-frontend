/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import SideBarComponent from "../sidebar";
import FooterComponent from "../footer";
import searchIcon from "../../assets/images/search-normal.svg";
import girl0 from "../../assets/images/girl-0.png";
import girl1 from "../../assets/images/girl-1.png";
import girl2 from "../../assets/images/girl-2.png";
import girl3 from "../../assets/images/girl-3.png";
import girl4 from "../../assets/images/girl-4.png";
import bgOne from "../../assets/images/bg-one.png";
import LearnSection from "./learn";
import BookStylist from "./bookStylist";
import CommunitySection from "./community";

function HomeComponent() {
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="home" />
      <div className="ml-72 p-0">
        <div className="relative">
          <img className="absolute w-full" src={bgOne} alt="" />
          <div className="absolute z-10 top-1/2 bg-white rounded-full w-3/4  left-1/2 transform -translate-x-1/2 p-3 shadow">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="What city do you live in?"
                className="border-0 outline-none w-11/12"
              />
              <div className="rounded-full bg-orange-200 h-11 w-11 flex justify-center items-center cursor-pointer">
                <img src={searchIcon} alt="Search icon" />
              </div>
            </div>
          </div>
          <div className="bg-purple-200 px-10 pt-14">
            <div className="relative text-center w-full border border-orange-100 flex flex-col justify-center items-center py-24">
              <h1 className="text-white font-bold text-5xl">
                Let’s find you a stylist
              </h1>
              <p className="text-white text-lg mt-6">
                Find thousands of curly hair stylists right at your fingertips
              </p>
            </div>
          </div>
          <div className="flex justify-start flex-nowrap overflow-x-hidden">
            <img src={girl0} alt="girl with hair" />
            <img src={girl1} alt="girl with hair" />
            <img src={girl2} alt="girl with hair" />
            <img src={girl3} alt="girl with hair" />
            <img src={girl4} alt="girl with hair" />
          </div>
        </div>
        <div className="mt-20">
          <LearnSection />
          <BookStylist />
          <CommunitySection />
        </div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default HomeComponent;
