/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
import React, { useState } from "react";
import uploadFile from "../../../../../assets/images/upload-file.png";
import trashWhite from "../../../../../assets/images/trash-white.svg";

function GalleryTab() {
  // const [imageUrls, setImageUrls] = useState([]);
  const [images, setImages] = useState([]);
  const emptyFiles = [];
  // handle image change change
  const handleImageChange = (e) => {
    const fileArray = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    emptyFiles.push(fileArray);
    console.log(fileArray, emptyFiles);

    setImages((prevImages) => prevImages.concat(fileArray));
    // Array.from(e.target.files).map((file) => URL.revokeObject(file));
  };

  // handle click event of the Remove button
  const removeImage = (e) => {
    const newImageArr = [...images];
    const myIndex = newImageArr.indexOf(e.target.value);
    console.log(myIndex, e, "index");

    // newImageArr.splice(myIndex, 1);
    // setImages({ images: newImageArr });
  };
  const renderPhotos = (src) => {
    return (
      src.length > 0 &&
      src.map((path) => {
        return (
          <div key={path} className="relative mb-5 mx-2">
            <img
              className="absolute bg-gray-450 rounded-full p-1 left-0"
              src={trashWhite}
              alt=""
            />

            <img
              onClick={(e) => removeImage(e)}
              src={path}
              className="h-16 w-120 object-contain"
              alt="cover"
            />
          </div>
        );
      })
    );
  };

  return (
    <div>
      <div className="mt-5 flex flex-wrap justify-start">
        <div className="mb-5 mx-2">
          <input
            type="file"
            mutltiple="true"
            accept="images/*"
            onChange={handleImageChange}
            className="opacity-0 absolute h-16 w-120  border"
          />

          <img src={uploadFile} className="h-16 w-120" alt="" />
        </div>
        {renderPhotos(images)}
      </div>
    </div>
  );
}

export default GalleryTab;
