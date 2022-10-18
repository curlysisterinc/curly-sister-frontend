import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useGetAllArticles from "hooks/data/admin/useGetAllArticles";
import Loader from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { ArticleItem } from "./ArticleItem";

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
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={clsx(
                activeTab === "all"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("popular")}
              className={clsx(
                activeTab === "popular"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Popular
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("recent")}
              className={clsx(
                activeTab === "recent"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Recent
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("featured")}
              className={clsx(
                activeTab === "featured"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Featured
            </button>
          </div>
          <div className="mt-10">
            {activeTab === "all" && (
              <div className="mt-8">
                {getArticles.length > 0 ? (
                  <div className="grid grid-cols-3 gap-6">
                    {getArticles.map((article) => {
                      return (
                        <ArticleItem article={article} key={article._id} />
                      );
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
