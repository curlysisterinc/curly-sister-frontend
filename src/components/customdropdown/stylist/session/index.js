import React from "react";
import DropDown from "../../primitive/index";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import Content from "./content";

function Session({ setTypeValue, typeValue }) {
  const SessionHandler = (value) => {
    setTypeValue("session", value);
  };
  return (
    <DropDown content={<Content setTypeValue={SessionHandler} />}>
      <button
        type="button"
        className="cursor-pointer mr-2 bg-white w-44 relative font-normal text-gray-400 h-10 font-BeatriceSemiBold text-sm capitalize flex justify-between items-center border border-solid border-gray-800  rounded-full p-3"
      >
        {typeValue}
        <img src={dropdownIcon} alt="drop down icon" />
      </button>
    </DropDown>
  );
}

export default Session;
