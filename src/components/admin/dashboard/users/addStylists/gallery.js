/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-const */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import uploadFile from "../../../../../assets/images/upload-file.png";
import trashWhite from "../../../../../assets/images/trash-white.svg";
import admin from "../../../../../api/admin";

function GalleryTab({ ariaHidden, idx, data, setData }) {
  const [buttonAction, setButtonAction] = useState("Save");
  const [isloading, setIsloading] = useState(false);
  const stylistId = localStorage.getItem("createdStylist");
  const [uploadnewData, setUploadnewData] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    setData((prev) => ({ ...prev, update: { ...prev.update, id: stylistId } }));
    if (state._id !== undefined) {
      setButtonAction("Edit");
    }
  }, []);

  const handleFileChange = (e) => {
    const [displayImage] = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    const [imgObj] = e.target.files;
    const { name } = imgObj;
    setData((prev) => ({
      ...prev,
      preview: [...prev.preview, { img: displayImage, name }],
      toUpload: [...prev.toUpload, imgObj],
    }));
  };

  useEffect(() => {
    if (uploadnewData === true) {
      admin
        .UpdateStylist(data.update)
        .then((response) => {
          console.log(response.data, "updating stylist with gallery");
          setButtonAction("Edit");
          setIsloading(false);
          setUploadnewData(false);
        })
        .catch((error) =>
          console.log(error, "error updating stylist with gallery")
        );
    }
  }, [uploadnewData]);

  const onSavehandler = () => {
    setIsloading(true);
    const formdata = new FormData();

    data.toUpload.forEach((photo) => {
      formdata.append(`file`, photo);
    });
    admin
      .UploadtoGallery(formdata)
      .then((res) => {
        setData((prev) => ({
          ...prev,
          update: { ...prev.update, gallery: [...res.data?.uploaded_imges] }, //eslint-disable-line
        }));
        setUploadnewData(true);
      })
      .catch((err) => console.log(err, "error uploading Image"));
  };

  const btnClickHandler = () => {
    if (buttonAction === "Save" || buttonAction === "Update") {
      onSavehandler();
    }
    if (buttonAction === "Edit") {
      setButtonAction("Update");
    }
  };

  // handle click event of the Remove button
  const removeImage = (path) => {
    const { img, name } = path;
    const otherPreviewData = data.preview.filter((itm) => itm.img !== img);
    const otherUploadData = data.toUpload.filter((itm) => itm.name !== name);

    setData((prev) => ({
      ...prev,
      preview: [...otherPreviewData],
      toUpload: [...otherUploadData],
    }));
  };
  const renderPhotos = (src) => {
    return (
      src.length > 0 &&
      src.map((path) => {
        return (
          <div key={path?.img} className="relative mb-5 mx-2">
            <button
              type="button"
              disabled={buttonAction === "Edit"}
              className="absolute bg-gray-450 rounded-full p-1 left-0"
              onClick={() => removeImage(path)}
            >
              <img src={trashWhite} alt="remove item" />
            </button>
            <img
              src={path?.img}
              className="h-16 w-120 object-contain"
              alt="cover"
            />
          </div>
        );
      })
    );
  };

  return (
    <div className="relative" aria-hidden={ariaHidden} id={idx}>
      {isloading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-black-50">
          <div className="loader" />
        </div>
      )}
      <div className="mt-5 flex flex-wrap justify-start">
        <div className="mb-5 mx-2">
          <input
            disabled={buttonAction === "Edit"}
            type="file"
            multiple={true} //eslint-disable-line
            accept="images/*"
            name="gallery"
            onChange={handleFileChange}
            className="opacity-0 absolute h-16 w-120  border"
          />

          <img src={uploadFile} className="h-16 w-120" alt="" />
        </div>
        {renderPhotos(data.preview)}
      </div>
      <div className="flex justify-end">
        <button
          onClick={btnClickHandler}
          type="button"
          className="text-sm font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5"
        >
          {buttonAction}
        </button>
      </div>
    </div>
  );
}

export default GalleryTab;
