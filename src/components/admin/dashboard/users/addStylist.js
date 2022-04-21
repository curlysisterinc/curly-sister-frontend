/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState, useEffect } from "react";
import SideBarComponent from "../../../sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../../../constants";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import gradientAvatar from "../../../../assets/images/gradient-avatar.svg";
import trashIcon from "../../../../assets/images/trash.svg";
import backArrow from "../../../../assets/images/back-arrow.svg";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  stylistTypes,
  stylistStatus,
  channels,
  phoneNumberCountries,
  getService,
} from "./data";
import ManageCertificationModal from "./manageCertificationModal";
import ManageTagModal from "./manageTagModal";
import ManageServicesModal from "./manageServicesModal";
import SelectPhoneDropdown from "./selectPhoneDropdown";
import AvailabilityTab from "./availability";
import GalleryTab from "./gallery";
import cancel from "../../../../assets/images/cancel.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function AddStylist() {
  const [openDetails, setOpenDetails] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);
  const [selected, setSelected] = useState(channels[0]);
  const [selectedType, setSelectedType] = useState(stylistTypes[0]);
  const [status, setStatus] = useState(stylistStatus[0]);
  const [openCertificationModal, setOpenCertificationModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
  const navigate = useNavigate();
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [locationAndContact, setLocationAndContact] = useState({
    address: "",
    email: "",
    phoneNumber: "",
    phoneCode: "US +1",
  });
  const { email, phoneNumber, address, phoneCode } = locationAndContact;
  // location and contact change
  const handleDropdownChange = (e) => {
    setLocationAndContact({
      ...locationAndContact,
      [e.target.name]: e.target.value,
    });
    console.log(phoneNumberCountries);
  };
  // handle file change
  const handleFileChange = (e) => {
    setCoverPhoto(URL.createObjectURL(e.target.files[0]));
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(phoneNumberCountries);
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

  // handle certification modal close
  const handleCloseCertificationModal = () => {
    setOpenCertificationModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle certification modal open
  const handleOpenCertificationModal = () => {
    setOpenCertificationModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  // handle certification modal close
  const handleCloseTagModal = () => {
    setOpenTagModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle certification modal open
  const handleOpenTagModal = () => {
    setOpenTagModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  // handle certification modal close
  const handleCloseServiceModal = () => {
    setOpenServiceModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle Service modal open
  const handleOpenServiceModal = () => {
    setOpenServiceModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  // handle certification modal change
  useEffect(() => {
    const ac = new AbortController();
    document.title = "CurlySisters • Add Stylists";
    if (openServiceModal) {
      document.body.style.overflow = "hidden";
    }
    setServices(getService);
    return function cleanup() {
      ac.abort();
    };
  }, []);
  // handle click event of the Add button
  const handleAddServiceClick = () => {
    setServiceList([
      ...serviceList,
      {
        service: "",
      },
    ]);
  };

  // handle click event of the Remove button
  const handleRemoveServiceClick = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        <div className="flex items-start ">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(AuthRoutes.dashboard)}
          >
            <img className="mr-2" src={backArrow} alt="back arrow" />
            Go Back
          </div>
          <form autoComplete="off" className="ml-28 w-4/6 ">
            <div className=" flex justify-between items-center">
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
                <button
                  type="button"
                  className="text-sm font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white"
                >
                  Save
                </button>
              </div>
            </div>

            <hr className="mb-5 mt-5 border-b border-gray-600  mx-auto" />
            {/* accordion */}
            {/* details */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenDetails(!openDetails)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Details
                <img
                  className={clsx(
                    openDetails && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openDetails && (
                <div className="mt-5">
                  <div className="flex justify-between items-center w-full ">
                    {coverPhoto === null && <img src={gradientAvatar} alt="" />}
                    {coverPhoto !== null && (
                      <img
                        className="w-20 h-20 rounded-full object-cover"
                        src={coverPhoto}
                        alt=""
                      />
                    )}
                    <div className="relative h-20 flex justify-center items-center w-32 ">
                      <input
                        className="cursor-pointer opacity-0 border-2 inline-block  w-full absolute right-0 top-1/2 transform -translate-y-1/2"
                        type="file"
                        placeholder="upload photo"
                        onChange={handleFileChange}
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
                      className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                      className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenLocation(!openLocation)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Location and contact
                <img
                  className={clsx(
                    openLocation && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openLocation && (
                <div className="">
                  <label
                    className="block text-black text-sm font-bold mt-5"
                    htmlFor="address"
                  >
                    Address
                    <input
                      className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Type and select address..."
                      name="address"
                      label="address"
                      id="address"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-6 items-center ">
                    <label
                      className="inline-block text-black text-sm font-bold mt-5 col"
                      htmlFor="email"
                    >
                      Email address
                      <input
                        className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Enter email address"
                        name="email"
                        label="email"
                        id="email"
                      />
                    </label>
                    <label
                      className="inline-block text-black text-sm font-bold mt-5 col"
                      htmlFor="email"
                    >
                      Phone Number
                      <div className="relative flex grid-cols-12 border">
                        <SelectPhoneDropdown
                          handleChange={handleDropdownChange}
                          value={phoneCode}
                          name="phoneCode"
                          placeholder="Code"
                          phoneNumberCountries={phoneNumberCountries}
                          clsName="col-span-4 "
                        />
                        <input
                          className="shadow-sm col-span-8 appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          value={phoneNumber}
                          placeholder="Enter phone number"
                          name="phoneNumber"
                          id="phoneNumber"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="mt-5">
                    Links
                    {inputList.map((x, i) => {
                      return (
                        <div>
                          <div className=" relative">
                            <label
                              className="block text-black text-sm font-bold"
                              htmlFor="link"
                            >
                              <div className="relative flex h-10 mt-5 border border-gray-800 focus-within:border-indigo-500 rounded-lg overflow-hidden">
                                <div className="border-r absolute border-gray-800 h-full top-0 inset-y-0 left-0 flex items-center">
                                  <select
                                    id="link"
                                    name="link"
                                    className="focus:ring-indigo-500 focus:border-indigo-500  h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-700 sm:text-sm rounded"
                                  >
                                    <option>Website</option>
                                    <option>Instagram</option>
                                    <option>Twitter</option>
                                    <option>Facebook</option>
                                  </select>
                                </div>
                                <input
                                  className="shadow-sm pl-36 placeholder-text-sm appearance-none border-0  w-full h-full px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  type="text"
                                  placeholder="Enter link here"
                                  value={x.firstName}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                                {inputList.length !== 1 && (
                                  <div
                                    onClick={handleRemoveClick}
                                    className="absolute right-0 border-l border-gray-800 px-2 h-full cursor-pointer flex items-center justify-center"
                                  >
                                    <img
                                      className=""
                                      src={trashIcon}
                                      alt="trash icon"
                                    />
                                  </div>
                                )}
                              </div>
                            </label>
                          </div>

                          {inputList.length - 1 === i && inputList.length < 4 && (
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
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenCertification(!openCertification)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Certification and tags
                <img
                  className={clsx(
                    openCertification && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openCertification && (
                <div className="mt-5 text-sm">
                  {/* certifications */}
                  <div className="flex justify-between items-center">
                    <p className="e">Certifications</p>
                    <div
                      onClick={handleOpenCertificationModal}
                      className="text-purple-100 cursor-pointer"
                    >
                      Manage Certifications
                    </div>
                  </div>

                  <div className="border border-gray-50 w-full p-3 mt-4 rounded-xl" />

                  <div
                    onClick={handleOpenCertificationModal}
                    className="text-purple-100 cursor-pointer mt-4"
                  >
                    select certification
                  </div>

                  <hr className="border border-gray-600 w-full mt-3" />
                  {/* tags */}
                  <div className="mt-6">
                    <div className=" flex justify-between items-center">
                      <p className="e">Tags</p>
                      <div
                        onClick={handleOpenTagModal}
                        className="text-purple-100 cursor-pointer"
                      >
                        Manage Tags
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Type to search and select certifications"
                      multiple
                      className="block border-gray-50 w-full p-3 mt-4 rounded-lg h-10 appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-300"
                    />

                    <div
                      onClick={handleOpenTagModal}
                      className="text-purple-100 cursor-pointer mt-4"
                    >
                      select tag
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* services and pricing */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenService(!openService)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Services and pricing
                <img
                  className={clsx(
                    openService && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openService && (
                <div className="mt-5">
                  <div className="flex justify-between items-center">
                    <p className="">Services</p>

                    <div
                      onClick={handleOpenServiceModal}
                      className="text-purple-100 cursor-pointer"
                    >
                      Add new service
                    </div>
                  </div>
                  {serviceList.map((service, index) => {
                    return (
                      <>
                        <div className="border border-gray-800 rounded grid grid-cols-12 h-12 mt-5">
                          <div className=" col-span-5 flex  items-center border-r border-gray-800 pl-3">
                            <div className="bg-purple-100 rounded-full text-white text-sm px-3 py-1 w-auto inline-block">
                              Consultation
                            </div>
                          </div>
                          <div className="col-span-3 flex justify-between items-center border-r border-gray-800 px-3">
                            <p>35</p>
                            <p>$USD</p>
                          </div>
                          <div className="col-span-3 flex justify-between items-center border-r border-gray-800 px-3">
                            <p>35</p>
                            <p>mins</p>
                          </div>
                          {serviceList.length > 1 && (
                            <div className="col-span-1 flex justify-between items-center px-6">
                              <img
                                onClick={handleRemoveServiceClick}
                                className="cursor-pointer"
                                src={cancel}
                                alt=""
                              />
                            </div>
                          )}
                        </div>
                        {serviceList.length - 1 === index &&
                          serviceList.length < 4 && (
                            <div
                              onClick={handleAddServiceClick}
                              className="text-purple-100 text-sm mt-4 cursor-pointer"
                            >
                              Select another service
                            </div>
                          )}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
            {/* availability */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenAvailability(!openAvailability)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Availability
                <img
                  className={clsx(
                    openDetails && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openAvailability && (
                <div className="">
                  <AvailabilityTab />
                </div>
              )}
            </div>
            {/* gallery */}
            <div className="mx-auto w-full mt-8">
              <div
                onClick={() => setOpenGallery(!openGallery)}
                className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
              >
                Gallery
                <img
                  className={clsx(
                    openDetails && "transform rotate-180",
                    "ml-12 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
              {openGallery && <GalleryTab />}
            </div>
          </form>
          {openCertificationModal && (
            <ManageCertificationModal
              handleClose={handleCloseCertificationModal}
            />
          )}
          {openTagModal && <ManageTagModal handleClose={handleCloseTagModal} />}
          {openServiceModal && (
            <ManageServicesModal handleClose={handleCloseServiceModal} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddStylist;
