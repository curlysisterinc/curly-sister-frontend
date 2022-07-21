/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import admin from "../../../../../api/admin";
import gradientAvatar from "../../../../../assets/images/gradient-avatar.svg";
import { PersistUserContext } from "./addStylist";

function DetailsTab({
  ariaHidden,
  id,
  stylistValues,
  setStylistValues,
  handleUpdateStyistDetail,
  handleCreateStylist,
  isloading,
  buttonAction,
  setButtonAction,
}) {
  const [coverPhoto, setCoverPhoto] = useState("");
  const stylistId = localStorage.getItem("createdStylist");

  // active: true
  // availability: []
  // certifications: []
  // createdAt: "2022-07-17T13:02:10.920Z"
  // description: "tade"
  // gallery: []
  // license_board: "tafde"
  // license_number: "tade"
  // photo: ""
  // services: []
  // stylist_name: "tade"
  // tags: []
  const [
    { description, license_board, license_number, stylist_name, photo },
    fetchUserResponse,
    setActiveTab,
    setOpenTab,
  ] = useContext(PersistUserContext);

  // console.log(userResponse, stylistId, "stylistid");

  useEffect(() => {
    if (stylistValues.photo !== "") {
      setCoverPhoto(stylistValues.photo);
    }
    if (stylistId !== "" && stylistId !== null && stylistId !== undefined) {
      fetchUserResponse();
    }
  }, []);

  useEffect(() => {
    if (stylist_name) {
      const vals = {
        stylist_name,
        license_number,
        license_board,
        description,
        photo,
      };
      const values = Object.values(vals);

      Object.keys(vals).forEach((ele, index) => {
        if (ele !== "photo") {
          setStylistValues((prev) => ({ ...prev, [ele]: values[index] }));
        }
        if (
          ele === "photo" &&
          values[index] !== "" &&
          values[index] !== undefined &&
          values[index] !== null
        ) {
          setStylistValues((prev) => ({ ...prev, [ele]: values[index] }));
        }
      });

      if (values.includes("") === false) {
        setActiveTab((prev) => ({ ...prev, locationTab: true }));
        setOpenTab((prev) => ({ ...prev, locationTab: true }));
      }
      if (values.includes("") === true) {
        setActiveTab((prev) => ({ ...prev, detailsTab: true }));
        setOpenTab((prev) => ({ ...prev, detailsTab: true }));
      }
    }
  }, [stylist_name]);

  const disableBtn = () => {
    const isValid =
      stylistValues.stylist_name?.trim().length &&
      stylistValues.description?.trim().length &&
      stylistValues.license_board?.trim().length &&
      stylistValues.license_number?.trim().length;
    if (isValid || buttonAction === "Edit") {
      return false;
    }
    return true;
  };

  // handle file change
  const handleFileChange = (e) => {
    const [addimage] = e.target.files;

    if (addimage) {
      setCoverPhoto(URL.createObjectURL(addimage));
      console.log(addimage, "targeted file");
      const formData = new FormData();
      formData.append("file", addimage);
      admin
        .UploadPhoto(formData)
        .then((response) => {
          setStylistValues({ ...stylistValues, photo: response.data.file });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleChange = (e) => {
    setStylistValues({ ...stylistValues, [e.target.name]: e.target.value });
  };

  const clickHandler = () => {
    if (buttonAction === "Edit") {
      setButtonAction("Update");
    }
    if (buttonAction === "Save") {
      handleCreateStylist();
    }
    if (buttonAction === "Update") {
      handleUpdateStyistDetail();
    }
  };

  return (
    <div aria-hidden={ariaHidden} id={id} className="mt-5 relative">
      {isloading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-black-50">
          <div className="loader" />
        </div>
      )}
      <div className="flex justify-between items-center w-full ">
        {coverPhoto.length > 0 ? (
          <div>
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={coverPhoto}
              alt=""
            />
          </div>
        ) : (
          <img src={gradientAvatar} alt="" />
        )}

        <div className="relative h-20 flex justify-center items-center w-32 ">
          <input
            disabled={buttonAction === "Edit"}
            className="cursor-pointer opacity-0 border-2 inline-block  w-full absolute right-0 top-1/2 transform -translate-y-1/2"
            type="file"
            name="file"
            placeholder="upload photo"
            onChange={(e) => handleFileChange(e)}
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
          disabled={buttonAction === "Edit"}
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
          disabled={buttonAction === "Edit"}
          placeholder="Enter a bio for this stylist"
          name="description"
          label="description"
          id="description"
          value={stylistValues.description}
          rows="3"
          onChange={handleChange}
        />
      </label>
      <div className="mt-5">
        <p className="block text-black text-sm font-bold mt-5">License</p>

        <div className="mt-3 overflow-hidden grid grid-cols-2 divide-x border border-gray-800 rounded-lg">
          <input
            className="shadow-sm appearance-none  border-0  col-1 py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none "
            type="text"
            disabled={buttonAction === "Edit"}
            placeholder="Licensing board"
            name="license_board"
            id="license_board"
            value={stylistValues.license_board}
            onChange={handleChange}
          />

          <input
            className="shadow-sm appearance-none  border-0  col-1 py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none "
            type="text"
            disabled={buttonAction === "Edit"}
            placeholder="Licensing number"
            name="license_number"
            id="license_number"
            value={stylistValues.license_number}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={clickHandler}
          disabled={disableBtn()}
          className="text-sm disabled:opacity-50 font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5"
        >
          {buttonAction}
        </button>
      </div>
    </div>
  );
}

export default DetailsTab;
