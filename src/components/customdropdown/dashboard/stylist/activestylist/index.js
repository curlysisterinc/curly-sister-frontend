import React from "react";
import DropDown from "../../../primitive";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import Content from "./content";

function ActiveStylist({ bool, setBool, detailActionBtn }) {
  return (
    <DropDown
      disabled={detailActionBtn === "Edit"}
      content={<Content setBool={setBool} />}
    >
      <button
        type="button"
        className="cursor-pointer mr-2 bg-white w-32 relative font-normal text-gray-400 h-10 font-BeatriceSemiBold text-sm capitalize flex justify-between items-center border border-solid border-gray-800  rounded-full p-3"
      >
        {bool ? "active" : "in Active"}
        <img src={dropdownIcon} alt="drop down icon" />
      </button>
    </DropDown>
  );
}

export default ActiveStylist;
