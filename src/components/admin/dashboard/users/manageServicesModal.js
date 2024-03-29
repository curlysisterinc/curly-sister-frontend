/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { useEffect, useState } from "react";
import useCreateServices from "hooks/data/admin/useCreateServices";
import useUpdateService from "hooks/data/admin/useUpdateService";
import { Loadersmall } from "components/loader-component/loader";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import useUploadPhoto from "hooks/data/admin/useUploadPhoto";
import closeModalBtn from "../../../../assets/images/cancel.svg";
import uploadFile from "../../../../assets/images/upload-file.png";
import admin from "../../../../api/admin";

function ManageServicesModal({ handleClose, modalContent }) {
  const {
    data,
    isLoading: isServiceLoading,
    error,
    mutate: createServices,
  } = useCreateServices();

  const {
    data: updateServiceData,
    isLoading: updateServiceLoading,
    error: updateServiceError,
    mutate: updateService,
  } = useUpdateService();

  const {
    isLoading: isPhotoUploadLoading,
    data: photoUploadData,
    isError: photoUploadError,
    refetch: photoUploadRefetch,
    mutate: uploadPhoto,
  } = useUploadPhoto();
  const isEdit = !!modalContent;

  const [serviceList, setServiceList] = useState({
    name: "",
    description: "",
    default_price: "",
    who_is_this_for: "Others",
    duration: "",
  });
  const [coverPhoto, setCoverPhoto] = useState(null);

  useEffect(() => {
    if (modalContent) {
      setServiceList({ ...modalContent });
    }
  }, [modalContent]);

  // handle file change
  const handleFileChange = (e) => {
    setCoverPhoto(e.target.files[0]);
    // setCoverPhoto(URL.createObjectURL(e.target.files[0]));
  };

  // handle input change
  const handleChange = (e) => {
    setServiceList({ ...serviceList, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "Curly sisters • Create services";
  }, []);

  const handleSubmitService = (e) => {
    e.preventDefault();
    const serviceDuration =
      serviceList.durationTime === "hour"
        ? serviceList.duration * 60
        : serviceList.duration * 1;

    if (typeof coverPhoto === "string" || !coverPhoto) {
      return isEdit
        ? updateService({
            ...serviceList,
            duration: serviceDuration,
            serviceId: serviceList._id,
            photo: coverPhoto,
          })
        : createServices({
            ...serviceList,
            duration: serviceDuration,
            photo: coverPhoto,
          });
    }
    const formData = new FormData();
    formData.append("file", coverPhoto);
    return uploadPhoto(formData);
  };

  useEffect(() => {
    if (photoUploadData) {
      const serviceDuration =
        serviceList.durationTime === "hour"
          ? serviceList.duration * 60
          : serviceList.duration * 1;
      return isEdit
        ? updateService({
            ...serviceList,
            serviceId: serviceList._id,
            duration: serviceDuration,
            photo: photoUploadData.data.file,
          })
        : createServices({
            ...serviceList,
            duration: serviceDuration,
            photo: photoUploadData.data.file,
          });
    }
    return null;
  }, [photoUploadData]);

  const handleSubmitDisabled = () => {
    return Object.values(serviceList).some((item) => item === "");
  };

  useEffect(() => {
    const ac = new AbortController();
    if (data) {
      setServiceList({
        ...serviceList,
        name: "",
        description: "",
        default_price: "",
        who_is_this_for: "For everyone",
        duration: "",
      });
      handleClose();
    }
    return function cleanup() {
      ac.abort();
    };
  }, [data]);

  const isLoading =
    updateServiceLoading || isPhotoUploadLoading || isServiceLoading;

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 left-0 h-full overflow-y-auto z-200 bg-black-100 w-full flex  justify-end items-center"
    >
      <div
        className="flex  justify-end items-start h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className=" bg-white rounded-full p-2 fixed top-2  right-2 xs:left-auto xs:right-500"
          onClick={handleClose}
          role="button"
          tabIndex="0"
          onKeyPress={(e) =>
            runFunctionWhenSpaceOrEnterIsClicked(e, handleClose)
          }
        >
          <img src={closeModalBtn} alt="close button" />
        </div>
        <div className="bg-white min-h-screen p-5 pt-10 sm:p-10 w-full max-w-480 ">
          <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
            {isEdit ? "Edit service" : "Add a service"}
          </h4>
          <p className="text-gray-200 text-base mb-6">
            {isEdit
              ? "Edit created service"
              : "Create a new service for people to book"}
          </p>
          <form className="">
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="serviceName"
              >
                Name of service
                <input
                  className="shadow-sm appearance-none mt-3 placeholder-text-sm border border-gray-500 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  value={serviceList.name}
                  placeholder="Type a name here"
                  name="name"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold mt-5"
                htmlFor="description"
              >
                Description
                <textarea
                  className="text-sm text-sm shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="textarea"
                  placeholder="Enter a description for this service"
                  name="description"
                  label="description"
                  id="description"
                  rows="3"
                  value={serviceList.description}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-6 grid  md:grid-cols-2 gap-6">
              {/* default price */}
              <div className="col relative">
                <label
                  className="block text-black text-sm font-bold"
                  htmlFor="price"
                >
                  Default price
                  <div className="relative h-10 mt-3">
                    <input
                      className="shadow-sm placeholder-text-sm appearance-none border border-gray-800 rounded-lg w-full h-full px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Enter price"
                      name="default_price"
                      value={serviceList.default_price}
                      id="default_price"
                      onChange={handleChange}
                    />
                    <div className="absolute h-full top-0 inset-y-0 right-0 flex items-center">
                      <select
                        id="currency"
                        name="currency"
                        className="focus:ring-indigo-500 focus:border-indigo-500  h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-700 sm:text-sm rounded-md"
                        disabled
                      >
                        <option>$USD</option>
                        <option>$CAD</option>
                        <option>$EUR</option>
                      </select>
                    </div>
                  </div>
                </label>
              </div>
              {/* duration */}
              <div className="col relative">
                <label
                  className="block text-black text-sm font-bold"
                  htmlFor="time"
                >
                  Duration
                  <div className="relative h-10 mt-3">
                    <input
                      className="shadow-sm appearance-none border border-gray-800 rounded-lg w-full h-full px-3 text-gray-400 placeholder-gray-700 placeholder-text-sm leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Enter time"
                      name="duration"
                      id="duration"
                      value={serviceList.duration}
                      onChange={handleChange}
                    />
                    <div className="absolute h-full top-0 inset-y-0 right-0 flex items-center">
                      <select
                        id="duration"
                        name="durationTime"
                        onChange={handleChange}
                        value={serviceList.durationTime}
                        className="focus:ring-indigo-500 focus:border-indigo-500  h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-700 sm:text-sm rounded-md"
                      >
                        <option value="mins">mins</option>
                        <option value="hour">hour</option>
                      </select>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {/* who is this for */}
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="people"
              >
                Who is this for?
                <select
                  id="who_is_this_for"
                  name="who_is_this_for"
                  value={serviceList.who_is_this_for}
                  onChange={handleChange}
                  className="text-sm shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Everyone">Everyone</option>
                  <option value="Stylists">Stylists</option>
                </select>
              </label>
            </div>
            {/* cover photo */}
            <div className="mb-6">
              <p>Cover photo</p>
              <div className="mt-5">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="opacity-0 absolute h-16 w-120  border"
                />
                {coverPhoto === null ? (
                  <img src={uploadFile} className="h-16 w-120" alt="" />
                ) : (
                  <img
                    src={URL.createObjectURL(coverPhoto)}
                    className="h-16 w-120 object-cover"
                    alt="cover"
                  />
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmitService}
              disabled={handleSubmitDisabled() || isLoading}
              className="mt-6 w-full h-12 bg-orange-200 rounded-full text-white text-sm flex justify-center font-BeatriceSemiBold items-center disabled:opacity-40"
            >
              {isLoading && <Loadersmall />}
              {!isLoading && (isEdit ? "Save service" : "Create service")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageServicesModal;
