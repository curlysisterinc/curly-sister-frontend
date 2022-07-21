import React from "react";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";
// import trashIcon from "../../../../../assets/images/trash.svg";
import activateIcon from "../../../../../assets/images/activate.svg";

function Content({ status, publishAction }) {
  return (
    <DropDownMenuContent className=" z-40 bg-white rounded-lg shadow-lg w-40 overflow-hidden text-sm text-gray-400">
      <DropDownItem>
        <button
          type="button"
          onClick={publishAction}
          className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
        >
          <img className="mr-3" src={activateIcon} alt="key icon" />
          {status !== true ? "Activate" : "Deactivate"}
        </button>
      </DropDownItem>
      {/* <DropDownItem>
        <button
          type="button"
          onClick={deteleAction}
          className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500"
        >
          <img className="mr-3" src={trashIcon} alt="key icon" />
          Delete
        </button>
      </DropDownItem> */}
    </DropDownMenuContent>
  );
}

export default Content;
