/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable-next-line jsx-a11y/control-has-associated-label */
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../../../constants";
import grayIndicator from "../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../assets/images/green-indicator.svg";
import addManuallyIcon from "../../../../assets/images/add-manually.svg";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import whiteDropdownIcon from "../../../../assets/images/white-dropdown.svg";
import searchIcon from "../../../../assets/images/search-normal-2.svg";
import kebabIcon from "../../../../assets/images/kebab.svg";
import { stylistTypes, users } from "./data";
// import trashIcon from "../../assets/images/trash.svg";
// import activateIcon from "../../assets/images/activate.svg";
// import stylists from "../api/stylists";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function UsersTab() {
  const [activeTab, setActiveTab] = useState("stylists");
  const [toggleAddStylist, setToggleAddStylist] = useState(false);
  // const [allStylists, setAllStylists] = useState([]);
  const [selectedType, setSelectedType] = useState(stylistTypes[0]);

  const [list, setList] = useState(users);
  // const [selectedList, setSelectedList] = useState([]);
  const [masterChecked, setMasterChecked] = useState(false);
  const navigate = useNavigate();

  const onMasterCheck = (e) => {
    const tempList = list;
    tempList.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked);
    setList(tempList);
    // setSelectedList(list.filter((e) => e.selected));
  };

  const onItemCheck = (e, item) => {
    const tempList = list;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });
  };
  // useEffect(() => {
  //   const ac = new AbortController();
  //   document.title = "CurlySisters • Stylists";

  //   stylists.GetAllStylists().then((response) => {
  //     if (response.status === 200) {
  //       console.log(response.data.stylist, "res");
  //       setAllStylists(response.data.stylist);
  //     }
  //   });

  //   return function cleanup() {
  //     ac.abort();
  //   };
  // }, []);

  return (
    <div>
      <div className="flex w-1/2 mx-auto justify-center mb-5">
        <button
          type="button"
          onClick={() => setActiveTab("stylists")}
          className={
            activeTab === "stylists"
              ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mx-3"
              : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mx-3"
          }
        >
          Stylists
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("admins")}
          className={
            activeTab === "admins"
              ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mx-3"
              : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mx-3"
          }
        >
          Admins
        </button>{" "}
        <button
          type="button"
          onClick={() => setActiveTab("individuals")}
          className={
            activeTab === "individuals"
              ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mx-3"
              : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mx-3"
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
            {/* stylist type */}
            <Listbox value={selectedType} onChange={setSelectedType}>
              {({ open }) => (
                <div className="relative mr-3">
                  <Listbox.Button className="relative bg-white border rounded-full border-gray-250 w-196  shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-100 sm:text-sm">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selectedType.name}
                      </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <img
                        className={clsx(
                          open && "transform rotate-180",
                          "ml-12 "
                        )}
                        src={dropdownIcon}
                        alt=""
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {stylistTypes.map((type) => (
                        <Listbox.Option
                          key={type.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-400",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={type}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {type.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  {/* <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      /> */}
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>

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
              <img
                className={clsx(
                  toggleAddStylist && "transform rotate-180",
                  "ml-6"
                )}
                src={whiteDropdownIcon}
                alt=""
              />
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
        <div className="flex flex-col mt-4">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left border border-gray-600 ">
                  <thead className=" bg-gray-50">
                    <tr>
                      <th scope="col ">
                        <input
                          type="checkbox"
                          className="ml-3"
                          checked={masterChecked}
                          id="mastercheck"
                          onChange={(e) => onMasterCheck(e)}
                        />
                      </th>
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
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-400 px-6 py-4"
                      />
                    </tr>
                  </thead>
                  <tbody className="">
                    {list.map((user) => (
                      <tr
                        key={user.id}
                        className="bg-white border-b border-gray-600"
                        onClick={() => navigate(AuthRoutes.addStylist)}
                      >
                        <th scope="row">
                          <input
                            type="checkbox"
                            checked={user.selected}
                            className="ml-3"
                            id="rowcheck{user.id}"
                            onChange={(e) => onItemCheck(e, user)}
                          />
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                          <img
                            className="h-10 w-10"
                            src={user.avatar}
                            alt="profile pix"
                          />
                          <div className="ml-2">
                            <p className="text-sm text-gray-400 mb-1">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-200 ">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                          {user.type}
                        </td>
                        <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                          {user.location}
                        </td>
                        <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                          {user.status === "active" ? (
                            <img src={greenIndicator} alt="" />
                          ) : (
                            <img src={grayIndicator} alt="" />
                          )}
                        </td>
                        <td className="px-2 py-4 relative cursor-pointer">
                          <img src={kebabIcon} alt="kebab icon" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="my-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersTab;
