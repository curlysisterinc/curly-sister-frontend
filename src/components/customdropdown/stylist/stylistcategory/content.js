import React from "react";
import DropDownItem from "../../primitive/DropDownItem";
import DropDownMenuContent from "../../primitive/DropDownMenuContent";

function content({ setTypeValue }) {
  return (
    <DropDownMenuContent className="absolute bg-white rounded-xl  shadow w-44 ">
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("walk-in Only stylist")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
        >
          Walk-in Only stylist
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("curly sister stylist")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          Curly sister stylist
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("master stylist")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          Master stylist
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default content;
