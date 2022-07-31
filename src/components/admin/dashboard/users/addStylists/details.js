/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import admin from "../../../../../api/admin";
import gradientAvatar from "../../../../../assets/images/gradient-avatar.svg";
// import { Loadersmall } from "../../../../loader";
import OrangeBtn from "../../../../customButton/orangeBtn";
// import { PersistUserContext } from "./addStylist";

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
  const [imgUpload, setImgUpload] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    if (state && stylistValues.photo !== "") {
      setCoverPhoto(stylistValues.photo);
    }
  }, [stylistValues.photo]);

  // useEffect(() => {
  // if (stylist_name) {
  //   const vals = {
  //     stylist_name,
  //     license_number,
  //     license_board,
  //     description,
  //     photo,
  //   };
  //   const values = Object.values(vals);

  //   Object.keys(vals).forEach((ele, index) => {
  //     if (ele !== "photo") {
  //       setStylistValues((prev) => ({ ...prev, [ele]: values[index] }));
  //     }
  //     if (
  //       ele === "photo" &&
  //       values[index] !== "" &&
  //       values[index] !== undefined &&
  //       values[index] !== null
  //     ) {
  //       setStylistValues((prev) => ({ ...prev, [ele]: values[index] }));
  //     }
  //   });

  //   if (values.includes("") === false) {
  //     setActiveTab((prev) => ({ ...prev, locationTab: true }));
  //     setOpenTab((prev) => ({ ...prev, locationTab: true }));
  //   }
  //   if (values.includes("") === true) {
  //     setActiveTab((prev) => ({ ...prev, detailsTab: true }));
  //     setOpenTab((prev) => ({ ...prev, detailsTab: true }));
  //   }
  // }
  // }, [stylist_name]);

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

  const disableInput = () => {
    if (buttonAction === "Edit") {
      return true;
    }
    return false;
  };

  // handle file change
  const handleFileChange = (e) => {
    const [addimage] = e.target.files;

    if (addimage) {
      setImgUpload(true);
      // console.log(addimage, "targeted file");
      const formData = new FormData();
      formData.append("file", addimage);
      admin
        .UploadPhoto(formData)
        .then((response) => {
          setStylistValues({ ...stylistValues, photo: response.data.file });
          setCoverPhoto(URL.createObjectURL(addimage));
          setImgUpload(false);
        })
        .catch((error) => {
          // console.log(error.message);
          setImgUpload(false);
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
      <div className="flex justify-between items-center w-full ">
        <div className="relative w-20 h-20 rounded-full">
          <img
            className=" absolute inset-0 w-20 h-20 object-cover rounded-full "
            src={coverPhoto.length > 0 ? coverPhoto : gradientAvatar}
            alt="user profile"
          />
          {imgUpload && (
            <div
              style={{ transform: "translate(-50%,-50%)" }}
              className="absolute top-1/2 left-1/2"
            >
              <div
                style={{
                  borderTopColor: "transparent",
                }}
                className="  w-10 h-10 border-4 border-purple-100 border-solid rounded-full animate-spin"
              />
            </div>
          )}
        </div>

        <label
          htmlFor="profileimg"
          className="relative h-20 cursor-pointer inline-flex justify-center items-center w-32"
        >
          <input
            disabled={disableInput()}
            className=" hidden border-2  w-full absolute right-0 top-1/2 transform -translate-y-1/2"
            type="file"
            name="file"
            id="profileimg"
            placeholder="upload photo"
            onChange={handleFileChange}
          />
          <span className="text-sm inline-block text-purple-100 ">
            Upload photo
          </span>
        </label>
        {/* </div> */}
      </div>
      <label
        className="block text-black text-sm font-bold mt-5"
        htmlFor="stylist_name"
      >
        Name
        <input
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          disabled={disableInput()}
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
          disabled={disableInput()}
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
            disabled={disableInput()}
            placeholder="Licensing board"
            name="license_board"
            id="license_board"
            value={stylistValues.license_board}
            onChange={handleChange}
          />

          <input
            className="shadow-sm appearance-none  border-0  col-1 py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none "
            type="text"
            disabled={disableInput()}
            placeholder="Licensing number"
            name="license_number"
            id="license_number"
            value={stylistValues.license_number}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <OrangeBtn
          buttonAction={buttonAction}
          disabled={disableBtn()}
          onClick={clickHandler}
          isloading={isloading}
        />
      </div>
    </div>
  );
}

export default DetailsTab;
