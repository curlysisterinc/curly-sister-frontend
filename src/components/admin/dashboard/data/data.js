import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { AuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { Loadersmall } from "components/loader-component/loader";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import purpleSettings from "../../../../assets/images/purple-settings.svg";
// import ManageServicesModal from "./manageServiceModal";
import ManageCertificationModal from "./manageCertificationModal";
import ManageTagModal from "./manageTagModal";
import wallet from "../../../../assets/images/wallet.svg";
import timer from "../../../../assets/images/timer.svg";
import ellipses from "../../../../assets/images/ellipses.svg";
import add from "../../../../assets/images/add.svg";
import EditServiceModal from "./editServiceModal";
import { certificationsList } from "../users/data";
import SideBarComponent from "../../../sidebar";
import admin from "../../../../api/admin";
import { useManageCertificationModal } from "../users/manageCertificationModal";
import ManageServicesModal from "../users/manageServicesModal";

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
  const [modalContent, setModalContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const certificationModal = useManageCertificationModal();

  // handle edit service modal close
  const handleCloseEditServiceModal = () => {
    setOpenEditServiceModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle Service modal open
  const handleOpenEditServiceModal = (service) => {
    setOpenEditServiceModal(true);
    setModalContent(service);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window !== "undefined" && window.document) {
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
  const handleOpenServiceModal = (e) => {
    e.stopPropagation();
    setOpenServiceModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  // handle Certification modal open
  const handleOpenCertificationModal = (e) => {
    e.stopPropagation();
    certificationModal.show();
  };

  // handle tag modal close
  const handleCloseTagModal = () => {
    setOpenTagModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle Tag modal open
  const handleOpenTagModal = (e) => {
    e.stopPropagation();
    setOpenTagModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["certifications"],
        queryFn: admin.GetCertification,
      },
      {
        queryKey: ["tags"],
        queryFn: admin.GetTags,
      },
      {
        queryKey: ["services"],
        queryFn: admin.GetServices,
      },
    ],
  });

  useEffect(() => {
    const ac = new AbortController();

    const isDataLoading = results.some((result) => result.isLoading);
    setIsLoading(isDataLoading);
    const isDataSuccess = results.every((result) => result.isSuccess);
    const isDataError = results.some((result) => result.error);
    if (isDataSuccess) {
      setGetCertificates(results[0].data.data.data);
      setGetTags(results[1].data.data.data);
      setGetServices(results[2].data.data.data);
      setIsSuccess(isDataSuccess);
    }
    if (isDataError) {
      setIsError(isDataError);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [results]);

  const refetchAll = useCallback(() => {
    results.forEach((result) => result.refetch());
  }, []);

  return (
    <div className="m-auto max-w-1031">
      {/* tabs */}
      {isError && <ErrorDisplayComponent refetch={refetchAll} />}
      {isLoading && <Loadersmall />}
      {isSuccess && (
        <div>
          {/* services and pricing */}
          <button type="button" className="mx-auto w-full mt-8 text-sm">
            <button
              type="button"
              onClick={() => setOpenService(!openService)}
              className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
            >
              Services
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleOpenServiceModal}
                  className="  text-purple-100 cursor-pointer flex items-center"
                >
                  <img className="mr-2" src={add} alt="" />
                  <p className="">Add new service</p>
                </button>

                <img
                  className={clsx(
                    openService && "transform rotate-180",
                    "ml-3 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
            </button>
            {openService && (
              <div className="mt-5 ">
                <div className="">
                  <div className="justify-center  pb-6 grid  grid-cols-1 md:grid-cols-2 gap-4">
                    {getServices &&
                      getServices.map((service, index) => {
                        return (
                          <button
                            type="button"
                            onClick={() => handleOpenEditServiceModal(service)}
                            //   className="bg-white cursor-pointer shadow-lg rounded-md"
                            // >
                            className="bg-white cursor-pointer shadow-s01 rounded-xl grid grid-cols-12  min-h-40 border border-gray-600 overflow-hidden"
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
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </button>
          {/* Certifications */}
          <div className="mx-auto w-full mt-8 text-sm">
            <button
              type="button"
              onClick={() => setOpenCertification(!openCertification)}
              className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
            >
              Certifications
              <div className="flex">
                <button
                  type="button"
                  onClick={handleOpenCertificationModal}
                  className="  text-purple-100 cursor-pointer flex items-center"
                >
                  <img className="mr-2" src={purpleSettings} alt="" />

                  <p className="">Manage Certifications</p>
                </button>
                <img
                  className={clsx(
                    openCertification && "transform rotate-180",
                    "ml-3 "
                  )}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
            </button>
            {openCertification && (
              <div className="mt-5">
                <div className="flex flex-wrap ">
                  {getCertificates &&
                    getCertificates.map((certification) => {
                      return (
                        <div className="rounded-full bg-purple-100 px-4 py-1 h-8 flex justify-center items-center mb-3 text-white text-sm mx-3">
                          {certification.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
          {/* Tags */}
          <div className="mx-auto w-full mt-8 text-sm">
            <button
              type="button"
              onClick={() => setOpenTag(!openTag)}
              className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
            >
              Tags
              <div className="flex">
                <button
                  type="button"
                  onClick={handleOpenTagModal}
                  className="  text-purple-100 cursor-pointer flex items-center"
                >
                  <img className="mr-2" src={purpleSettings} alt="" />

                  <p className="">Manage Tags</p>
                </button>
                <img
                  className={clsx(openTag && "transform rotate-180", "ml-3 ")}
                  src={dropdownIcon}
                  alt=""
                />
              </div>
            </button>
            {openTag && (
              <div className="mt-5">
                <div className="flex flex-wrap ">
                  {getTags &&
                    getTags.map((tag) => {
                      return (
                        <div className="rounded-full bg-purple-100 px-4 py-1 h-8 flex justify-center items-center mb-3 text-white text-sm mx-3">
                          {tag.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
          {openEditServiceModal && (
            <ManageServicesModal
              handleClose={handleCloseEditServiceModal}
              modalContent={modalContent}
            />
          )}
          {openServiceModal && (
            <ManageServicesModal handleClose={handleCloseServiceModal} />
          )}
          {certificationModal.renderModal({ certifications: getCertificates })}
          {openTagModal && (
            <ManageTagModal handleClose={handleCloseTagModal} tags={getTags} />
          )}
        </div>
      )}
    </div>
  );
}

export default DataTab;
