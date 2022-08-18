/* eslint-disable prefer-const */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "../../footer/footer";
import allyn from "../../../assets/images/allyn-antoine.png";
// import curly1 from "../../assets/images/curly-sister.png";
import serena from "../../../assets/images/serena.png";
import learn from "../../../api/learn";
import admin from "../../../api/admin";
import pix1 from "../../../assets/images/pix1.png";
import pix2 from "../../../assets/images/pix2.png";
import pix3 from "../../../assets/images/pix3.png";
import play from "../../../assets/images/play-btn.svg";
import more from "../../../assets/images/there's-more.png";
import course from "../../../assets/images/course-bg.png";
import bookmark from "../../../assets/images/book-mark.png";
import bookmarkfilled from "../../../assets/images/bookmark-filled.png";
import { NonAuthRoutes } from "../../../constants";
import moment from "moment";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import ReactPlayer from "react-player";
import Loader from "../../loader-component/loader";

function AllTab() {
  const navigate = useNavigate();
  const [getQuestions, setGetQuestions] = useState([]);
  const [saveQst, setSaveQst] = useState(false);
  const [getVideos, setGetVideos] = useState([]);
  const [getArticles, setGetArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const ac = new AbortController();
    const details = localStorage.getItem("user");
    if (details) {
      setIsLoggedIn(true);
    }
    return function cleanup() {
      ac.abort();
    };
  }, []);
  console.log("console.log");
  useEffect(() => {
    const ac = new AbortController();
    learn
      .GetAllQuestions()
      .then((response) => {
        console.log(response.data.data);
        setIsLoading(false);
        setGetQuestions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetAllVideos()
      .then((response) => {
        console.log(response.data.data, "Success");
        setIsLoading(false);
        setGetVideos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetAllArticles()
      .then((response) => {
        console.log(response.data.data, "Success");
        setIsLoading(false);

        setGetArticles(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);

        console.log(error);
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();

    learn
      .GetVideoByCategories()
      .then((response) => {
        setIsLoading(false);
        console.log(response.data.data, "video category");
      })
      .catch((error) => {
        console.log(error);
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <div>
      <div className="flex mt-20 mb-10 items-center justify-between">
        <h2 className="text-gray-400 text-2xl font-semibold">Popular videos</h2>
        {getVideos.length > 0 && (
          <Link
            to={NonAuthRoutes.videos}
            className="text-purple-100 text-sm font-normal"
          >
            View all videos
          </Link>
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {getVideos.length > 0 ? (
            <div>
              <div className="grid grid-cols-3 gap-6">
                {getVideos.slice(0, 3).map((video) => {
                  return (
                    <div
                      key={video._id}
                      className="relative col-1 h-80 overflow-hidden rounded-lg"
                    >
                      <ReactPlayer
                        url={video.link}
                        onStart={() => {
                          isLoggedIn
                            ? navigate(`/learn/video/${video._id}`)
                            : navigate(NonAuthRoutes.login);
                        }}
                        light={true}
                        controls={false}
                        width="100%"
                        height="100%"
                      />
                      {/* <img
                  src={video.link}
                  alt="allyn"
                  className="w-full h-full relative"
                /> */}
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-400 rounded-2xl" />
                      <img
                        onClick={() => {
                          isLoggedIn
                            ? navigate(`/learn/video/${video._id}`)
                            : navigate(NonAuthRoutes.login);
                        }}
                        src={play}
                        alt="play"
                        className="mx-auto cursor-pointer z-2 absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
                      />
                      <div className="absolute top-0 right-0 mr-4 mt-4 ">
                        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
                          {video.number_of_saves.length > 0 ? (
                            <MdOutlineBookmarkBorder color="white" />
                          ) : (
                            <MdBookmark color="white" />
                          )}
                        </span>
                      </div>

                      <div className="absolute top-0 left-0 mt-4 ml-4 bg-gray-400 bg-opacity-50 rounded-xl">
                        <p className="py-1 px-2 text-xs text-white font-normal leading-5">
                          3.05
                        </p>
                      </div>
                      <div className="absolute bottom-0 mb-4 ml-4">
                        <h5 className="text-white text-base font-semibold">
                          {video.title}
                        </h5>
                        <p className="text-white text-opacity-50 text-sm font-normal">
                          {video.created_by.firstName}{" "}
                          {video.created_by.lastName} · {video.number_of_views}{" "}
                          views · {moment(video.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h3 className="text-center text-black text-xl font-BeatriceSemiBold">
              No content added
            </h3>
          )}
        </div>
      )}
      <div className="flex mt-20 mb-10 items-center justify-between">
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
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {getArticles.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {getArticles.slice(0, 3).map((article) => {
                return (
                  <div
                    key={article._id}
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
                        {article.created_by.firstName}{" "}
                        {article.created_by.lastName} ·{" "}
                        {article.number_of_views} views ·{" "}
                        {moment(article.createdAt).fromNow()}
                      </p>

                      <h2
                        onClick={() => {
                          isLoggedIn
                            ? navigate(`/learn/article/${article._id}`)
                            : navigate(NonAuthRoutes.login);
                        }}
                        className="text-base cursor-pointer text-gray-400 font-semibold mb-2"
                      >
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-200 font-normal">
                        {article.description}
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
      <div className="flex mt-20 mb-10 items-center justify-between">
        <h2 className="text-gray-400 text-2xl font-semibold">
          Latest from community
        </h2>
        {getQuestions.length > 0 && (
          <Link
            to={NonAuthRoutes.communities}
            className="text-purple-100 text-sm font-normal"
          >
            View all questions
          </Link>
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {getQuestions.length > 0 ? (
            <div className="flex flex-col">
              {getQuestions.slice(0, 3).map((question) => {
                return (
                  <div
                    key={question._id}
                    className="cursor-pointer flex mb-5 align-center justify-between border-gray-100 rounded-md shadow p-4"
                  >
                    <div className="flex">
                      <img src={serena} alt="serena" />
                      <div className="flex flex-col ml-4">
                        <h4
                          onClick={() => {
                            isLoggedIn
                              ? navigate(`/learn/communities/${question._id}`)
                              : navigate(NonAuthRoutes.login);
                          }}
                          className="text-base font-semibold mb-2 text-gray-400"
                        >
                          {question.question}
                        </h4>
                        <div className="flex">
                          <h4 className="text-sm text-gray-400 font-normal">
                            {question.created_by.name}
                          </h4>
                          <p className="ml-2 text-gray-200 font-normal text-sm">
                            {question.comments.length} comments ·{" "}
                            {question.createdAt
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join(" ")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="-space-x-6 mr-4">
                        <img
                          src={pix1}
                          alt="pix1"
                          className="relative z-10 inline object-cover w-10 h-10"
                        />
                        <img
                          src={pix2}
                          alt="pix2"
                          className="relative z-20 inline object-cover w-10 h-10"
                        />
                        <img
                          src={pix3}
                          alt="pix3"
                          className="relative z-30 inline object-cover w-10 h-10"
                        />
                      </div>
                      <div className="" onClick={() => setSaveQst(!saveQst)}>
                        {saveQst ? (
                          <img
                            src={bookmarkfilled}
                            alt="bookmark"
                            className=""
                          />
                        ) : (
                          <img src={bookmark} alt="bookmark" className="" />
                        )}
                      </div>
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
      <div className="grid grid-cols-2 gap-6 my-20 h-auto">
        <div className="bg-orange-50 border border-orange-150 h-full rounded-xl relative">
          <div className="flex flex-col h-full justify-center relative">
            <div className="w-2/3 pl-10">
              <h2 className="text-gray-400 text-2xl font-bold mb-2">
                There's more
              </h2>
              <p className="text-gray-200 text-sm font-normal">
                It was high time to go, for the pool was getting quite crowded
              </p>
              <a
                href="/"
                className="text-white inline-block rounded-3xl bg-gray-400 text-sm font-semibold px-4 py-2 mt-3"
              >
                Visit blog
              </a>
            </div>
            <div className="w-1/2 absolute right-0 h-full">
              <img
                src={more}
                alt="shocked woman"
                className="w-full object-cover h-full "
              />
            </div>
          </div>
        </div>
        <div className="bg-purple-200 rounded-xl relative">
          <div className="flex flex-col h-full justify-center relative py-10">
            <div className="w-55 pl-10">
              <h2 className="text-white text-2xl font-bold leading-9 mb-2">
                Here&#39;s the name of the course
              </h2>
              <p className="text-white text-opacity-80 text-sm font-normal">
                Luckily for her, the little magic bottle had now had its effect
              </p>
              <a
                href="/"
                className="text-white inline-block rounded-3xl bg-purple-100 text-sm font-semibold px-4 py-2 mt-3"
              >
                View courses
              </a>
            </div>
            <div className="w-1/2 absolute right-0 h-full">
              <img
                src={course}
                alt="shocked woman"
                className="w-full object-cover h-full "
              />
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default AllTab;
