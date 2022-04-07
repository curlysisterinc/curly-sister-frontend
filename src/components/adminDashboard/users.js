/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../constants";
// import grayIndicator from "../../assets/images/gray-indicator.svg";
import greenIndicator from "../../assets/images/green-indicator.svg";
import profileDp from "../../assets/images/profile-dp.png";
import addManuallyIcon from "../../assets/images/add-manually.svg";
import dropdownIcon from "../../assets/images/dropdown.svg";
import searchIcon from "../../assets/images/search-normal-2.svg";
import stylists from "../api/stylists";

function UsersTab() {
  const [activeTab, setActiveTab] = useState("stylists");
  const [toggleAddStylist, setToggleAddStylist] = useState(false);
  const [allStylists, setAllStylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ac = new AbortController();
    document.title = "CurlySisters • Stylists";

    stylists.GetAllStylists().then((response) => {
      if (response.status === 200) {
        console.log(response.data, "res");
        setAllStylists(response.data);
      }
    });

    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <div>
      <div className="flex w-1/2 mx-auto justify-center mb-5">
        <button
          type="button"
          onClick={() => setActiveTab("stylists")}
          className={
            activeTab === "stylists"
              ? "border border-purple-100 rounded-full px-5 py-3 bg-white text-purple-100 mx-3"
              : "border border-gray-250 rounded-full px-5 py-3 bg-white text-gray-250 mx-3"
          }
        >
          Stylists
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("admins")}
          className={
            activeTab === "admins"
              ? "border border-purple-100 rounded-full px-5 py-3 bg-white text-purple-100 mx-3"
              : "border border-gray-250 rounded-full px-5 py-3 bg-white text-gray-250 mx-3"
          }
        >
          Admins
        </button>{" "}
        <button
          type="button"
          onClick={() => setActiveTab("individuals")}
          className={
            activeTab === "individuals"
              ? "border border-purple-100 rounded-full px-5 py-3 bg-white text-purple-100 mx-3"
              : "border border-gray-250 rounded-full px-5 py-3 bg-white text-gray-250 mx-3"
          }
        >
          Individuals
        </button>
      </div>

      {/* stylists */}
      <div>
        <div className="flex justify-between items-center">
          <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
            Stylists
            <span className="text-gray-300 ml-2 text-sm">11,439</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="border mr-2 border-gray-250 rounded-full px-3 h-10 flex justify-between items-center">
              All stylists
              <img className="ml-12" src={dropdownIcon} alt="" />
            </div>

            <div className="mr-2 border border-gray-250 rounded-full px-3 h-10 flex justify-center items-center">
              More filters
            </div>
            <div className=" border mr-2 border-gray-250 rounded-full px-3 h-10 flex justify-between items-center">
              <input
                type="text"
                className="rounded-full w-32 border-0 outline-none inline-block"
                placeholder="Search..."
              />
              <img className="" src={searchIcon} alt="" />
            </div>
            <div
              onClick={() => setToggleAddStylist(!toggleAddStylist)}
              className="cursor-pointer bg-purple-100 relative text-white h-10 font-BeatriceSemiBold text-sm flex justify-between items-center  rounded-full p-3"
            >
              New stylists
              <img className="ml-6" src={dropdownIcon} alt="" />
              {toggleAddStylist && (
                <div className="absolute bg-white rounded-xl top-10 shadow w-44 right-0">
                  <div
                    // eslint-disable-next-line no-undef
                    onClick={() => navigate(AuthRoutes.addStylist)}
                    className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
                  >
                    <img className="mr-2" src={addManuallyIcon} alt="" />
                    Add manually
                  </div>
                  <div className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer ">
                    <img className="mr-2" src={addManuallyIcon} alt="" />
                    Import .csv
                  </div>{" "}
                  <div className=" hover:bg-gray-600 p-2 text-xs text-gray-400 flex items-center w-full cursor-pointer">
                    <img className="mr-2" src={addManuallyIcon} alt="" />
                    Get .csv template
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* table */}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left border border-gray-600">
                  <thead className=" bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-400 px-6 py-4"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-400 px-6 py-4"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-400 px-6 py-4"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-400 px-6 py-4"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-gray-600">
                      {allStylists.map((fetchedStylist) => {
                        return (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                              <img
                                className="h-10 w-10"
                                src={profileDp}
                                alt="profile pix"
                              />
                              <div className="ml-2">
                                <p className="text-sm text-gray-400 mb-1">
                                  {fetchedStylist?.name}
                                </p>
                                <p className="text-xs text-gray-200 ">
                                  bookings@allnaturals.com
                                </p>
                              </div>
                            </td>
                            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                              Curly sister stylist
                            </td>
                            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                              333, Fremont Street, SF, CA, 94105, USA
                            </td>
                            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                              <img src={greenIndicator} alt="" />
                            </td>
                          </>
                        );
                      })}
                    </tr>
                    {/* 
                    <tr className="bg-white border-b border-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          className="h-10 w-10"
                          src={profileDp}
                          alt="profile pix"
                        />
                        <div className="ml-2">
                          <p className="text-sm text-gray-400 mb-1">
                            All Naturals
                          </p>
                          <p className="text-xs text-gray-200 ">
                            bookings@allnaturals.com
                          </p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        Curly sister stylist
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        333, Fremont Street, SF, CA, 94105, USA
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        <img src={greenIndicator} alt="" />
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          className="h-10 w-10"
                          src={profileDp}
                          alt="profile pix"
                        />
                        <div className="ml-2">
                          <p className="text-sm text-gray-400 mb-1">
                            All Naturals
                          </p>
                          <p className="text-xs text-gray-200 ">
                            bookings@allnaturals.com
                          </p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        Walk-in only
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        2, Hebert Macaulay Way, Yaba, Lagos, 100...
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        <img src={grayIndicator} alt="" />
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          className="h-10 w-10"
                          src={profileDp}
                          alt="profile pix"
                        />
                        <div className="ml-2">
                          <p className="text-sm text-gray-400 mb-1">
                            All Naturals
                          </p>
                          <p className="text-xs text-gray-200 ">
                            bookings@allnaturals.com
                          </p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        Walk-in only
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        2, Hebert Macaulay Way, Yaba, Lagos, 100...
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        <img src={grayIndicator} alt="" />
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersTab;
