import DropDownItem from "components/customdropdown/primitive/DropDownItem";
import DropDownMenuContent from "components/customdropdown/primitive/DropDownMenuContent";
import React from "react";
import activateIcon from "assets/images/activate.svg";
import trashIcon from "assets/images/trash.svg";
import swapIcon from "assets/images/arrow-swap-horizontal.svg";

function Content({ status, toggleActivation, handleDeleteUser }) {
  return (
    <DropDownMenuContent className=" z-40 bg-white rounded-lg shadow-lg w-40 overflow-hidden text-sm text-gray-400">
      <DropDownItem>
        <button
          type="button"
          onClick={toggleActivation}
          className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 w-full"
        >
          <img className="mr-3" src={activateIcon} alt="key icon" />
          {status !== true ? "Activate" : "Deactivate"}
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={toggleActivation}
          className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 w-full"
        >
          <img className="mr-3" src={swapIcon} alt="key icon" />
          Make admin
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={toggleActivation}
          className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 w-full"
        >
          <img className="mr-3" src={swapIcon} alt="key icon" />
          Make stylist
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={handleDeleteUser}
          className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500 w-full"
        >
          <img className="mr-3" src={trashIcon} alt="key icon" />
          Delete
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default Content;
