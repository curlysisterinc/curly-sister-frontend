import React from "react";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";
import trashIcon from "../../../../../assets/images/trash.svg";
import editIcon from "../../../../../assets/images/edit.svg";
import publishIcon from "../../../../../assets/images/publish.svg";

function Content({ status, deleteHandler, editHandler, publishHandler }) {
  return (
    <DropDownMenuContent className="absolute z-40 bg-white rounded-lg shadow-lg w-40  overflow-hidden text-sm text-gray-400">
      <DropDownItem>
        <button
          type="button"
          className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
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
          className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
        >
          <img className="mr-3" src={publishIcon} alt="key icon" />
          {status.toLowerCase() !== "published" ? "Publish" : "UnPublish"}
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={deleteHandler}
          className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500"
        >
          <img className="mr-3" src={trashIcon} alt="key icon" />
          Delete
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default Content;
