/* eslint-disable import/order */
import React from "react";
import SideBarComponent from "../../sidebar/sidebar";
import Hurray from "../../../assets/images/hurray.svg";
import questionnaire from "../../../assets/images/questionnaire.svg";
import hairProfile from "../../../assets/images/hair-profile.svg";
import addCalendar from "../../../assets/images/add-calendar.svg";
import manageBookings from "../../../assets/images/manage-bookings.svg";
import { MdArrowForwardIos } from "react-icons/md";
import SessionDetailsModal from "./sessionDetailsModal";
import HairProfileModal from "./hairProfileModal";

function SuccessfullBooking() {
  const [openSessionDetails, setOpenSessionDetails] = React.useState(false);
  const [openHairProfile, setOpenHairProfile] = React.useState(false);
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="stylist" />
      <div className="ml-80 bg-white  pt-14 w-full min-h-screen">
        <div className="border border-orange-100 bg-orange-300 rounded-xl w-1/2 mx-auto p-8">
          <img src={Hurray} alt="" />
          <p className="text-base font-BeatriceSemiBold text-gray-400 my-4">
            Booking successful!
          </p>
          <p className="text-sm text-gray-400">
            You’ve successfully booked a session with <i>All Naturals</i>. Now,
            let’s ensure you’re prepared for it.
          </p>
          <div className="mt-10">
            <p className="text-base text-gray-400">
              Next steps — let’s prepare you for your booking
            </p>
            <div className="flex flex-col space-y-5 mt-6">
              <div className="flex items-center justify-between bg-white border border-gray-250 rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <img src={questionnaire} alt="" />
                  <div>
                    <p className="text-base text-gray-400 mb-2">
                      Session Questionnaire
                    </p>
                    <p className="text-sm text-gray-200">
                      Your goals and preferences for this session
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-purple-100 bg-transparent rounded-full border-gray-250 "
                  />
                  <MdArrowForwardIos
                    onClick={() => setOpenSessionDetails(true)}
                    color="#8E8695"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-white border border-gray-250 rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <img src={hairProfile} alt="" />
                  <div>
                    <p className="text-base text-gray-400 mb-2">Hair profile</p>
                    <p className="text-sm text-gray-200">
                      Information about your hair
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-purple-100 bg-transparent rounded-full border-gray-250 "
                  />
                  <MdArrowForwardIos
                    onClick={() => setOpenHairProfile(true)}
                    color="#8E8695"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-white border border-gray-250 rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <img src={addCalendar} alt="" />
                  <div>
                    <p className="text-base text-gray-400 mb-2">
                      Add to calendar
                    </p>
                    <p className="text-sm text-gray-200">
                      Save this booking so you can remember
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer inline-block w-auto rounded-full bg-gray-400 text-white text-sm px-5 py-3 ">
                  Add
                </div>
              </div>
              <div className="flex items-center justify-between bg-white border border-gray-250 rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <img src={manageBookings} alt="" />
                  <div>
                    <p className="text-base text-gray-400 mb-2">
                      Manage your bookings
                    </p>
                    <p className="text-sm text-gray-200">
                      Make changes to your bookings anytime
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer inline-block w-auto rounded-full bg-gray-400 text-white text-sm px-5 py-3 ">
                  Manage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SessionDetailsModal
        isVisible={openSessionDetails}
        setIsVisible={setOpenSessionDetails}
      />
      <HairProfileModal
        isVisible={openHairProfile}
        setIsVisible={setOpenHairProfile}
      />
    </div>
  );
}

export default SuccessfullBooking;
