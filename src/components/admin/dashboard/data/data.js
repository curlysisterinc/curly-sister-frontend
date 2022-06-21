/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line import/no-cycle

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import purpleSettings from "../../../../assets/images/purple-settings.svg";
import ManageServicesModal from "./manageServiceModal";
import ManageCertificationModal from "./manageCertificationModal";
import ManageTagModal from "./manageTagModal";
import wallet from "../../../../assets/images/wallet.svg";
import timer from "../../../../assets/images/timer.svg";
import ellipses from "../../../../assets/images/ellipses.svg";
import add from "../../../../assets/images/add.svg";
import EditServiceModal from "./editServiceModal";
import { certificationsList } from "../users/data";
import SideBarComponent from "../../../sidebar/sidebar";
import { AuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";
import admin from "../../../../api/admin";

function DataTab({ active }) {
  const navigate = useNavigate();

  const [openService, setOpenService] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [openCertificationModal, setOpenCertificationModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [getCertificates, setGetCertificates] = useState([]);
  const [getTags, setGetTags] = useState([]);
  const [getServices, setGetServices] = useState([]);
  // handle edit service modal close
  const handleCloseEditServiceModal = () => {
    setOpenEditServiceModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle Service modal open
  const handleOpenEditServiceModal = () => {
    setOpenEditServiceModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  // handle service modal close
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

  // handle certification modal close
  const handleCloseCertificationModal = () => {
    setOpenCertificationModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle Certification modal open
  const handleOpenCertificationModal = () => {
    setOpenCertificationModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  // handle tag modal close
  const handleCloseTagModal = () => {
    setOpenTagModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle Tag modal open
  const handleOpenTagModal = () => {
    setOpenTagModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
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
        setGetServices(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        {/* tabs */}
        <div className="flex justify-center items-center w-1/2 mx-auto mb-6">
          <div
            onClick={() => navigate(AuthRoutes.dashboard)}
            className={
              active === "overview"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer "
            }
          >
            Overview
          </div>
          <div
            onClick={() => navigate(AuthRoutes.users)}
            className={
              active === "users"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer"
            }
          >
            Users
          </div>{" "}
          <div
            onClick={() => navigate(AuthRoutes.content)}
            className={
              active === "content"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer"
            }
          >
            Content
          </div>
          <div
            onClick={() => navigate(AuthRoutes.data)}
            className="text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
          >
            Data
          </div>
        </div>
        <div>
          {/* services and pricing */}
          <div className="mx-auto w-full mt-8 text-sm">
            <div
              onClick={() => setOpenService(!openService)}
              className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
            >
              Services
              <div className="flex items-center">
                <div
                  onClick={handleOpenServiceModal}
                  className="  text-purple-100 cursor-pointer flex items-center"
                >
                  <img className="mr-2" src={add} alt="" />
                  <p className="">Add new service</p>
                </div>

                <img
                  className={clsx(
                    openService && "transform rotate-180",
                    "ml-3 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
            </div>
            {openService && (
              <div className="mt-5 ">
                <div className="">
                  <div className="flex justify-center space-x-8 py-6">
                    {getServices &&
                      getServices.map((service, index) => {
                        return (
                          <div
                            onClick={handleOpenEditServiceModal}
                            className="bg-white cursor-pointer shadow-lg rounded-md  grid grid-cols-12 mt-5 w-5/12 h-40 overflow-hidden"
                          >
                            <div className="p-5 col-span-8">
                              <h6 className="text-base font-BeatriceSemiBold mb-3">
                                {service.name}
                              </h6>
                              <p className="text-sm text-gray-300">
                                {service.description}
                              </p>
                            </div>
                            <div className="bg-service-image col-span-4 bg-cover bg-no-repeat  h-full w-full flex justify-end p-2 text-right">
                              <div className="flex flex-col h-full justify-between items-end">
                                <div className="cursor-pointer bg-gray-400 rounded-full h-8 w-8 text-white flex justify-center items-center">
                                  <img src={ellipses} alt="" />
                                </div>
                                <div className=" ">
                                  <div className="mb-3">
                                    <div className="bg-white inline-block w-auto rounded-md  p-1">
                                      <div className="flex items-center">
                                        <img src={wallet} alt="" />$
                                        {service.default_price}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-white inline-block w-auto rounded-md  p-1">
                                    <div className="flex items-center">
                                      <img src={timer} alt="" />
                                      {service.duration} mins
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Certifications */}
          <div className="mx-auto w-full mt-8 text-sm">
            <div
              onClick={() => setOpenCertification(!openCertification)}
              className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
            >
              Certifications
              <div className="flex">
                <div
                  onClick={handleOpenCertificationModal}
                  className="  text-purple-100 cursor-pointer flex items-center"
                >
                  <img className="mr-2" src={purpleSettings} alt="" />

                  <p className="">Manage Certifications</p>
                </div>
                <img
                  className={clsx(
                    openCertification && "transform rotate-180",
                    "ml-3 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
            </div>
            {openCertification && (
              <div className="mt-5">
                <div className="py-6">
                  <div className="flex flex-wrap ">
                    {getCertificates &&
                      getCertificates.map((certification) => {
                        return (
                          <div className="rounded-full bg-purple-100 px-4 py-1 h-8 flex justify-center items-center mb-6 text-white text-sm mx-3">
                            {certification.name}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Tags */}
          <div className="mx-auto w-full mt-8 text-sm">
            <div
              onClick={() => setOpenTag(!openTag)}
              className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
            >
              Tags
              <div className="flex">
                <div
                  onClick={handleOpenTagModal}
                  className="  text-purple-100 cursor-pointer flex items-center"
                >
                  <img className="mr-2" src={purpleSettings} alt="" />

                  <p className="">Manage Tags</p>
                </div>
                <img
                  className={clsx(openTag && "transform rotate-180", "ml-3 ")}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
            </div>
            {openTag && (
              <div className="mt-5">
                <div className="">
                  <div className="flex">
                    {getTags &&
                      getTags.map((tag) => {
                        return (
                          <div className="rounded-full bg-purple-100 px-3 py-1 h-8 flex justify-center items-center text-white text-sm mx-3">
                            {tag.name}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
          {openEditServiceModal && (
            <EditServiceModal handleClose={handleCloseEditServiceModal} />
          )}
          {openServiceModal && (
            <ManageServicesModal handleClose={handleCloseServiceModal} />
          )}
          {openCertificationModal && (
            <ManageCertificationModal
              handleClose={handleCloseCertificationModal}
            />
          )}{" "}
          {openTagModal && <ManageTagModal handleClose={handleCloseTagModal} />}
        </div>
      </div>
    </div>
  );
}

export default DataTab;
