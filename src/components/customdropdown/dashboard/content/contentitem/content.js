import React from "react";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";
import trashIcon from "../../../../../assets/images/trash.svg";
import editIcon from "../../../../../assets/images/edit.svg";
import publishIcon from "../../../../../assets/images/publish.svg";

function Content({ status, handleDeleteContent, editHandler, publishHandler }) {
  return (
    <DropDownMenuContent className="absolute z-40 bg-white rounded-lg shadow-lg w-40  overflow-hidden text-sm text-gray-400">
      <DropDownItem>
        <button
          type="button"
          className="flex items-center justify-start cursor-pointer text-gray-400 text-sm w-full p-3 hover:bg-gray-50"
          onClick={editHandler}
        >
          <img className="mr-3" src={editIcon} alt="" />
          Edit
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          onClick={publishHandler}
          type="button"
          className="flex items-center justify-start cursor-pointer text-gray-400 text-sm w-full p-3 hover:bg-gray-50"
        >
          <img className="mr-3" src={publishIcon} alt="key icon" />
          {status.toLowerCase() !== "published" ? "Publish" : "UnPublish"}
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={handleDeleteContent}
          className="flex items-center justify-start cursor-pointer text-red-400 text-sm w-full p-3 hover:bg-gray-50"
        >
          <img className="mr-3" src={trashIcon} alt="key icon" />
          Delete
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default Content;
