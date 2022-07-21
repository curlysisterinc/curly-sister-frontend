import React, { useState } from "react";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";
import trashIcon from "../../../../../assets/images/trash.svg";
import activateIcon from "../../../../../assets/images/activate.svg";
import arrowSwapIcon from "../../../../../assets/images/arrow-swap-horizontal.svg";
import arrowIcon from "../../../../../assets/images/next-arrow.svg";

function Content({
  status,
  deteleAction,
  activateAction,
  mkadminAction,
  mkStylistAction,
}) {
  const [showHiddenMenu, setShowHiddenMenu] = useState(false);
  return (
    <DropDownMenuContent className=" z-40 bg-white rounded-lg shadow-lg w-40 overflow-hidden text-sm text-gray-400">
      {!showHiddenMenu ? (
        <>
          <DropDownItem>
            <button
              type="button"
              onClick={activateAction}
              className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
            >
              <img className="mr-3" src={activateIcon} alt="key icon" />
              {status === "inactive" ? "Activate" : "Deactivate"}
            </button>
          </DropDownItem>
          <button
            type="button"
            onClick={() => setShowHiddenMenu(!showHiddenMenu)}
            className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
          >
            <img className="mr-3 " src={arrowSwapIcon} alt="key icon" />
            Change role
            <img
              className="mr-3 transform rotate-90"
              src={arrowIcon}
              alt="switch priviledge"
            />
          </button>
          <DropDownItem>
            <button
              type="button"
              onClick={deteleAction}
              className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500"
            >
              <img className="mr-3" src={trashIcon} alt="key icon" />
              Delete
            </button>
          </DropDownItem>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setShowHiddenMenu(!showHiddenMenu)}
            className="flex items-center mb-3 text-gray-300 hover:bg-gray-600 pl-3 py-2 "
          >
            <img className="mr-3" src={arrowIcon} alt="key icon" />
            Go back
          </button>
          <DropDownItem>
            <button
              type="button"
              onClick={mkadminAction}
              className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
            >
              <img className="mr-3" src={arrowSwapIcon} alt="key icon" />
              Make Admin
            </button>
          </DropDownItem>
          <DropDownItem>
            <button
              type="button"
              onClick={mkStylistAction}
              className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500"
            >
              <img className="mr-3" src={arrowSwapIcon} alt="key icon" />
              Make Stylist
            </button>
          </DropDownItem>
        </>
      )}
    </DropDownMenuContent>
  );
}

export default Content;
