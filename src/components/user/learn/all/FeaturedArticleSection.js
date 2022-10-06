import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NonAuthRoutes } from "constants";
import moment from "moment";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import Loader from "components/loader-component/loader";
import { useAuthContext } from "redux/auth";
import useGetAllArticles from "hooks/data/admin/useGetAllArticles";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import { ArticleItem } from "../articles/ArticleItem";

export function FeaturedArticleSection() {
  const [getArticles, setGetArticles] = useState([]);
  const {
    data: articlesData,
    isLoading: isArticlesLoading,
    error: articlesRrror,
    refetch: articlesRefetch,
  } = useGetAllArticles();

  useEffect(() => {
    if (articlesData) {
      setGetArticles(articlesData.data.data);
    }
  }, [articlesData]);

  return (
    <div className="mb-20">
      <div className="flex mt-10 mb-6 items-center justify-between">
        <h2 className="text-gray-400 text-2xl font-semibold">
          Featured articles
        </h2>
        {getArticles.length > 0 && (
          <Link
            to={NonAuthRoutes.articles}
            className="text-purple-100 text-sm font-normal"
          >
            View all articles
          </Link>
        )}
      </div>
      {isArticlesLoading ? (
        <Loader />
      ) : (
        <div>
          {getArticles.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {getArticles.slice(0, 3).map((article) => {
                return <ArticleItem article={article} />;
              })}
            </div>
          ) : (
            <h3 className="text-center text-black text-xl font-BeatriceSemiBold">
              No content added
            </h3>
          )}
        </div>
      )}
    </div>
  );
}
