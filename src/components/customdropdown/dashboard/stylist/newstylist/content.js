import React from "react";
import { useNavigate } from "react-router-dom";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";
import { AuthRoutes } from "../../../../../constants";
import addManuallyIcon from "../../../../../assets/images/add-manually.svg";
import documentDownloadIcon from "../../../../../assets/images/receive-square.svg";
import documentTextIcon from "../../../../../assets/images/document-text.svg";

function Content() {
  const navigate = useNavigate();

  return (
    <DropDownMenuContent className="absolute bg-white rounded-xl  shadow w-44 ">
      <DropDownItem>
        <button
          type="button"
          onClick={() => navigate(AuthRoutes.addStylist)}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
        >
          <img className="mr-2" src={addManuallyIcon} alt="" />
          Add manually
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => null}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
        >
          <img className="mr-2" src={documentTextIcon} alt="" />
          Import .csv
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => null}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          <img className="mr-2" src={documentDownloadIcon} alt="select video" />
          Get .csv template
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default Content;
