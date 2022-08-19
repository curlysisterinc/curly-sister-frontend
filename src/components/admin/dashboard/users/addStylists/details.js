/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { AuthRoutes } from "constants";
import useCreateStylists from "hooks/data/admin/useCreateStylists";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import admin from "../../../../../api/admin";
import gradientAvatar from "../../../../../assets/images/gradient-avatar.svg";
import Avatar from "../../../../../assets/images/product-recommendation.png";
// import { Loadersmall } from "../../../../loader";
import OrangeBtn from "../../../../customButton/orangeBtn";
// import { PersistUserContext } from "./addStylist";

function DetailsTab({
  isOpen,
  isLoading,
  detailsValues,
  setDetailsValues,
  stylistData,
  mode,
  handleEditStylist,
  activeTab,
}) {
  const [coverPhoto, setCoverPhoto] = useState("");
  const [imgUpload, setImgUpload] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (stylistData) {
      setDetailsValues({ ...detailsValues, ...stylistData });
      setCoverPhoto(stylistData.photo);
    }
  }, [stylistData]);

  useEffect(() => {
    if (state && detailsValues.photo !== "") {
      setCoverPhoto(detailsValues.photo);
    }
  }, [detailsValues.photo]);

  const {
    isLoading: isDetailsLoading,
    data: detailsData,
    isError,
    mutate: createStylist,
  } = useCreateStylists();

  const handleCreateStylist = () => {
    createStylist(detailsValues);
  };

  useEffect(() => {
    if (detailsData) {
      // // setDetailActionBtn("Edit");
      // console.log("detailsData", detailsData);
      // localStorage.setItem("createdStylist", detailsData.data.stylist._id);
      // // setActiveTab((prev) => ({ ...prev, locationTab: true }));
      navigate(
        `/dashboard/users/edit-stylist/${detailsData.data.stylist._id}?tab=location`
      );
    }
  }, [detailsData]);

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
  //       setDetailsValues((prev) => ({ ...prev, [ele]: values[index] }));
  //     }
  //     if (
  //       ele === "photo" &&
  //       values[index] !== "" &&
  //       values[index] !== undefined &&
  //       values[index] !== null
  //     ) {
  //       setDetailsValues((prev) => ({ ...prev, [ele]: values[index] }));
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
      detailsValues.stylist_name?.trim()?.length &&
      detailsValues.description?.trim()?.length &&
      detailsValues.license_board?.trim()?.length &&
      detailsValues.license_number?.trim()?.length;
    if (isValid) {
      return false;
    }
    return true;
  };

  // const disableInput = () => {
  //   if (buttonAction === "Edit") {
  //     return true;
  //   }
  //   return false;
  // };

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
          setDetailsValues({ ...detailsValues, photo: response.data.file });
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
    setDetailsValues({ ...detailsValues, [e.target.name]: e.target.value });
  };

  const handleEditDetails = () => {
    const {
      stylist_name,
      description,
      license_number,
      license_board,
      photo,
      _id,
    } = detailsValues;

    let newValue = {
      stylist_name,
      description,
      license_number,
      license_board,
      photo,
      _id,
    };
    handleEditStylist(newValue)
  };

  // const clickHandler = () => {
  //   if (buttonAction === "Edit") {
  //     setButtonAction("Update");
  //   }
  //   if (buttonAction === "Save") {
  //     handleCreateStylist();
  //   }
  //   if (buttonAction === "Update") {
  //     handleUpdateStyistDetail();
  //   }
  // };

  return (
    <div aria-hidden={isOpen} className="mt-5 relative">
      <div className="flex justify-between items-center w-full ">
        <div className="relative w-20 h-20 rounded-full">
          <img
            className=" absolute inset-0 w-20 h-20 object-cover rounded-full "
            src={coverPhoto?.length > 0 ? coverPhoto : Avatar}
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
            disabled={isLoading}
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
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          disabled={isLoading}
          placeholder="Enter name here..."
          name="stylist_name"
          id="stylist_name"
          value={detailsValues.stylist_name}
          onChange={handleChange}
        />
      </label>
      <label
        className="block text-black text-sm font-bold mt-5"
        htmlFor="description"
      >
        Bio
        <textarea
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="textarea"
          disabled={isLoading}
          placeholder="Enter a bio for this stylist"
          name="description"
          label="description"
          id="description"
          value={detailsValues.description}
          rows="3"
          onChange={handleChange}
        />
      </label>
      <div className="mt-5">
        <p className="block text-black text-sm font-bold mt-5">License</p>

        <div className="mt-3 overflow-hidden grid grid-cols-2 divide-x border border-gray-800 rounded-lg">
          <input
            className="shadow-sm appearance-none  border-0  col-1 py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none "
            type="text"
            disabled={isLoading}
            placeholder="Licensing board"
            name="license_board"
            id="license_board"
            value={detailsValues.license_board}
            onChange={handleChange}
          />

          <input
            className="shadow-sm appearance-none  border-0  col-1 py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none "
            type="text"
            disabled={isLoading}
            placeholder="Licensing number"
            name="license_number"
            id="license_number"
            value={detailsValues.license_number}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <OrangeBtn
          buttonAction={mode === "EDIT" ? "Save" : "Create"}
          disabled={isLoading || isDetailsLoading}
          onClick={mode === "EDIT" ? handleEditDetails : handleCreateStylist}
          isloading={isDetailsLoading || (isLoading && activeTab === "Details")}
        />
      </div>
    </div>
  );
}

export default DetailsTab;

export const useDetailsTab = () => {
  const [detailsValues, setDetailsValues] = useState({
    stylist_name: "",
    license_board: "",
    license_number: "",
    photo: "",
  });
  const renderDetails = ({
    isOpen,
    isLoading,
    stylistData,
    mode,
    handleEditStylist,
    activeTab,
  }) => {
    return (
      <DetailsTab
        isOpen={isOpen}
        isLoading={isLoading}
        idx="content-details"
        detailsValues={detailsValues}
        setDetailsValues={setDetailsValues}
        stylistData={stylistData}
        mode={mode}
        handleEditStylist={handleEditStylist}
        activeTab={activeTab}
      />
    );
  };

  return { renderDetails, detailsValues };
};
