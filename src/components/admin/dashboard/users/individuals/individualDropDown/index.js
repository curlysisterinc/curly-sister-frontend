import DropDown from "components/customdropdown/primitive";
import React from "react";
// import DropDown from "../../../primitive";
import kebabIcon from "assets/images/kebab.svg";
import Content from "./content";

function IndividualDropDown({ status, publishAction }) {
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
        className="hover:bg-gray-500 rounded-full  flex justify-center items-center p-2"
      >
        <img src={kebabIcon} alt="kebab icon" className="h-5 w-5" />
      </button>
    </DropDown>
  );
}

export default IndividualDropDown;
