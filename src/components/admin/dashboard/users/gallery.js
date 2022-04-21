import React, { useState } from "react";
import uploadFile from "../../../../assets/images/upload-file.png";
import trashWhite from "../../../../assets/images/trash-white.svg";

function GalleryTab() {
  const [coverPhoto, setCoverPhoto] = useState(null);
  // handle file change
  const handleFileChange = (e) => {
    setCoverPhoto(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <div className="mt-5 flex ">
        <div className="mr-5">
          <input
            type="file"
            onChange={handleFileChange}
            className="opacity-0 absolute h-16 w-120  border"
          />

          <img src={uploadFile} className="h-16 w-120" alt="" />
        </div>

        <div className="relative mr-5">
          <img
            className="absolute bg-gray-400 rounded-full p-1 left-0"
            src={trashWhite}
            alt=""
          />
          <img
            src={coverPhoto}
            className="h-16 w-120 object-cover"
            alt="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default GalleryTab;
