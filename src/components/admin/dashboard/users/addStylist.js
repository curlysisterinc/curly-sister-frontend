/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
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
import clsx from "clsx";
import {
  stylistTypes,
  stylistStatus,
  channels,
  phoneNumberCountries,
  getService,
  certificationsList,
} from "./data";
import ManageCertificationModal from "./manageCertificationModal";
import ManageTagModal from "./manageTagModal";
import ManageServicesModal from "./manageServicesModal";
import SelectPhoneDropdown from "./selectPhoneDropdown";
import AvailabilityTab from "./availability";
import GalleryTab from "./gallery";
import cancel from "../../../../assets/images/cancel.svg";
import MultiselectComponent from "./multiSelectComponent";
import admin from "../../../../api/admin";
import ExtraLinks from "./extraLinks";

function AddStylist() {
  const [openDetails, setOpenDetails] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);
  const [openCertificationModal, setOpenCertificationModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [inputList, setInputList] = useState([
    { website: "", facebook: "", instagram: "" },
  ]);
  const navigate = useNavigate();
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [services, setServices] = useState([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [locationAndContact, setLocationAndContact] = useState({
    address: "",
    email: "",
    phoneNumber: "",
    phoneCode: "US +1",
  });
  const [getCertificates, setGetCertificates] = useState([]);
  const [getTags, setGetTags] = useState([]);
  const [stylistValues, setStylistValues] = useState({
    stylist_name: "",
    email: "",
    business_name: "",
    address: "",
    certification: "",
    city: "",
    services: [""],
    certifications: [""],
    tags: [""],
    country: "",
    phone_no: "",
    facebook: "",
    instagram: "",
    latitude: "",
    longitude: "",
    state: "",
    website: "",
    zipcode: "",
    photo: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const template = { id: Math.random() };
  const [count, setCount] = React.useState([template]);
  const handleSelectChange = (update) => {
    setStylistValues((prev) => ({ ...prev, [update.name]: update.value }));
  };
  const add = () => {
    setCount((prev) => [...prev, template]);
  };

  const deleteR = (id, selected) => {
    setCount((prev) => prev.filter((item) => item.id !== id));
    handleSelectChange({ name: selected, value: "" });
  };

  // location and contact change
  const handleDropdownChange = (e) => {
    setLocationAndContact({
      ...locationAndContact,
      [e.target.name]: e.target.value,
    });
    console.log(phoneNumberCountries);
  };

  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetCertification()
      .then((response) => {
        console.log(response.data, "certification");
        setGetCertificates(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetTags()
      .then((response) => {
        console.log(response.data, "tags");
        setGetTags(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);
  useEffect(() => {
    const ac = new AbortController();
    admin
      .GetServices()
      .then((response) => {
        console.log(response.data, "services");
        setServices(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  const handleChange = (e) => {
    setStylistValues({ ...stylistValues, [e.target.name]: e.target.value });
  };

  // handle file change
  const handleFileChange = (e) => {
    setCoverPhoto(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
    // const file = e.target.files[0];
    // setStylistValues((stylistValues.photo = file));
    console.log(URL.createObjectURL(e.target.files[0]), "the actual file");
    // console.log(stylistValues.photo, "photo");
    setIsFileSelected(true);
  };

  const handlePhotoSubmission = () => {
    const formData = new FormData();
    formData.append("File", selectedFile);
    admin
      .UploadPhoto(formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
    setInputList([...inputList, { website: "", instagram: "", facebook: "" }]);
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
    // setServices(getService);
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

  const handleCreateStylist = () => {
    admin.CreateStylist(stylistValues).then((response) => {
      console.log(response);
      console.log(stylistValues);
      setStylistValues("");
    });
  };

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        <div className="flex items-start ">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(-1)}
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
                <select className="mr-3 bg-white border rounded-full border-gray-250  shadow-sm">
                  <option>Master stylist</option>
                  <option>Stylist</option>
                  <option>Super Admin</option>
                </select>

                <select className="mr-3 bg-white border rounded-full border-gray-250  shadow-sm">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <button
                  type="button"
                  onClick={handleCreateStylist}
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
                    {isFileSelected ? (
                      <div>
                        <img
                          className="w-20 h-20 rounded-full object-cover"
                          src={coverPhoto}
                          alt=""
                        />
                        <button type="button" onClick={handlePhotoSubmission}>
                          upload file
                        </button>
                      </div>
                    ) : (
                      <img src={gradientAvatar} alt="" />
                    )}

                    <div className="relative h-20 flex justify-center items-center w-32 ">
                      <input
                        className="cursor-pointer opacity-0 border-2 inline-block  w-full absolute right-0 top-1/2 transform -translate-y-1/2"
                        type="file"
                        name="file"
                        placeholder="upload photo"
                        onChange={handleFileChange}
                      />

                      <p className="text-sm text-purple-100">Upload photo</p>
                    </div>
                  </div>
                  <label
                    className="block text-black text-sm font-bold mt-5"
                    htmlFor="stylist_name"
                  >
                    Name
                    <input
                      className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Enter name here..."
                      name="stylist_name"
                      id="stylist_name"
                      value={stylistValues.stylist_name}
                      onChange={handleChange}
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
                      value={stylistValues.description}
                      rows="3"
                      onChange={handleChange}
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
                      value={stylistValues.address}
                      onChange={handleChange}
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
                        value={stylistValues.email}
                        onChange={handleChange}
                      />
                    </label>
                    <label
                      className="inline-block text-black text-sm font-bold mt-5 col"
                      htmlFor="phone_no"
                    >
                      Phone Number
                      <div className="relative flex grid-cols-12 ">
                        <input
                          className="shadow-sm col-span-8 appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="number"
                          value={stylistValues.phone_no}
                          placeholder="Enter phone number"
                          name="phone_no"
                          id="phone_no"
                          onChange={handleChange}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="mt-5">
                    Links
                    <div>
                      <div>
                        {count.map((val, i) => (
                          <>
                            <ExtraLinks
                              key={val.id}
                              onChange={handleSelectChange}
                              globalInput={stylistValues}
                              val={val}
                              onDelete={deleteR}
                              count={count}
                            />
                            {count.length - 1 === i && count.length < 3 && (
                              <div
                                onClick={add}
                                className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer"
                              >
                                Add more links
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
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
                  <div className="mt-5">
                    <MultiselectComponent
                      data={getCertificates}
                      placeholder="Type to search and select certifications"
                    />
                  </div>

                  <hr className="border border-gray-600 w-full mt-8" />
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

                    <div className="mt-5">
                      <MultiselectComponent
                        data={getTags}
                        placeholder="Type to search and select tags"
                      />
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
                  {services.map((service, index) => {
                    return (
                      <>
                        <div className="border border-gray-800 rounded grid grid-cols-12 h-12 mt-5">
                          <div className=" col-span-5 flex  items-center border-r border-gray-800 pl-3">
                            <div className="bg-purple-100 rounded-full text-white text-sm px-3 py-1 w-auto inline-block">
                              {service.name}
                            </div>
                          </div>
                          <div className="col-span-3 flex justify-between items-center border-r border-gray-800 px-3">
                            <p>{service.default_price}</p>
                            <p>$USD</p>
                          </div>
                          <div className="col-span-3 flex justify-between items-center border-r border-gray-800 px-3">
                            <p>{service.duration}</p>
                            <p>mins</p>
                          </div>
                          {/* {services.length > 1 && (
                            <div className="col-span-1 flex justify-between items-center px-6">
                              <img
                                onClick={handleRemoveServiceClick}
                                className="cursor-pointer"
                                src={cancel}
                                alt=""
                              />
                            </div>
                          )} */}
                        </div>
                        {/* {services.length - 1 === index &&
                          serviceList.length < 4 && (
                            <div
                              onClick={handleAddServiceClick}
                              className="text-purple-100 text-sm mt-4 cursor-pointer"
                            >
                              Select another service
                            </div>
                          )} */}
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
