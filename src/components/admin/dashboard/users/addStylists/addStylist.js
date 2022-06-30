/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import SideBarComponent from "../../../../sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import backArrow from "../../../../../assets/images/back-arrow.svg";
import clsx from "clsx";
import { phoneNumberCountries } from "../data";
import AvailabilityTab from "./availability";
import GalleryTab from "./gallery";
import ServicesTab from "./services";
import CertificateAndTags from "./certificateAndTags";
import LocationAndContact from "./locationAndContact";
import DetailsTab from "./details";

function AddStylist() {
  const [openDetails, setOpenDetails] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        <div className="flex items-start ">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img className="mr-2" src={backArrow} alt="back arrow" />
            Go Back
          </div>
          <form autoComplete="off" className="ml-28 w-4/6 ">
            <div className=" flex justify-between items-center">
              <div className="text-22 text-gray-400 font-BeatriceSemiBold">
                Add stylist
              </div>
              <div className="flex">
                <select className="mr-3 bg-white border rounded-full border-gray-250  shadow-sm">
                  <option>Master stylist</option>
                  <option>Stylist</option>
                  <option>Super Admin</option>
                </select>

                <select className="mr-3 bg-white border rounded-full border-gray-250  shadow-sm">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <button
                  type="button"
                  // onClick={handleCreateStylist}
                  className="text-sm font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white"
                >
                  Save
                </button>
              </div>
            </div>

            <hr className="mb-5 mt-5 border-b border-gray-600  mx-auto" />
            {/* accordion */}
            {/* details */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenDetails(!openDetails)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Details
                <img
                  className={clsx(
                    openDetails && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openDetails && <DetailsTab />}
            </div>
            {/* location and contact */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenLocation(!openLocation)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Location and contact
                <img
                  className={clsx(
                    openLocation && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openLocation && <LocationAndContact />}
            </div>
            {/* certification and tag */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenCertification(!openCertification)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Certification and tags
                <img
                  className={clsx(
                    openCertification && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openCertification && <CertificateAndTags />}
            </div>
            {/* services and pricing */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenService(!openService)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Services and pricing
                <img
                  className={clsx(
                    openService && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openService && <ServicesTab />}
            </div>
            {/* availability */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenAvailability(!openAvailability)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Availability
                <img
                  className={clsx(
                    openDetails && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openAvailability && (
                <div className="">
                  <AvailabilityTab />
                </div>
              )}
            </div>
            {/* gallery */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenGallery(!openGallery)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Gallery
                <img
                  className={clsx(
                    openDetails && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openGallery && <GalleryTab />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStylist;
