/* eslint-disable import/order */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState } from "react";
import SideBarComponent from "../sidebar";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../constants";
import dropdownIcon from "../../assets/images/dropdown.svg";
import gradientAvatar from "../../assets/images/gradient-avatar.svg";
import trashIcon from "../../assets/images/trash.svg";
import backArrow from "../../assets/images/back-arrow.svg";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
// import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
const channels = [
  {
    id: 1,
    name: "Website",
  },
  {
    id: 2,
    name: "Instagram",
  },
  {
    id: 3,
    name: "Twitter",
  },
];
const stylistTypes = [
  {
    id: 1,
    name: "All stylists",
  },
  {
    id: 2,
    name: "Walk-in only",
  },
  {
    id: 3,
    name: "Curly sister stylist",
  },
  {
    id: 4,
    name: "Master stylist",
  },
];
const stylistStatus = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Inactive",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function AddStylist() {
  const [openDetails, setOpenDetails] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [selected, setSelected] = useState(channels[0]);
  const [selectedType, setSelectedType] = useState(stylistTypes[0]);
  const [status, setStatus] = useState(stylistStatus[0]);
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
  const navigate = useNavigate();

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(AuthRoutes.dashboard)}
          >
            <img className="mr-2" src={backArrow} alt="back arrow" />
            Go Back
          </div>
          <div className="ml-16 w-4/6 flex justify-between items-center">
            <div className="text-22 text-gray-400 font-BeatriceSemiBold">
              Add stylist
            </div>
            <div className="flex">
              {/* stylist type */}
              <Listbox value={selectedType} onChange={setSelectedType}>
                {({ open }) => (
                  <div className="relative mr-3">
                    <Listbox.Button className="relative w-full bg-white border rounded-full border-gray-250  shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-100 sm:text-sm">
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
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
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
              {/* stylist status */}
              <Listbox value={status} onChange={setStatus}>
                {({ open }) => (
                  <div className="relative mr-3">
                    <Listbox.Button className="relative w-full bg-white border rounded-full border-gray-250  shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-100 sm:text-sm">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {status.name}
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
                        {stylistStatus.map((type) => (
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
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
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
              <button
                type="button"
                className="text-sm font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <hr className="mb-5 mt-5 border-b border-gray-600 w-4/6 mx-auto" />
        {/* accordion */}
        {/* details */}
        <div className="mx-auto w-4/6 mt-8">
          <div
            onClick={() => setOpenDetails(!openDetails)}
            className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full"
          >
            Details
          </div>
          {openDetails && (
            <div className="mt-5">
              <div className="flex justify-between items-center w-full ">
                <img src={gradientAvatar} alt="" />
                <div className="relative h-20 flex justify-center items-center w-32 ">
                  <input
                    className="opacity-0 border-2 inline-block  w-full absolute right-0 top-1/2 transform -translate-y-1/2"
                    type="file"
                    placeholder="upload photo"
                  />
                  <p className="text-sm text-purple-100">Upload photo</p>
                </div>
              </div>
              <label
                className="block text-black text-sm font-bold mt-5"
                htmlFor="name"
              >
                Name
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Enter name here..."
                  name="name"
                  label="name"
                  id="name"
                />
              </label>
              <label
                className="block text-black text-sm font-bold mt-5"
                htmlFor="description"
              >
                Bio
                <textarea
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="textarea"
                  placeholder="Enter a bio for this stylist"
                  name="description"
                  label="description"
                  id="description"
                  rows="3"
                />
              </label>
            </div>
          )}
        </div>
        {/* location and contact */}
        <div className="mx-auto w-4/6 mt-8">
          <div
            onClick={() => setOpenLocation(!openLocation)}
            className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full"
          >
            Location and contact
          </div>
          {openLocation && (
            <div className="">
              <label
                className="block text-black text-sm font-bold mt-5"
                htmlFor="address"
              >
                Address
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Type and select address..."
                  name="address"
                  label="address"
                  id="address"
                />
              </label>
              <div className="grid grid-cols-2  justify-between gap-6 items-center">
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="email"
                >
                  Email address
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    label="email"
                    id="email"
                  />
                </label>
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="number"
                >
                  Phone number
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Enter phone number"
                    name="number"
                    label="number"
                    id="number"
                  />
                </label>
              </div>
              <div className="mt-5">
                Links
                {inputList.map((x, i) => {
                  return (
                    <div>
                      <div className="grid grid-cols-12 border border-gray-500 mt-5 h-46 rounded-lg">
                        <div className="col col-span-2  flex justify-center items-center border-r-2 border-gray-500 pr-3">
                          <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                              // eslint-disable-next-line react/jsx-no-useless-fragment

                              <div className="relative">
                                <Listbox.Button className="relative w-full bg-white border-0 cursor-default focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-100 sm:text-sm">
                                  <span className="flex items-center">
                                    <span className=" block text-gray-400">
                                      {selected.name}
                                    </span>
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-56 w-32 rounded-md py-1 text-base text-gray-400 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {channels.map((channel) => (
                                      <Listbox.Option
                                        key={channel.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "text-white bg-indigo-600"
                                              : "text-gray-400",
                                            "cursor-default select-none relative py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={channel}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "ml-3 block "
                                                )}
                                              >
                                                {channel.name}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
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
                        </div>
                        <input
                          type="text"
                          className={clsx(
                            inputList.length !== 1 && "border-r",
                            "col col-span-9  border-gray-600 pl-2 appearance-none border-0 w-full text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                          )}
                          placeholder="Enter link here"
                          value={x.firstName}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        {inputList.length !== 1 && (
                          <div
                            onClick={handleRemoveClick}
                            className=" col col-span-1  cursor-pointer flex items-center justify-center"
                          >
                            <img
                              className=""
                              src={trashIcon}
                              alt="trash icon"
                            />
                          </div>
                        )}
                      </div>

                      {inputList.length - 1 === i && (
                        <div
                          onClick={handleAddClick}
                          className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer"
                        >
                          Add more links
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* add new input */}
              </div>
            </div>
          )}
        </div>
        {/* certification and tag */}
        <div className="mx-auto w-4/6 mt-8">
          <div
            onClick={() => setOpenLocation(!openLocation)}
            className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full"
          >
            Certification and tags
          </div>
          {openLocation && (
            <div className="">
              <label
                className="block text-black text-sm font-bold mt-5"
                htmlFor="address"
              >
                Address
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Type and select address..."
                  name="address"
                  label="address"
                  id="address"
                />
              </label>
              <div className="grid grid-cols-2  justify-between gap-6 items-center">
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="email"
                >
                  Email address
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    label="email"
                    id="email"
                  />
                </label>
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="number"
                >
                  Phone number
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Enter phone number"
                    name="number"
                    label="number"
                    id="number"
                  />
                </label>
              </div>
              <div className="mt-5">
                Links
                <div className="grid grid-cols-12 border border-gray-500 mt-5 h-46 rounded-lg">
                  <div className="col col-span-2  flex justify-center items-center border-r-2 border-gray-500 pr-3">
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        // eslint-disable-next-line react/jsx-no-useless-fragment

                        <div className="relative">
                          <Listbox.Button className="relative w-full bg-white border-0 cursor-default focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-100 sm:text-sm">
                            <span className="flex items-center">
                              <span className=" block text-gray-400">
                                {selected.name}
                              </span>
                            </span>
                            <span className=" absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              {/* <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            /> */}
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-56 w-32 rounded-md py-1 text-base text-gray-400 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {channels.map((channel) => (
                                <Listbox.Option
                                  key={channel.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-indigo-600"
                                        : "text-gray-400",
                                      "cursor-default select-none relative py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={channel}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "ml-3 block "
                                          )}
                                        >
                                          {channel.name}
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-indigo-600",
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
                  </div>
                  <input
                    type="text"
                    className="col col-span-8 pl-2 appearance-none border-0 w-full text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    placeholder="Enter link here"
                  />
                </div>
                {/* add new input */}
                <div className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer">
                  Add more links
                </div>
              </div>
            </div>
          )}
        </div>
        {/* services and pricing */}
        <div className="mx-auto w-4/6 mt-8">
          <div
            onClick={() => setOpenLocation(!openLocation)}
            className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full"
          >
            Services and pricing
          </div>
          {openLocation && (
            <div className="">
              <label
                className="block text-black text-sm font-bold mt-5"
                htmlFor="address"
              >
                Address
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Type and select address..."
                  name="address"
                  label="address"
                  id="address"
                />
              </label>
              <div className="grid grid-cols-2  justify-between gap-6 items-center">
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="email"
                >
                  Email address
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    label="email"
                    id="email"
                  />
                </label>
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="number"
                >
                  Phone number
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Enter phone number"
                    name="number"
                    label="number"
                    id="number"
                  />
                </label>
              </div>
              <div className="mt-5">
                Links
                <div className="grid grid-cols-12 border border-gray-500 mt-5 h-46 rounded-lg">
                  <div className="col col-span-2  flex justify-center items-center border-r-2 border-gray-500 pr-3">
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        // eslint-disable-next-line react/jsx-no-useless-fragment

                        <div className="relative">
                          <Listbox.Button className="relative w-full bg-white border-0 cursor-default focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-100 sm:text-sm">
                            <span className="flex items-center">
                              <span className=" block text-gray-400">
                                {selected.name}
                              </span>
                            </span>
                            <span className=" absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              {/* <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            /> */}
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-56 w-32 rounded-md py-1 text-base text-gray-400 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {channels.map((channel) => (
                                <Listbox.Option
                                  key={channel.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-indigo-600"
                                        : "text-gray-400",
                                      "cursor-default select-none relative py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={channel}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "ml-3 block "
                                          )}
                                        >
                                          {channel.name}
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-indigo-600",
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
                  </div>
                  <input
                    type="text"
                    className="col col-span-8 pl-2 appearance-none border-0 w-full text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    placeholder="Enter link here"
                  />
                </div>
                {/* add new input */}
                <div className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer">
                  Add more links
                </div>
              </div>
            </div>
          )}
        </div>
        {/* availability */}
        <div className="mx-auto w-4/6 mt-8">
          <div
            onClick={() => setOpenLocation(!openLocation)}
            className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full"
          >
            Availability
          </div>
          {openLocation && (
            <div className="">
              <label
                className="block text-black text-sm font-bold mt-5"
                htmlFor="address"
              >
                Address
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Type and select address..."
                  name="address"
                  label="address"
                  id="address"
                />
              </label>
              <div className="grid grid-cols-2  justify-between gap-6 items-center">
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="email"
                >
                  Email address
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    label="email"
                    id="email"
                  />
                </label>
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="number"
                >
                  Phone number
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Enter phone number"
                    name="number"
                    label="number"
                    id="number"
                  />
                </label>
              </div>
              <div className="mt-5">
                Links
                <div className="grid grid-cols-12 border border-gray-500 mt-5 h-46 rounded-lg">
                  <div className="col col-span-2  flex justify-center items-center border-r-2 border-gray-500 pr-3">
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        // eslint-disable-next-line react/jsx-no-useless-fragment

                        <div className="relative">
                          <Listbox.Button className="relative w-full bg-white border-0 cursor-default focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-100 sm:text-sm">
                            <span className="flex items-center">
                              <span className=" block text-gray-400">
                                {selected.name}
                              </span>
                            </span>
                            <span className=" absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              {/* <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            /> */}
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-56 w-32 rounded-md py-1 text-base text-gray-400 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {channels.map((channel) => (
                                <Listbox.Option
                                  key={channel.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-indigo-600"
                                        : "text-gray-400",
                                      "cursor-default select-none relative py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={channel}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "ml-3 block "
                                          )}
                                        >
                                          {channel.name}
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-indigo-600",
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
                  </div>
                  <input
                    type="text"
                    className="col col-span-8 pl-2 appearance-none border-0 w-full text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    placeholder="Enter link here"
                  />
                </div>
                {/* add new input */}
                <div className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer">
                  Add more links
                </div>
              </div>
            </div>
          )}
        </div>
        {/* gallery */}
        <div className="mx-auto w-4/6 mt-8">
          <div
            onClick={() => setOpenLocation(!openLocation)}
            className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full"
          >
            Gallery
          </div>
          {openLocation && (
            <div className="">
              <label
                className="block text-black text-sm font-bold mt-5"
                htmlFor="address"
              >
                Address
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Type and select address..."
                  name="address"
                  label="address"
                  id="address"
                />
              </label>
              <div className="grid grid-cols-2  justify-between gap-6 items-center">
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="email"
                >
                  Email address
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    label="email"
                    id="email"
                  />
                </label>
                <label
                  className="inline-block text-black text-sm font-bold mt-5 col"
                  htmlFor="number"
                >
                  Phone number
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Enter phone number"
                    name="number"
                    label="number"
                    id="number"
                  />
                </label>
              </div>
              <div className="mt-5">
                Links
                <div className="grid grid-cols-12 border border-gray-500 mt-5 h-46 rounded-lg">
                  <div className="col col-span-2  flex justify-center items-center border-r-2 border-gray-500 pr-3">
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        // eslint-disable-next-line react/jsx-no-useless-fragment

                        <div className="relative">
                          <Listbox.Button className="relative w-full bg-white border-0 cursor-default focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-100 sm:text-sm">
                            <span className="flex items-center">
                              <span className=" block text-gray-400">
                                {selected.name}
                              </span>
                            </span>
                            <span className=" absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              {/* <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            /> */}
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-56 w-32 rounded-md py-1 text-base text-gray-400 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {channels.map((channel) => (
                                <Listbox.Option
                                  key={channel.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-indigo-600"
                                        : "text-gray-400",
                                      "cursor-default select-none relative py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={channel}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "ml-3 block "
                                          )}
                                        >
                                          {channel.name}
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-indigo-600",
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
                  </div>
                  <input
                    type="text"
                    className="col col-span-8 pl-2 appearance-none border-0 w-full text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    placeholder="Enter link here"
                  />
                </div>
                {/* add new input */}
                <div className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer">
                  Add more links
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddStylist;
