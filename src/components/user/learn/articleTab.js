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
import { NonAuthRoutes } from "../../../constants";
import admin from "../../../api/admin";
import curly1 from "../../../assets/images/curly-sister.png";
import oprah from "../../../assets/images/oprah-winfrey.png";
import curly2 from "../../../assets/images/curly-sister2.png";
import bookmark from "../../../assets/images/book-mark.png";
import bookmarkfilled from "../../../assets/images/bookmark-filled.png";
import LearnTabComponent from "./learnTabComponent";
import moment from "moment";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import learn from "../../../api/learn";

function ArticleTab() {
  const navigate = useNavigate();
  const [getArticles, setGetArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const details = localStorage.getItem("user");
    if (details) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(async () => {
    const ac = new AbortController();

    admin
      .GetAllArticles()
      .then((response) => {
        console.log(response.data.data, "Success");

        setGetArticles(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <div className="my-20">
      <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
        All articles
      </h2>
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
      {activeTab === "all" && (
        <div className="mt-8">
          {getArticles.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {getArticles.map((article) => {
                return (
                  <div
                    onClick={() => {
                      isLoggedIn
                        ? navigate(`/learn/article/${article._id}`)
                        : navigate(NonAuthRoutes.login);
                    }}
                    className="bg-white border rounded-2xl border-gray-100 shadow relative"
                  >
                    <img
                      src={article.image}
                      alt="curly-1 "
                      className="relative w-full "
                    />

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
                      <div className="flex space-x-2 mb-2">
                        <p className="text-sm text-gray-200 font-normal ">
                          {article.created_by.firstName}{" "}
                          {article.created_by.lastName}
                        </p>
                        <p className="text-sm text-gray-200 font-normal ">
                          {moment(article.createdAt).format("DD MM YYYY")}
                        </p>
                      </div>

                      <h4 className="text-base text-gray-350 font-semibold mb-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-200 font-normal">
                        The first question of course was, how to get dry again:
                        they had a meeting about this, and after a few
                        minutes...
                      </p>
                    </div>
                  </div>
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
                return (
                  <div
                    onClick={() => {
                      isLoggedIn
                        ? navigate(`/learn/article/${article._id}`)
                        : navigate(NonAuthRoutes.login);
                    }}
                    className="bg-white border rounded-2xl border-gray-100 shadow relative"
                  >
                    <img
                      src={article.image}
                      alt="curly-1 "
                      className="relative w-full "
                    />

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
                      <div className="flex space-x-2 mb-2">
                        <p className="text-sm text-gray-200 font-normal ">
                          {article.created_by.firstName}{" "}
                          {article.created_by.lastName}
                        </p>
                        <p className="text-sm text-gray-200 font-normal ">
                          {moment(article.createdAt).format("DD MM YYYY")}
                        </p>
                      </div>

                      <h4 className="text-base text-gray-350 font-semibold mb-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-200 font-normal">
                        The first question of course was, how to get dry again:
                        they had a meeting about this, and after a few
                        minutes...
                      </p>
                    </div>
                  </div>
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

      {activeTab === "recent" && (
        <div className="mt-8">
          {getArticles.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {getArticles.map((article) => {
                return (
                  <div
                    onClick={() => {
                      isLoggedIn
                        ? navigate(`/learn/article/${article._id}`)
                        : navigate(NonAuthRoutes.login);
                    }}
                    className="bg-white border rounded-2xl border-gray-100 shadow relative"
                  >
                    <img
                      src={article.image}
                      alt="curly-1 "
                      className="relative w-full "
                    />

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
                      <div className="flex space-x-2 mb-2">
                        <p className="text-sm text-gray-200 font-normal ">
                          {article.created_by.firstName}{" "}
                          {article.created_by.lastName}
                        </p>
                        <p className="text-sm text-gray-200 font-normal ">
                          {moment(article.createdAt).format("DD MM YYYY")}
                        </p>
                      </div>

                      <h4 className="text-base text-gray-350 font-semibold mb-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-200 font-normal">
                        The first question of course was, how to get dry again:
                        they had a meeting about this, and after a few
                        minutes...
                      </p>
                    </div>
                  </div>
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

      {activeTab === "featured" && (
        <div className="mt-8">
          {getArticles.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {getArticles.map((article) => {
                return (
                  <div
                    onClick={() => {
                      isLoggedIn
                        ? navigate(`/learn/article/${article._id}`)
                        : navigate(NonAuthRoutes.login);
                    }}
                    className="bg-white border rounded-2xl border-gray-100 shadow relative"
                  >
                    <img
                      src={article.image}
                      alt="curly-1 "
                      className="relative w-full "
                    />

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
                      <div className="flex space-x-2 mb-2">
                        <p className="text-sm text-gray-200 font-normal ">
                          {article.created_by.firstName}{" "}
                          {article.created_by.lastName}
                        </p>
                        <p className="text-sm text-gray-200 font-normal ">
                          {moment(article.createdAt).format("DD MM YYYY")}
                        </p>
                      </div>

                      <h4 className="text-base text-gray-350 font-semibold mb-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-200 font-normal">
                        The first question of course was, how to get dry again:
                        they had a meeting about this, and after a few
                        minutes...
                      </p>
                    </div>
                  </div>
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
    </div>
  );
}

export default ArticleTab;
