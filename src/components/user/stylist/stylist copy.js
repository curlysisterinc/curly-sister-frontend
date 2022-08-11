/* eslint-disable import/no-cycle */
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
import React, { useState } from "react";
import SideBarComponent from "../../sidebar/sidebar";
import { RiSearchLine } from "react-icons/ri";
import bookIcon from "../../../assets/images/book.svg";
import bookIconOutlined from "../../../assets/images/book-outlined.svg";
import wallet from "../../../assets/images/wallet.svg";
import timer from "../../../assets/images/timer.svg";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { AiTwotoneStar } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";
import {
  data,
  getServices1,
  getServices2,
} from "../../admin/dashboard/users/data";
import CommonCard from "../../stylistCard";
import admin from "../../../api/admin";
import Category from "../../customdropdown/stylist/stylistcategory";
import Session from "../../customdropdown/stylist/session";

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
function Stylist() {
  const [openMap, setOpenMap] = React.useState(true);
  const [toggleType, setToggleType] = React.useState(false);
  const [isActive, setIsActive] = React.useState("everyone");
  const [bookedService, setBookedService] = React.useState(false);
  const [getStylist, setGetStylist] = React.useState([]);
  const [filterObject, setFilterObject] = useState({
    bookingAvailable: false,
    category: "curly sister stylist",
    session: "In-person",
  });

  const handleFilterObject = (key, value) => {
    setFilterObject((prev) => ({ ...prev, [key]: value }));
  };

  const toggleBookedService = () => {
    setBookedService(!bookedService);
    handleFilterObject("bookingAvailable", !filterObject.bookingAvailable);
    // console.log(getStylist);
    // if (filterObject.bookingAvailable) {
    //   getStylist.filter(stylist => stylist.services.length > 0)
    //   // return setGetStylist((prev) => prev.filter((item) => item.booked));
    //   // console.log(filtered, "filtered");
    // }
    //  else {
    //   return setGetStylist((prev) => prev.filter((item) => item));
    //   // console.log(data, "data");
    // }
  };
  React.useEffect(() => {
    admin.GetAllStylists().then((response) => {
      console.log(response.data);
      setGetStylist(response.data.stylists);
    });
  }, []);

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="stylists" />
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
          <Category
            setTypeValue={handleFilterObject}
            typeValue={filterObject.category}
          />
          {/* <select className="col-span-3 border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3">
            <option>All stylist</option>
            <option>Admin</option>
          </select> */}
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

          <Session
            setTypeValue={handleFilterObject}
            typeValue={filterObject.session}
          />
          {/* <select className="w-32 border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 h-12 px-4 ">
            <option>Virtual</option>
            <option>Live</option>
          </select> */}

          <div className=" ml-auto h-12 flex items-center justify-center  border border-gray-250 bg-white rounded-full px-4">
            More filters
          </div>
        </div>
        <hr className="w-full border border-gray-600 mt-8" />
        {getStylist.length ? (
          <div className="grid grid-cols-12 gap-4 ">
            <div className={` ${openMap ? "col-span-8" : "col-span-12"}`}>
              <div className="flex justify-between items-center mt-8">
                <p className="text-gray-200 text-sm">
                  {getStylist.length} stylists
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
                {filterObject.bookingAvailable
                  ? getStylist
                      .filter((stylist) => stylist.services.length > 0)
                      .map((item) => {
                        return <CommonCard key={item.id} stylist={item} />;
                      })
                  : getStylist.map((item) => {
                      return <CommonCard key={item.id} stylist={item} />;
                    })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-lg text-center mt-8">No stylist available</div>
        )}
      </div>
    </div>
  );
}

export default Stylist;
