import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useGetStylistById from "hooks/data/admin/useGetStylistById";
import useUploadToGallery from "hooks/data/admin/useUploadToGallery";
import useUpdateStylist from "hooks/data/admin/useUpdateStylist";
import uploadFile from "../../../../../assets/images/upload-file.png";
// import { Loadersmall } from "../../../../loader";
import trashWhite from "../../../../../assets/images/trash-white.svg";
import admin from "../../../../../api/admin";
import OrangeBtn from "../../../../customButton/orangeBtn";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
import { galleryInitials } from "./helper";

function GalleryTab({ ariaHidden, idx }) {
  const { id: stylistId } = useParams();
  const [galleryImages, setGalleryImages] = useState([]);

  const {
    isLoading: isStylistLoading,
    data: stylistData,
    isError: stylistError,
    refetch: stylistRefetch,
  } = useGetStylistById(stylistId);

  const {
    isLoading: isUpdateStylistLoading,
    data: updateStylistData,
    error: updateStylistError,
    mutate: updateStylist,
  } = useUpdateStylist();
  const { id } = useParams();

  const {
    isLoading: isGalleryUploadLoading,
    data: galleryUploadData,
    isError: galleryUploadError,
    refetch: galleryUploadRefetch,
    mutate: uploadGallery,
  } = useUploadToGallery();

  useEffect(() => {
    const ac = new AbortController();
    if (stylistData) {
      setGalleryImages(stylistData.data.stylist.gallery);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [stylistData]);

  useEffect(() => {
    const ac = new AbortController();
    if (galleryUploadData) {
      const result = galleryUploadData.data.uploaded_imges;
      // get the previous images
      const newImages = galleryImages.filter(
        (item) => typeof item === "string"
      );

      const ImagesToUpdate = [...newImages, ...result];
      updateStylist({ id: stylistId, gallery: ImagesToUpdate });
    }
    return function cleanup() {
      ac.abort();
    };
  }, [galleryUploadData]);

  const handleFileChange = (e) => {
    const displayImage = Array.from(e.target.files).map((file, index) => {
      return {
        link: URL.createObjectURL(file),
        file,
        key: new Date().getTime() + index,
      };
    });

    setGalleryImages([...galleryImages, ...displayImage]);
  };

  const saveAndUploadPictures = () => {
    const formdata = new FormData();
    const imagesToUpload = galleryImages.filter(
      (item) => typeof item === "object"
    );

    if (imagesToUpload.length) {
      imagesToUpload.forEach((photo) => {
        formdata.append(`file`, photo.file);
      });
      uploadGallery(formdata);
    } else {
      updateStylist({ id: stylistId, gallery: galleryImages });
    }
  };

  // handle click event of the Remove button
  const removeImage = (path) => {
    const newImages = galleryImages.filter((item) => {
      if (typeof item === "object") {
        return item?.key !== path;
      }
      return item !== path;
    });

    setGalleryImages(newImages);
  };

  const renderPhotos = (src) => {
    return (
      src.length > 0 &&
      src.map((path) => {
        return (
          <div key={path?.key ?? path} className="relative mb-5 mx-2">
            <button
              type="button"
              className="absolute bg-gray-450 rounded-full p-1 left-0"
              onClick={() => removeImage(path?.key ?? path)}
            >
              <img src={trashWhite} alt="remove item" />
            </button>
            <img
              src={typeof path === "object" ? path.link : path}
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
            disabled={isGalleryUploadLoading || isUpdateStylistLoading}
            type="file"
            multiple={true} //eslint-disable-line
            accept="image/*"
            name="gallery"
            onChange={handleFileChange}
            className="opacity-0 absolute h-16 w-120  border"
          />

          <img src={uploadFile} className="h-16 w-120" alt="" />
        </div>
        {renderPhotos(galleryImages)}
      </div>
      <div className="flex justify-end">
        <OrangeBtn
          buttonAction="Save"
          disabled={isGalleryUploadLoading || isUpdateStylistLoading}
          onClick={saveAndUploadPictures}
          isloading={isGalleryUploadLoading || isUpdateStylistLoading}
        />
      </div>
    </div>
  );
}

export default GalleryTab;
