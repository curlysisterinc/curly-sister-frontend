/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import SideBarComponent from "../sidebar/sidebar";
import FooterComponent from "../footer/footer";
import aboutPix1 from "../../assets/images/about-pix1.png";
import aboutPix2 from "../../assets/images/about-pix2.png";
import aboutPix3 from "../../assets/images/about-pix3.png";
import aboutPix4 from "../../assets/images/about-pix4.png";
import FounderSection from "./founder";
import BecomeStylistSection from "./becomeStylist";

function AboutComponent() {
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="home" />
      <div className="ml-80 p-0">
        <div className="relative">
          <div className="bg-purple-200 px-10 pt-14">
            <div className="border border-orange-100 relative">
              <img
                className="absolute top-20 left-20"
                src={aboutPix1}
                alt="about pix"
              />
              <img
                className="absolute bottom-5 left-0"
                src={aboutPix2}
                alt="about pix"
              />
              <img
                className="absolute top-20 right-20"
                src={aboutPix3}
                alt="about pix"
              />
              <img
                className="absolute bottom-10 right-10"
                src={aboutPix4}
                alt="about pix"
              />

              <div className="relative text-center w-1/2 m-auto py-24">
                <h1 className="text-white font-bold text-5xl">
                  We are passionate about textured hair.
                </h1>
                <p className="text-white text-lg mt-6">
                  Curly Sister is an <strong>affirming space</strong> where
                  people can get trustworthy professional advice to help them
                  accept their hair without damaging or harming their waves or
                  curls.
                </p>
              </div>
            </div>
          </div>
          <div className=" px-10 pb-10 bg-orange-100">
            <div className="bg-orange-50 border border-orange-50">
              <p className="w-3/5 mx-auto my-14 text-center">
                Our collection of <strong>curated videos</strong> helps inspire
                people with wavy or curly hair to either learn to maintain
                and/or style their hair in its natural state. We’re also an
                ecosystem where <strong>people can join </strong>
                to learn about and be inspired by the variations in the world of
                wavy & curly hair.
              </p>
            </div>
          </div>
        </div>
        <FounderSection />
        <BecomeStylistSection />
        <FooterComponent />
      </div>
    </div>
  );
}

export default AboutComponent;
