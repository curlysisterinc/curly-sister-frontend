import React from "react";
import { useNavigate } from "react-router-dom";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";
import { AuthRoutes } from "../../../../../constants";
import articleIcon from "../../../../../assets/images/article.svg";
import videoIcon from "../../../../../assets/images/video.svg";

function Content() {
  const navigate = useNavigate();
  return (
    <DropDownMenuContent className="absolute bg-white rounded-xl  shadow w-44 ">
      <DropDownItem>
        <button
          type="button"
          onClick={() => navigate(AuthRoutes.addArticle)}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
        >
          <img className="mr-2" src={articleIcon} alt="" />
          Article
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => navigate(AuthRoutes.addVideo)}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          <img className="mr-2" src={videoIcon} alt="select video" />
          Videos
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default Content;
