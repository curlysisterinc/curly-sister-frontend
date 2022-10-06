/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { NonAuthRoutes } from "constants";
import admin from "api/admin";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import moment from "moment";
import { ArticleItem } from "./ArticleItem";
import useGetAllArticles from "hooks/data/admin/useGetAllArticles";
import Loader from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";

function ArticleTab() {
  const [getArticles, setGetArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

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
    <div className="my-10">
      <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
        All articles
      </h2>

      {isArticlesLoading && <Loader />}
      {articlesRrror && <ErrorDisplayComponent refetch={articlesRefetch} />}

      {articlesData && (
        <>
          <div className="mt-6 flex space-x-6">
            <div
              onClick={() => setActiveTab("all")}
              className={clsx(
                activeTab === "all"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              All
            </div>
            <div
              onClick={() => setActiveTab("popular")}
              className={clsx(
                activeTab === "popular"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Popular
            </div>
            <div
              onClick={() => setActiveTab("recent")}
              className={clsx(
                activeTab === "recent"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Recent
            </div>
            <div
              onClick={() => setActiveTab("featured")}
              className={clsx(
                activeTab === "featured"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Featured
            </div>
          </div>
          <div className="mt-10">
            {activeTab === "all" && (
              <div className="mt-8">
                {getArticles.length > 0 ? (
                  <div className="grid grid-cols-3 gap-6">
                    {getArticles.map((article) => {
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

            {activeTab === "popular" && (
              <div className="mt-8">
                {getArticles.length > 0 ? (
                  <div className="grid grid-cols-3 gap-6">
                    {getArticles.map((article) => {
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

            {activeTab === "recent" && (
              <div className="mt-8">
                {getArticles.length > 0 ? (
                  <div className="grid grid-cols-3 gap-6">
                    {getArticles.map((article) => {
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

            {activeTab === "featured" && (
              <div className="mt-8">
                {getArticles.length > 0 ? (
                  <div className="grid grid-cols-3 gap-6">
                    {getArticles.map((article) => {
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
        </>
      )}
    </div>
  );
}

export default ArticleTab;
