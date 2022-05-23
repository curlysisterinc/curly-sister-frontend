/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../constants";
import admin from "../../api/admin";
import curly1 from "../../assets/images/curly-sister.png";
import oprah from "../../assets/images/oprah-winfrey.png";
import curly2 from "../../assets/images/curly-sister2.png";
import bookmark from "../../assets/images/book-mark.png";
import bookmarkfilled from "../../assets/images/bookmark-filled.png";
import SideBarComponent from "../sidebar/sidebar";
import LearnTabComponent from "./learnTabComponent";

function ArticleTab() {
  const navigate = useNavigate();
  const [getArticles, setGetArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  useEffect(async () => {
    admin
      .GetAllArticles()
      .then((response) => {
        console.log(response.data.data, "Success");

        setGetArticles(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
        <SideBarComponent active="learn" isLoggedIn />

        <div className="ml-80 bg-white px-10 pt-14 w-full">
          <div>
            <LearnTabComponent active="articles" />
          </div>

          <div className="my-20">
            <div>
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
                  <div className="grid grid-cols-3 gap-6">
                    {getArticles.map((article) => {
                      return (
                        <div
                          onClick={() =>
                            navigate(`/learn/article/${article._id}`)
                          }
                          className="bg-white border rounded-2xl border-gray-100 shadow relative"
                        >
                          <img
                            src={curly1}
                            alt="curly-1"
                            className="relative"
                          />
                          <div className="absolute top-0 right-0 mr-4 mt-4 ">
                            <img
                              src={bookmark}
                              alt="bookmark"
                              className="p-2"
                            />
                          </div>
                          <div className="p-4">
                            <h2 className="text-sm text-gray-200 font-normal mb-2">
                              {article.title}
                            </h2>
                            <h4 className="text-base text-gray-400 font-semibold mb-2">
                              7 great tips for refreshing your next day hair
                            </h4>
                            <p className="text-sm text-gray-200 font-normal">
                              The first question of course was, how to get dry
                              again: they had a meeting about this, and after a
                              few minutes...
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "popular" && (
                <div className="mt-8">
                  <div className="grid grid-cols-3 gap-6">
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={curly1} alt="curly-1" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img src={bookmark} alt="bookmark" className="p-2" />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Curly Sister · 07 Mar 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          7 great tips for refreshing your next day hair
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          The first question of course was, how to get dry
                          again: they had a meeting about this, and after a few
                          minutes...
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={oprah} alt="oprah" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img
                          src={bookmarkfilled}
                          alt="bookmark"
                          className="p-2"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Oprah Winfrey · 11 Feb 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          Here&#39;s help for drying your textured hair the
                          right way
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          A speech caused a remarkable sensation among the
                          party. Some of the birds hurried off at once to see...
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={curly2} alt="curly-2" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img src={bookmark} alt="bookmark" className="p-2" />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Curly Sister · 09 Jan 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          Want to go swimming? Here&#39;s all you need to know
                          first
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          It did so indeed, and much sooner than she had
                          expected. Before she had drunk half the bottle, she
                          found...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "recent" && (
                <div className="mt-8">
                  <div className="grid grid-cols-3 gap-6">
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={curly1} alt="curly-1" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img src={bookmark} alt="bookmark" className="p-2" />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Curly Sister · 07 Mar 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          7 great tips for refreshing your next day hair
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          The first question of course was, how to get dry
                          again: they had a meeting about this, and after a few
                          minutes...
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={oprah} alt="oprah" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img
                          src={bookmarkfilled}
                          alt="bookmark"
                          className="p-2"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Oprah Winfrey · 11 Feb 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          Here&#39;s help for drying your textured hair the
                          right way
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          A speech caused a remarkable sensation among the
                          party. Some of the birds hurried off at once to see...
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={curly2} alt="curly-2" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img src={bookmark} alt="bookmark" className="p-2" />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Curly Sister · 09 Jan 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          Want to go swimming? Here&#39;s all you need to know
                          first
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          It did so indeed, and much sooner than she had
                          expected. Before she had drunk half the bottle, she
                          found...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "featured" && (
                <div className="mt-8">
                  <div className="grid grid-cols-3 gap-6">
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={curly1} alt="curly-1" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img src={bookmark} alt="bookmark" className="p-2" />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Curly Sister · 07 Mar 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          7 great tips for refreshing your next day hair
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          The first question of course was, how to get dry
                          again: they had a meeting about this, and after a few
                          minutes...
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={oprah} alt="oprah" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img
                          src={bookmarkfilled}
                          alt="bookmark"
                          className="p-2"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Oprah Winfrey · 11 Feb 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          Here&#39;s help for drying your textured hair the
                          right way
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          A speech caused a remarkable sensation among the
                          party. Some of the birds hurried off at once to see...
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => navigate(AuthRoutes.articleContent)}
                      className="bg-white border rounded-2xl border-gray-100 shadow relative"
                    >
                      <img src={curly2} alt="curly-2" className="relative" />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <img src={bookmark} alt="bookmark" className="p-2" />
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm text-gray-200 font-normal mb-2">
                          Curly Sister · 09 Jan 2022
                        </h2>
                        <h4 className="text-base text-gray-400 font-semibold mb-2">
                          Want to go swimming? Here&#39;s all you need to know
                          first
                        </h4>
                        <p className="text-sm text-gray-200 font-normal">
                          It did so indeed, and much sooner than she had
                          expected. Before she had drunk half the bottle, she
                          found...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleTab;
