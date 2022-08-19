import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import uploadFile from "../../../../../assets/images/upload-file.png";
// import { Loadersmall } from "../../../../loader";
import trashWhite from "../../../../../assets/images/trash-white.svg";
import admin from "../../../../../api/admin";
import OrangeBtn from "../../../../customButton/orangeBtn";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
import { galleryInitials } from "./helper";

function GalleryTab({ ariaHidden, idx }) {
  const [stylistGallery, setStylistGallery] = useState(galleryInitials);
  const [buttonAction, setButtonAction] = useState("Save");
  const [isloading, setIsloading] = useState(false);
  const stylistId = localStorage.getItem("createdStylist");
  const [uploadnewData, setUploadnewData] = useState(false);
  const { state } = useLocation();

  useChangeBtnTitle("gallery", setButtonAction, setStylistGallery);

  useEffect(() => {
    if (state !== "" || state !== undefined || state !== null) {
      setIsloading(true);
      admin
        .GetStylistById(stylistId)
        .then((res) => {
          const { gallery } = res.data.stylist;

          gallery.forEach((picture) => {
            setStylistGallery((prev) => ({
              ...prev,
              preview: [
                ...prev.preview,
                { img: picture, name: picture.substring(picture.length - 10) },
              ],
              update: {
                ...prev.update,
                gallery: [...prev.update.gallery, picture],
              },
            }));
          });

          setIsloading(false);
        })
        .catch((err) => {
          console.log(err, "error fetching existing stylist information");
          setIsloading(false);
        });
    }
  }, []);

  const handleFileChange = (e) => {
    const [displayImage] = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    const [imgObj] = e.target.files;
    const { name } = imgObj;
    setStylistGallery((prev) => ({
      ...prev,
      preview: [...prev.preview, { img: displayImage, name }],
      toUpload: [...prev.toUpload, imgObj],
    }));
  };

  useEffect(() => {
    if (uploadnewData === true) {
      admin
        .UpdateStylist(stylistGallery.update)
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

    stylistGallery.toUpload.forEach((photo) => {
      formdata.append(`file`, photo);
    });
    admin
      .UploadtoGallery(formdata)
      .then((res) => {
        setStylistGallery((prev) => ({
          ...prev,
          update: { ...prev.update, gallery: [...res.data?.uploaded_imges] } //eslint-disable-line
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
    const otherPreviewData = stylistGallery.preview.filter(
      (itm) => itm.img !== img
    );
    const otherUploadData = stylistGallery.toUpload.filter(
      (itm) => itm.name !== name
    );

    setStylistGallery((prev) => ({
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
        {renderPhotos(stylistGallery.preview)}
      </div>
      <div className="flex justify-end">
        <OrangeBtn
          buttonAction={buttonAction}
          // disabled={disableBtn()}
          onClick={btnClickHandler}
          isloading={isloading}
        />
        {/* <button
          onClick={btnClickHandler}
          type="button"
          className="text-sm disabled:opacity-50 font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5 flex items-center gap-x-2"
        >
          {buttonAction}
          {isloading && <Loadersmall />}
        </button> */}
      </div>
    </div>
  );
}

export default GalleryTab;
