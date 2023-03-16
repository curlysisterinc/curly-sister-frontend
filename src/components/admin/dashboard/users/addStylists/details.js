/* eslint-disable camelcase */
import useCreateStylists from "hooks/data/admin/useCreateStylists";
import useUploadPhoto from "hooks/data/admin/useUploadPhoto";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import admin from "../../../../../api/admin";
import Avatar from "../../../../../assets/images/product-recommendation.png";
import OrangeBtn from "../../../../customButton/orangeBtn";

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
    const ac = new AbortController();
    if (stylistData) {
      setDetailsValues({ ...detailsValues, ...stylistData });
      setCoverPhoto(stylistData.photo);
    }
    return function cleanup() {
      ac.abort();
    };
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

  const {
    isLoading: isPhotoUploadLoading,
    data: photoUploadData,
    isError: photoUploadError,
    refetch: photoUploadRefetch,
    mutate: uploadPhoto,
  } = useUploadPhoto();

  useEffect(() => {
    if (detailsData) {
      navigate(
        `/dashboard/users/edit-stylist/${detailsData.data.stylist._id}?tab=location`
      );
    }
  }, [detailsData]);

  useEffect(() => {
    if (photoUploadData) {
      setDetailsValues({ ...detailsValues, photo: photoUploadData.data.file });
      setCoverPhoto(photoUploadData.data.file);
      // setImgUpload(false);
    }
  }, [photoUploadData]);

  // handle file change
  const handleFileChange = (e) => {
    const [addimage] = e.target.files;
    e.target.value = null;
    if (addimage) {
      const formData = new FormData();
      formData.append("file", addimage);
      uploadPhoto(formData);
    }
  };

  const handleChange = (e) => {
    setDetailsValues({ ...detailsValues, [e.target.name]: e.target.value });
  };

  const handleCreateStylist = () => {
    createStylist({
      ...detailsValues,
      category_type: "walk-in only stylist",
      active: true,
    });
  };

  const handleEditDetails = () => {
    const {
      stylist_name,
      business_name,
      description,
      license_number,
      license_board,
      photo,
      _id,
    } = detailsValues;

    const newValue = {
      stylist_name,
      description,
      license_number,
      license_board,
      photo,
      business_name,
      _id,
    };
    handleEditStylist(newValue);
  };

  const handleDisabledButton = () => {
    const hasEmptyValue =
      detailsValues.business_name === "" || detailsValues.description === "";
    return hasEmptyValue || isLoading || isDetailsLoading;
  };

  return (
    <div aria-hidden={isOpen} className="mt-5 relative">
      <div className="flex justify-between items-center w-full ">
        <div className="relative  w-20 h-20 rounded-full object-cover">
          <img
            className=" absolute inset-0 w-20 h-20 object-cover rounded-full "
            src={coverPhoto?.length > 0 ? coverPhoto : Avatar}
            alt="user profile"
          />
          {isPhotoUploadLoading && (
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
        Business Name
        <input
          className="text-sm shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm font-normal"
          type="text"
          disabled={isLoading}
          placeholder="Enter Business name"
          name="business_name"
          id="business_name"
          value={detailsValues.business_name}
          onChange={handleChange}
        />
      </label>
      <label
        className="block text-black text-sm font-bold mt-5"
        htmlFor="stylist_name"
      >
        Stylist Name
        <input
          className="text-sm shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm font-normal"
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
          className="text-sm shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm font-normal"
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
            className="shadow-sm appearance-none  border-0  col-1 py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none text-sm font-normal"
            type="text"
            disabled={isLoading}
            placeholder="Licensing board"
            name="license_board"
            id="license_board"
            value={detailsValues.license_board}
            onChange={handleChange}
          />

          <input
            className="shadow-sm appearance-none  border-0  col-1 py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none text-sm font-normal"
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
          disabled={handleDisabledButton()}
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
