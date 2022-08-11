import React from "react";
import DropDownItem from "../../primitive/DropDownItem";
import DropDownMenuContent from "../../primitive/DropDownMenuContent";

function content({ setTypeValue }) {
  return (
    <DropDownMenuContent className="absolute bg-white rounded-xl  shadow w-44 ">
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("In person")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
        >
          In person
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("Virtual")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          Virtual
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => setTypeValue("Both")}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          Both
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default content;
