/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import closeModalBtn from "../../../assets/images/cancel.svg";
// import admin from "../../../../api/admin";

function HairProfileModal({ isVisible, setIsVisible }) {
  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Session details";

    // if (authenticated === null) {
    //   navigate(NonAuthRoutes.login);
    // } else {
    //   navigate(AuthRoutes.home);
    // }

    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <>
      {isVisible ? (
        <div
          onClick={() => setIsVisible(false)}
          className=" fixed top-0 left-0 h-full overflow-y-auto z-50 bg-black-100 w-full flex  justify-end items-center"
        >
          <div
            className="flex items-start h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="mt-10 mr-10 bg-white rounded-full p-2"
              onClick={() => setIsVisible(false)}
              src={closeModalBtn}
              alt="close button"
            />
            <div className="bg-white min-h-screen p-10">
              <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
                Hair profile
              </h4>
              <p className="text-gray-200 text-base">
                Your hair profile helps stylists understand your hair so they
                can provide the best help.
              </p>
              <form className="mt-10">
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="detail"
                    className="text-sm text-gray-400 mb-2"
                  >
                    Describe your current routine
                  </label>
                  <textarea
                    placeholder="How do you currently style your hair? (Wash and Go? Twist Out? How do you apply your products?) "
                    id="detail"
                    className="border border-gray-800 rounded-lg p-3 w-full"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                  <label
                    htmlFor="detail"
                    className="text-sm text-gray-400 mb-2"
                  >
                    What products do you use to style your wavy or curly hair?
                  </label>
                  <textarea
                    placeholder="Type here..."
                    id="detail"
                    className="border border-gray-800 rounded-lg p-3 w-full"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                  <label
                    htmlFor="detail"
                    className="text-sm text-gray-400 mb-2"
                  >
                    How do you wear your hair when you sleep?
                  </label>
                  <textarea
                    placeholder="Type here..."
                    id="detail"
                    className="border border-gray-800 rounded-lg p-3 w-full"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                  <label
                    htmlFor="detail"
                    className="text-sm text-gray-400 mb-2"
                  >
                    Do you have problems with your hair?
                  </label>
                  <textarea
                    placeholder="eg. dryness, breakage, heat damage, color damage, etc."
                    id="detail"
                    className="border border-gray-800 rounded-lg p-3 w-full"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                  <label
                    htmlFor="detail"
                    className="text-sm text-gray-400 mb-2"
                  >
                    What do you most need help with regarding your hair?
                  </label>
                  <textarea
                    placeholder="eg. dryness, breakage, heat damage, color damage, etc."
                    id="detail"
                    className="border border-gray-800 rounded-lg p-3 w-full"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                  <label
                    htmlFor="detail"
                    className="text-sm text-gray-400 mb-2"
                  >
                    Any extra notes? (optional)
                  </label>
                  <textarea
                    placeholder="Type here..."
                    id="detail"
                    className="border border-gray-800 rounded-lg p-3 w-full"
                  />
                </div>
                <div className="mt-5">
                  <p>
                    Please upload a photo of your best natural hair day — front
                    and back if possible
                  </p>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold"
                >
                  Save hair profile
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default HairProfileModal;
