/* eslint-disable import/order */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState } from "react";
import SideBarComponent from "../sidebar";
import dropdownIcon from "../../assets/images/dropdown.svg";
import gradientAvatar from "../../assets/images/gradient-avatar.svg";
import { Listbox, Transition } from "@headlessui/react";
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
    name: "Walkin Only",
  },
  {
    id: 2,
    name: "Master",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function AddStylist() {
  const [openDetails, setOpenDetails] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [selected, setSelected] = useState(channels);
  const [selectedType, setSelectedType] = useState(stylistTypes);

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        <div className="flex items-center">
          <div>Go Back</div>
          <div className="ml-24 w-4/6 flex justify-between items-center">
            <div className="text-22 text-gray-400 font-BeatriceSemiBold">
              Add stylist
            </div>
            <div className="flex">
              <Listbox value={selectedType} onChange={setSelectedType}>
                {({ open }) => (
                  <div className="relative mr-3">
                    <Listbox.Button className="relative w-full bg-white border rounded-full border-gray-250  shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {selectedType.name}
                        </span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <img className="ml-12" src={dropdownIcon} alt="" />
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
              <div className="border mr-3 border-gray-250 rounded-full px-3 h-10 flex justify-between items-center">
                Active
                <img className="ml-12" src={dropdownIcon} alt="" />
              </div>
              <button
                type="button"
                className="text-sm font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
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
              <div className="flex justify-between items-center w-full">
                <img src={gradientAvatar} alt="" />
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
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Type and select address..."
                  name="address"
                  label="address"
                  id="address"
                />
              </label>
              <div className="flex justify-between items-center">
                <label
                  className="inline-block text-black text-sm font-bold mt-5"
                  htmlFor="email"
                >
                  Email address
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    label="email"
                    id="email"
                  />
                </label>
                <label
                  className="inline-block text-black text-sm font-bold mt-5"
                  htmlFor="number"
                >
                  Phone number
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <div className="flex border border-gray-500">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      // eslint-disable-next-line react/jsx-no-useless-fragment
                      <>
                        <Listbox.Label className="block text-sm font-medium text-gray-700" />

                        <div className="mt-1 relative">
                          <Listbox.Button className="relative w-full bg-white border-0 cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                              <span className=" block truncate">
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
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {channels.map((channel) => (
                                <Listbox.Option
                                  key={channel.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-indigo-600"
                                        : "text-gray-900",
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
                                            "ml-3 block truncate"
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
                      </>
                    )}
                  </Listbox>
                  <input
                    type="text"
                    className="shadow-sm appearance-none mt-3 border-0 w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter link here"
                  />
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
