import React from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import { NonAuthRoutes } from "constants";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import moment from "moment";
import play from "../../../../assets/images/play-btn.svg";

export function ArticleItem({ article }) {
  const navigate = useNavigate();
  const {
    state: { isSignedIn },
  } = useAuthContext();

  const handleNavigate = (item) => {
    return isSignedIn
      ? navigate(`/learn/article/${item._id}`)
      : navigate(NonAuthRoutes.login);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      key={article._id}
      onClick={() => handleNavigate(article)}
      onKeyPress={(e) =>
        runFunctionWhenSpaceOrEnterIsClicked(e, handleNavigate(article))
      }
      className="bg-white border rounded-2xl border-gray-100 shadow relative"
    >
      <img src={article.image} alt="curly-1 " className="relative w-full " />
      {/* <img src={article.image} alt="curly-1" className="relative" /> */}
      <div className="absolute top-0 right-0 mr-4 mt-4 ">
        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
          {article.number_of_saves.length > 0 ? (
            <MdOutlineBookmarkBorder color="white" />
          ) : (
            <MdBookmark color="white" />
          )}
        </span>
      </div>
      <div className="p-4">
        <p className="text-gray-400 text-opacity-50 text-sm font-normal">
          {article.created_by.firstName} {article.created_by.lastName} ·{" "}
          {article.number_of_views} views ·{" "}
          {moment(article.createdAt).fromNow()}
        </p>
        <div
          role="button"
          tabIndex={0}
          key={article._id}
          onClick={() => handleNavigate(article)}
          onKeyPress={(e) =>
            runFunctionWhenSpaceOrEnterIsClicked(e, handleNavigate(article))
          }
        >
          <h2 className="text-base cursor-pointer text-gray-400 font-semibold mb-2">
            {article.title}
          </h2>
        </div>
        <p className="text-sm text-gray-200 font-normal">
          {article.description}
        </p>
      </div>
    </div>
  );
}
