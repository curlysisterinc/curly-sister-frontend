/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line import/no-cycle

import React, { useState } from "react";
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

function DataTab() {
  const [openService, setOpenService] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [openCertificationModal, setOpenCertificationModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
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

  return (
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
              className={clsx(openService && "transform rotate-180", "ml-3 ")}
              src={dropdownIcon}
              alt=""
            />
          </div>
        </div>
        {openService && (
          <div className="mt-5">
            <div className="">
              <p className="">Services</p>
              <div
                onClick={handleOpenEditServiceModal}
                className="bg-white cursor-pointer shadow-lg rounded-md  grid grid-cols-12 mt-5 w-1/2 h-40 overflow-hidden"
              >
                <div className="p-5 col-span-8">
                  <h6 className="text-base font-BeatriceSemiBold mb-3">
                    Stylist training
                  </h6>
                  <p className="text-sm text-gray-300">
                    This training is for professional stylists to have a deep
                    dive in the art of curly hair.
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
                            <img src={wallet} alt="" />
                            $90
                          </div>
                        </div>
                      </div>
                      <div className="bg-white inline-block w-auto rounded-md  p-1">
                        <div className="flex items-center">
                          <img src={timer} alt="" />
                          60 mins
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="flex justify-between items-center">
              <p className="">Certifications</p>
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
            <div className="flex justify-between items-center">
              <p className="">Tags</p>
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
        <ManageCertificationModal handleClose={handleCloseCertificationModal} />
      )}{" "}
      {openTagModal && <ManageTagModal handleClose={handleCloseTagModal} />}
    </div>
  );
}

export default DataTab;
