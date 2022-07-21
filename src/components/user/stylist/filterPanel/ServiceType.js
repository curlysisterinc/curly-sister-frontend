/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import wallet from "../../../../assets/images/wallet.svg";
import timer from "../../../../assets/images/timer.svg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ServiceCard = ({ service }) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [sessionState, setSessionState] = useState("virtual");
  return (
    <div
      onClick={() => setIsClicked(!isClicked)}
      className={` cursor-pointer shadow rounded-xl  grid grid-cols-12 mt-5 w-full h-40 overflow-hidden border-2 hover:bg-gray-550 hover:border-purple-100 ${
        isClicked ? "bg-gray-550 border-purple-100" : "bg-white border-gray-600"
      }`}
    >
      <div className="p-5 col-span-9">
        <h6 className="text-base font-BeatriceSemiBold mb-3">{service.name}</h6>
        <p className="text-sm text-gray-300 tracking-tight">
          {service.description}
        </p>
      </div>
      <div className="relative bg-service-image col-span-3 bg-cover bg-no-repeat  h-full w-full flex justify-end p-2 text-right">
        {isClicked && (
          <BsFillCheckCircleFill
            color="white"
            size={20}
            className="absolute right-2 top-2"
          />
        )}
        <div className="flex flex-col h-full justify-end items-end">
          <div className="mb-3">
            <div className="bg-white inline-block w-auto rounded-md  p-1">
              <div className="flex items-center text-sm">
                <img src={wallet} alt="" />
                <p>${service.default_price}</p>
              </div>
            </div>
          </div>
          <div className="bg-white inline-block w-auto rounded-md  p-1">
            <div className="flex items-center text-sm">
              <img src={timer} alt="" />
              <p>{service.duration} mins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ServiceType({ getServices }) {
  const [toggleType, setToggleType] = useState(false);
  const [isActive, setIsActive] = useState("everyone");
  return (
    <div
      className={`mx-3 relative flex items-center justify-between w-48 border outline-none focus:outline-none   rounded-full placeholder:text-sm placeholder:text-gray-300 h-12 px-4 ${
        toggleType
          ? "border-purple-100 bg-gray-550"
          : "border-gray-250 bg-white"
      }`}
    >
      <p>Type of service</p>

      {!toggleType ? (
        <IoIosArrowDown
          onClick={() => setToggleType(!toggleType)}
          size={20}
          className="cursor-pointer"
        />
      ) : (
        <IoIosArrowUp
          onClick={() => setToggleType(!toggleType)}
          size={20}
          className="cursor-pointer"
        />
      )}
      {toggleType && (
        <div className="absolute z-20 top-14 left-0 bg-white shadow-lg rounded-xl p-8 w-543 h-500 overflow-auto">
          <div className="flex items-center space-x-5 w-full">
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
          <div className="mt-5">
            {isActive === "everyone" && (
              <div>
                <p className="text-sm text-gray-400">
                  Services to help with your own hair
                </p>
                <div>
                  {getServices
                    ?.filter((service) => service.who_is_this_for === "Others")
                    ?.map((service) => {
                      return <ServiceCard service={service} />;
                    })}
                </div>
              </div>
            )}
            {isActive === "stylists" && (
              <div>
                <p className="text-sm text-gray-400">
                  Services to help with your client’s hair
                </p>
                <div>
                  {getServices
                    .filter((service) => service.who_is_this_for === "Stylists")
                    .map((service) => {
                      return <ServiceCard service={service} />;
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceType;
