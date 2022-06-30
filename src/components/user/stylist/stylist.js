/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-shadow */
/* eslint-disable import/order */
import React from "react";
import SideBarComponent from "../../sidebar/sidebar";
import { RiSearchLine } from "react-icons/ri";
import bookIcon from "../../../assets/images/book.svg";
import bookIconOutlined from "../../../assets/images/book-outlined.svg";
import stylist1 from "../../../assets/images/stylist-place-1.png";
import stylist2 from "../../../assets/images/stylist-place-2.png";
import stylist3 from "../../../assets/images/curly-sister.png";
import stylist4 from "../../../assets/images/continue-learning.png";
import avatar1 from "../../../assets/images/avatar1.png";
import avatar2 from "../../../assets/images/avatar.png";
import avatar3 from "../../../assets/images/avatar3.png";
import avatar4 from "../../../assets/images/avatar4.png";
import wallet from "../../../assets/images/wallet.svg";
import timer from "../../../assets/images/timer.svg";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { AiTwotoneStar } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { NonAuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    banner: `${stylist1}`,
    avatar: `${avatar1}`,
    name: "Sade’s Beauty Place",
    description: "Here’s a short version of a bio where one has been provided.",
    address: "(636) 763-9867 · 333, Fremont Str, SF, CA (12km) · Certified",
    booked: false,
  },
  {
    id: 2,
    banner: `${stylist2}`,
    avatar: `${avatar2}`,
    name: "All Naturals",
    description:
      "Suddenly she came upon a little three-legged table, all made up.",
    address: "(636) 145-9831 · 546, Mandela Avenue, SF, CA (23km) · Certified",
    booked: false,
  },
  {
    id: 3,
    banner: `${stylist3}`,
    avatar: `${avatar3}`,
    name: "Curly Helen",
    description:
      "There was nothing on it except a tiny golden key, and that’s opened new...",
    address: "(636) 135-8292 · 129 Mission Street, SF, CA (26km)",
    booked: false,
  },
  {
    id: 4,
    banner: `${stylist4}`,
    avatar: `${avatar4}`,
    name: "Steven Berry",
    description:
      "That it might belong to one of the doors of the hall, but locks do exist.",
    address: "209, Clementson, LA, CA (30km)",
    booked: false,
  },
  {
    id: 5,
    banner: `${stylist1}`,
    avatar: `${avatar1}`,
    name: "Sade’s Beauty Place",
    description: "Here’s a short version of a bio where one has been provided.",
    address: "(636) 763-9867 · 333, Fremont Str, SF, CA (12km) · Certified",
    booked: true,
  },
  {
    id: 6,
    banner: `${stylist2}`,
    avatar: `${avatar2}`,
    name: "All Naturals",
    description:
      "Suddenly she came upon a little three-legged table, all made up.",
    address: "(636) 145-9831 · 546, Mandela Avenue, SF, CA (23km) · Certified",
    booked: true,
  },
  {
    id: 7,
    banner: `${stylist3}`,
    avatar: `${avatar3}`,
    name: "Curly Helen",
    description:
      "There was nothing on it except a tiny golden key, and that’s opened new...",
    address: "(636) 135-8292 · 129 Mission Street, SF, CA (26km)",
    booked: true,
  },
  {
    id: 8,
    banner: `${stylist4}`,
    avatar: `${avatar4}`,
    name: "Steven Berry",
    description:
      "That it might belong to one of the doors of the hall, but locks do exist.",
    address: "209, Clementson, LA, CA (30km)",
    booked: false,
  },
];

const CommonCard = ({ stylist }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        stylist.booked
          ? navigate(NonAuthRoutes.bookedStylistProfile)
          : navigate(NonAuthRoutes.stylistProfile);
      }}
      className="col-1 rounded-2xl shadow-md relative overflow-hidden cursor-pointer"
    >
      <div className="absolute top-0 right-0 mr-4 mt-4 ">
        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
          <MdOutlineBookmarkBorder color="white" />
        </span>
      </div>

      <img src={stylist.banner} alt="" />
      <div className="bg-white px-5 py-3 relative">
        <div className="flex justify-between items-center">
          <img className="-mt-16" src={stylist.avatar} alt="" />
          <div className="flex  space-x-2">
            <AiTwotoneStar color="#590BA9" />
            <span className="text-sm font-BeatriceMedium">
              4.89{" "}
              <span className="text-slate-400 text-xs font-BeatriceRegular text-gray-200">
                (12 reviews)
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-3 mt-4">
          <p className="text-base font-BeatriceSemiBold text-gray-400">
            {stylist.name}
          </p>
          <p className="text-sm text-gray-400 line-clamp-2">
            {stylist.description}
          </p>
          <p className="text-sm text-gray-200">{stylist.address}</p>
        </div>
      </div>
    </div>
  );
};

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
const ServiceCard = ({ service }) => {
  const [isClicked, setIsClicked] = React.useState(false);
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
function Stylist() {
  const [openMap, setOpenMap] = React.useState(true);
  const [toggleType, setToggleType] = React.useState(false);
  const [isActive, setIsActive] = React.useState("everyone");
  const [bookedService, setBookedService] = React.useState(false);
  const [getStylist, setGetStylist] = React.useState(data);

  const toggleBookedService = () => {
    setBookedService(!bookedService);
    if (!bookedService) {
      return setGetStylist((prev) => prev.filter((item) => item.booked));
      // console.log(filtered, "filtered");
    } else {
      return setGetStylist(data);
      // console.log(data, "data");
    }
  };

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="stylist" />
      <div className="ml-80 bg-white px-10 pt-14 w-full min-h-screen">
        <div className="grid grid-cols-12 gap-3">
          <div className="relative col-span-9 h-12">
            <input
              placeholder="What city do you live in?"
              className="border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3"
            />
            <div className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2 w-36 h-36 bg-orange-200 rounded-full">
              <RiSearchLine color="white" size={20} />
            </div>
          </div>
          <select className="col-span-3 border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3">
            <option>All stylist</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="flex  mt-3 ">
          <div
            onClick={toggleBookedService}
            className={`cursor-pointer h-12 flex items-center space-x-2 border rounded-full placeholder:text-sm placeholder:text-gray-300 px-4 ${
              bookedService
                ? "bg-gray-550 border-purple-100"
                : "bg-white border-gray-600"
            }`}
          >
            {bookedService ? (
              <img src={bookIconOutlined} alt="" />
            ) : (
              <img src={bookIcon} alt="" />
            )}
            <p className="text-gray-400 text-sm">Service booking available</p>
          </div>

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
              <div className="absolute z-20 top-14 left-0 bg-white shadow-lg rounded-xl p-8 w-543">
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
                        {getServices1.map((service) => {
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
                        {getServices2.map((service) => {
                          return <ServiceCard service={service} />;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <select className="w-32 border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 h-12 px-4 ">
            <option>Virtual</option>
            <option>Live</option>
          </select>

          <div className=" ml-auto h-12 flex items-center justify-center  border border-gray-250 bg-white rounded-full px-4">
            More filters
          </div>
        </div>
        <hr className="w-full border border-gray-600 mt-8" />
        <div className="grid grid-cols-12 gap-4 ">
          <div className={` ${openMap ? "col-span-8" : "col-span-12"}`}>
            <div className="flex justify-between items-center mt-8">
              <p className="text-gray-200 text-sm">
                {!bookedService ? "1520+" : "200"} stylists
              </p>
              <p
                className="text-gray-200 text-sm cursor-pointer"
                onClick={() => setOpenMap(!openMap)}
              >
                {openMap ? "Hide map" : "Show map"}
              </p>
            </div>

            <div
              className={`grid  gap-6 mt-5 w-full ${
                openMap ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {getStylist.map((item) => {
                return <CommonCard key={item.id} stylist={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stylist;
