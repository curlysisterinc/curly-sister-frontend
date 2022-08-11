import React from "react";
import DropDownItem from "../../primitive/DropDownItem";
import DropDownMenuContent from "../../primitive/DropDownMenuContent";

function content({ setTypeValue }) {
  return (
    <DropDownMenuContent className="absolute bg-white rounded-xl  shadow w-44 ">
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("all types")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
        >
          All types
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("video")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          Video
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("article")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          Article
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default content;
