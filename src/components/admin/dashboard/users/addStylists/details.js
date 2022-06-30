/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import admin from "../../../../../api/admin";
import gradientAvatar from "../../../../../assets/images/gradient-avatar.svg";
import trashIcon from "../../../../../assets/images/trash.svg";

function DetailsTab() {
  const [selectedFile, setSelectedFile] = useState();
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

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

  const handleChange = (e) => {
    setStylistValues({ ...stylistValues, [e.target.name]: e.target.value });
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
  return (
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
  );
}

export default DetailsTab;
