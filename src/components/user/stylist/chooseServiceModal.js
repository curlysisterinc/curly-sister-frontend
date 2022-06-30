/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import wallet from "../../../assets/images/wallet.svg";
import timer from "../../../assets/images/timer.svg";

function ChooseServiceModal({ visible, setVisible, setHasService }) {
  const [isActive, setIsActive] = React.useState("everyone");

  const closeModal = () => {
    setVisible(false);
  };
  const continueButton = () => {
    setVisible(false);
    setHasService(true);
  };
  const getServices2 = [
    {
      id: 1,
      name: "Stylist training",
      description:
        "This training is for professional stylists to have a deep dive in the art of curly hair.",
      default_price: "35",
      duration: "35",
    },
    {
      id: 2,
      name: "Micro teaching session",
      description:
        "This is for the stylist who needs tuning on your skills to help improve services your are giving to your clients. Generally only 1 -2 two topics can be covered here.",
      default_price: "35",
      duration: "35",
    },
  ];

  const getServices1 = [
    {
      id: 1,
      name: "Product recommendation",
      description:
        "This is an intro scheduling call, to discuss product selection or application and basics of how to live a wavy and curly life.",
      default_price: "35",
      duration: "35",
    },
    {
      id: 2,
      name: "Consultation",
      description:
        "For clients looking for assistance with their own hair or their dependents hair. This is an in-depth tutorial to teach you specific details from amazing stylists around the world.",
      default_price: "35",
      duration: "35",
    },
  ];

  return (
    <>
      {visible ? (
        <div className="flex backdrop-blur-lg bg-gray-500 h-screen bg-opacity-75 items-start justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-3/4 md:my-6 mx-auto  h-full md:h-auto pt-6">
            <div className="flex justify-center items-center mb-3">
              <AiOutlineCloseCircle onClick={closeModal} size={24} />
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full relative  w-full grid grid-cols-12 ">
              <div className=" col-span-5 border-r border-gray-250">
                <div>
                  <div className="p-8">
                    <p className="text-sm text-gray-400">Choose a service</p>
                    <div className="flex items-center space-x-5 w-full mt-3">
                      <p
                        onClick={() => setIsActive("everyone")}
                        className={`text-sm pb-3 border-b-4 cursor-pointer ${
                          isActive === "everyone"
                            ? "text-purple-100  border-purple-100 "
                            : "text-gray-300 border-white"
                        }`}
                      >
                        For everyone
                      </p>
                      <p
                        onClick={() => setIsActive("stylists")}
                        className={`text-sm pb-3 cursor-pointer border-b-4 ${
                          isActive === "stylists"
                            ? "text-purple-100  border-purple-100 "
                            : "text-gray-300 border-white"
                        }`}
                      >
                        For stylists
                      </p>
                    </div>
                  </div>
                  <div className="">
                    {isActive === "everyone" && (
                      <div className="divide-y divide-gray-250">
                        {getServices1.map((service) => {
                          return (
                            <div className="bg-gray-50 p-8 flex items-start space-x-4">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                className="w-6 h-6 text-blue-600 bg-transparent rounded-full border-gray-250 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="default-checkbox"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                <p className="text-base font-BeatriceSemiBold text-gray-400 mb-2">
                                  {service.name}
                                </p>
                                <p className="text-sm text-gray-200">
                                  {service.description}
                                </p>
                                <div className="flex space-x-3 mt-3">
                                  <div className="bg-white inline-block w-auto rounded-md  p-1">
                                    <div className="flex items-center text-sm">
                                      <img src={wallet} alt="" />
                                      <p>${service.default_price}</p>
                                    </div>
                                  </div>
                                  <div className="bg-white inline-block w-auto rounded-md  p-1">
                                    <div className="flex items-center text-sm">
                                      <img src={timer} alt="" />
                                      <p>{service.duration} mins</p>
                                    </div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {isActive === "stylists" && (
                      <div>
                        {getServices2.map((service) => {
                          return (
                            <div className="bg-gray-50 p-8 flex items-start space-x-4">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                className="w-6 h-6 text-blue-600 bg-transparent rounded-full border-gray-250 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="default-checkbox"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                <p className="text-base font-BeatriceSemiBold text-gray-400 mb-2">
                                  {service.name}
                                </p>
                                <p className="text-sm text-gray-200">
                                  {service.description}
                                </p>
                                <div className="flex space-x-3 mt-3">
                                  <div className="bg-white inline-block w-auto rounded-md  p-1">
                                    <div className="flex items-center text-sm">
                                      <img src={wallet} alt="" />
                                      <p>${service.default_price}</p>
                                    </div>
                                  </div>
                                  <div className="bg-white inline-block w-auto rounded-md  p-1">
                                    <div className="flex items-center text-sm">
                                      <img src={timer} alt="" />
                                      <p>{service.duration} mins</p>
                                    </div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className=" col-span-7 p-8 flex justify-end items-end">
                <div className="flex justify-end items-end">
                  <button
                    onClick={continueButton}
                    className="mt-4 bg-orange-200 rounded-full w-auto px-10 h-12 inline-block text-white font-BeatriceSemiBold"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ChooseServiceModal;
