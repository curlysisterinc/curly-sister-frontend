import React, { useState } from "react";
import clsx from "clsx";
import DropDown from "../../../primitive";
import Content from "./content";
import whiteDropdownIcon from "../../../../../assets/images/white-dropdown.svg";

function Newcontent() {
  const [toggleAddContent, setToggleAddContent] = useState(false);
  return (
    <DropDown content={<Content />}>
      <button
        type="button"
        onClick={() => setToggleAddContent(!toggleAddContent)}
        className="cursor-pointer bg-purple-100 relative text-white h-10 font-BeatriceSemiBold text-sm flex justify-between items-center  rounded-full p-3"
      >
        New content
        <img
          className={clsx(toggleAddContent && "transform rotate-180", "ml-6")}
          src={whiteDropdownIcon}
          alt=""
        />
      </button>
    </DropDown>
  );
}

export default Newcontent;
