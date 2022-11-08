import React, { useState } from "react";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";
import trashIcon from "../../../../../assets/images/trash.svg";
import activateIcon from "../../../../../assets/images/activate.svg";
import arrowSwapIcon from "../../../../../assets/images/arrow-swap-horizontal.svg";
import arrowIcon from "../../../../../assets/images/next-arrow.svg";

function Content({ status, deteleAction, activateAction, changeAdminToUser }) {
  const [showHiddenMenu, setShowHiddenMenu] = useState(false);
  return (
    <DropDownMenuContent className=" z-40 bg-white rounded-lg shadow-lg w-40 overflow-hidden text-sm text-gray-400">
      <DropDownItem>
        <button
          type="button"
          onClick={activateAction}
          className="flex items-center w-full px-2  hover:bg-gray-600  py-2 "
        >
          <img className="mr-3" src={activateIcon} alt="key icon" />
          {status ? "Deactivate" : "Activate"}
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={changeAdminToUser}
          className="flex items-center w-full px-2 hover:bg-gray-600  py-2"
        >
          <img className="mr-3" src={arrowSwapIcon} alt="key icon" />
          Make User
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={deteleAction}
          className="flex items-center w-full px-2 hover:bg-gray-600  py-2 text-red-500"
        >
          <img className="mr-3" src={trashIcon} alt="key icon" />
          Delete
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default Content;
