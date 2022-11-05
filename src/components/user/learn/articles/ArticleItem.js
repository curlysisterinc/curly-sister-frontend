import React from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import { NonAuthRoutes } from "constants";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import useSaveArticle from "hooks/data/learn/useSaveArticle";
import useDeleteSavedArticle from "hooks/data/learn/useDeleteSavedArticle";
import { Loadersmall } from "components/loader-component/loader";
import dayjs from "dayjs";
import Image from "../../../image";

export function ArticleItem({ article }) {
  const navigate = useNavigate();
  const {
    state: { isSignedIn },
  } = useAuthContext();

  const {
    isLoading: isSavedArticleLoading,
    data: SavedArticleData,
    mutate: SaveArticle,
  } = useSaveArticle(article._id);

  const {
    isLoading: isDeleteSavedArticleLoading,
    data: deleteSavedArticleData,
    mutate: deleteSavedArticle,
  } = useDeleteSavedArticle(article._id);

  const handleNavigate = (item) => {
    return isSignedIn
      ? navigate(`/learn/article/${item._id}`)
      : navigate(NonAuthRoutes.login);
  };

  const handleClickBookmarkButton = (e) => {
    e.stopPropagation();
    if (article?.is_saved || article?.isSaved) {
      deleteSavedArticle();
    } else {
      SaveArticle();
    }
  };

  const isLoading = isSavedArticleLoading || isDeleteSavedArticleLoading;

  const isData = SavedArticleData || deleteSavedArticleData;
  return (
    <div
      role="button"
      tabIndex={0}
      key={article._id}
      onClick={() => handleNavigate(article)}
      onKeyPress={(e) =>
        runFunctionWhenSpaceOrEnterIsClicked(e, handleNavigate(article))
      }
      className="bg-white border rounded-2xl border-gray-600 shadow-s01 relative max-h-372 overflow-hidden"
    >
      <Image
        src={article.image}
        alt="curly-1 "
        className="relative w-full h-159 object-cover"
      />

      {/* <span className="flex items-center absolute right-2 top-2 z-40"> */}
      <span className="rounded-full p-2 bg-gray-200 opacity-80  flex justify-center items-center absolute right-2 top-2 z-40">
        <button
          type="button"
          // className="absolute top-0 right-0 mr-4 mt-4 z-40"
          onClick={handleClickBookmarkButton}
        >
          {isLoading && (
            <div className="h-4 w-4 flex items-center justify-center">
              <Loadersmall color="gray" />
            </div>
          )}
          {!isLoading &&
            (article.is_saved || article.isSaved ? (
              <MdBookmark color="white" />
            ) : (
              <MdOutlineBookmarkBorder color="white" />
            ))}
        </button>
      </span>

      <div className="pt-5 pb-8 px-6">
        <p className="text-gray-200 text-sm mb-2 font-normal">
          {article.created_by.firstName} {article.created_by.lastName} ·{" "}
          {dayjs(article.createdAt).format("DD MMM YYYY")}
        </p>

        <h2 className="text-base cursor-pointer text-gray-400 font-semibold mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-200 font-normal max-h-24 overflow-hidden">
          {article.description}
        </p>
      </div>
    </div>
  );
}
