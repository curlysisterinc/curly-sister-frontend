import React from "react";
import DropDown from "../../primitive";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import Content from "./content";

function Category({ setTypeValue, typeValue }) {
  const catgegoryHandler = (value) => {
    setTypeValue("category", value);
  };
  return (
    <DropDown content={<Content setTypeValue={catgegoryHandler} />}>
      <button
        type="button"
        className="cursor-pointer mr-2 bg-white w-48 relative font-normal text-gray-400 h-10 font-BeatriceSemiBold text-sm capitalize flex justify-between items-center border border-solid border-gray-800  rounded-full py-[0.625rem] px-4"
      >
        {typeValue}
        <img src={dropdownIcon} alt="drop down icon" />
      </button>
    </DropDown>
  );
}

export default Category;
