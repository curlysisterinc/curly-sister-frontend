import React from "react";
import DropDown from "../../../primitive";
import kebabIcon from "../../../../../assets/images/kebab.svg";
import Content from "./content";

function StylistDropDown({ status, publishAction }) {
  return (
    <DropDown
      content={
        <Content
          status={status}
          // deteleAction={deteleAction}
          publishAction={publishAction}
        />
      }
    >
      <button
        type="button"
        className="hover:bg-gray-50 rounded-full h-8 w-8 flex justify-center items-center"
      >
        <img src={kebabIcon} alt="kebab icon" />
      </button>
    </DropDown>
  );
}

export default StylistDropDown;
