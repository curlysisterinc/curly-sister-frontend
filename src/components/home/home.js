/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import profileDp from "../../assets/images/profile-dp.png";
import productRecommendation from "../../assets/images/product-recommendation.png";
import bookMarkIcon from "../../assets/images/book-mark.png";
import curatedProduct from "../../assets/images/curated-product.png";
import arrowIcon from "../../assets/images/arrow.svg";
import pix1 from "../../assets/images/pix1.png";
import pix2 from "../../assets/images/pix2.png";
import pix3 from "../../assets/images/pix3.png";
import play from "../../assets/images/play-btn.svg";
import serena from "../../assets/images/serena.png";
import searchIcon from "../../assets/images/search-normal.svg";
import ReactPlayer from "react-player";
import { useNavigate, Link } from "react-router-dom";
import bookmarkfilled from "../../assets/images/bookmark-filled.png";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import { NonAuthRoutes } from "../../constants";
import moment from "moment";
import Loader from "../loader";
import CommonCard from "../stylistCard";

function UserHome({
  firstName,
  getArticles,
  getVideos,
  isLoggedIn,
  isLoading,
  getStylist,
  getQuestions,
  saveQst,
  setSaveQst,
}) {
  const navigate = useNavigate();

  return (
    <div className="ml-80 bg-white px-10 py-14 w-full">
      <div className="flex flex-col w-full lg:flex-row justify-between items-center">
        <div className="flex justify-start items-center ">
          <img className="mr-3" src={profileDp} alt="profile pix" />
          <div className="">
            <p className="font-semibold text-gray-400 text-lg">
              Hello {firstName} 👋
            </p>
            <p className="text-sm text-gray-200">
              We hope your day is coming along great
            </p>
          </div>
        </div>
        <div className="rounded-full px-3 py-3 relative w-full lg:w-2/5 h-12 mt-6 lg:mt-0 border border-gray-250 flex justify-between items-center">
          <input
            type="text"
            className="border-0 outline-none   h-full w-full"
            placeholder="San Francisco, CA, USA"
          />
          <div className="ml-2 rounded-full bg-orange-200 h-10 w-10 flex justify-center items-center cursor-pointer">
            <img src={searchIcon} alt="Search icon" />
          </div>
        </div>
      </div>

      {/* flexed-content */}
      <div className="grid grid-cols-12 gap-10  mt-10 w-full ">
        {/* left-content */}
        <div className="col-span-8">
          <div className="bg-orange-300 border border-orange-100 rounded-lg p-6">
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-400 text-base">Your upcoming bookings</p>
              <Link
                to="/all-bookings"
                className="text-sm font-bold text-purple-100"
              >
                View all bookings
              </Link>
            </div>
            <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
              <img className="mr-3" src={productRecommendation} alt="circle" />
              <div>
                <p className="font-semibold text-gray-400 text-base">
                  Product recommendation
                </p>
                <p className="text-sm text-gray-200">
                  All Naturals · Fri, 18 Mar · 4:30 PM (GMT +1)
                </p>
              </div>
            </div>
            <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
              <img className="mr-3" src={productRecommendation} alt="circle" />
              <div>
                <p className="font-semibold text-gray-400 text-base">
                  Micro teaching lesson
                </p>
                <p className="text-sm text-gray-200">
                  Curly Helen · Mon, 21 Mar · 06:00 AM (GMT +1)
                </p>
              </div>
            </div>
            <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
              <img className="mr-3" src={productRecommendation} alt="circle" />
              <div>
                <p className="font-semibold text-gray-400 text-base">
                  Consultation
                </p>
                <p className="text-sm text-gray-200">
                  All Naturals · Tue, 22 Mar · 05:00 PM (GMT +1)
                </p>
              </div>
            </div>
          </div>

          {/* popular stylists arund you */}
          <div className="mt-10">
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-400 text-base">
                Popular around you.
                <span className="text-gray-200 pl-3">Interesting stylists</span>
              </p>
              <Link
                to={NonAuthRoutes.stylists}
                className="text-sm font-bold text-purple-100"
              >
                View more
              </Link>
            </div>

            {/* stylists */}
            <div className="grid grid-cols-2 gap-8">
              {getStylist.slice(0, 2).map((item) => {
                return <CommonCard key={item.id} stylist={item} />;
              })}
            </div>

            {/* questions */}
            <div className="mt-10">
              <div className="w-full flex justify-between items-center mb-5">
                <p className="text-gray-400 text-base">New questions</p>
                <Link
                  to={NonAuthRoutes.communities}
                  className="text-sm font-bold text-purple-100"
                >
                  View more
                </Link>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <div>
                  {getQuestions.length > 0 ? (
                    <div className="flex flex-col">
                      {getQuestions.slice(0, 2).map((question) => {
                        return (
                          <div
                            key={question.id}
                            className="cursor-pointer flex mb-5 align-center justify-between border-gray-100 rounded-md shadow p-4"
                          >
                            <div className="flex">
                              <img src={serena} alt="serena" />
                              <div className="flex flex-col ml-4">
                                <h4
                                  onClick={() => {
                                    isLoggedIn
                                      ? navigate(
                                          `/learn/communities/${question._id}`
                                        )
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
                              <div
                                className=""
                                onClick={() => setSaveQst(!saveQst)}
                              >
                                {saveQst ? (
                                  <img
                                    src={bookmarkfilled}
                                    alt="bookmark"
                                    className=""
                                  />
                                ) : (
                                  <img
                                    src={bookMarkIcon}
                                    alt="bookmark"
                                    className=""
                                  />
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
            </div>
          </div>
        </div>

        {/* right-content */}
        <div className="col-span-4">
          {/* videos */}
          <div>
            <div className="mb-8">Trending Videos</div>
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                {getVideos.length > 0 ? (
                  <div>
                    <div className="">
                      {getVideos.slice(0, 1).map((video) => {
                        return (
                          <div className="relative h-64 overflow-hidden rounded-lg">
                            <ReactPlayer
                              url={video.link}
                              onStart={() => {
                                navigate(`/learn/video/${video._id}`);
                              }}
                              light
                              controls={false}
                              width="100%"
                              height="100%"
                            />

                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-400 rounded-2xl" />
                            <img
                              onClick={() => {
                                navigate(`/learn/video/${video._id}`);
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
                                {video.created_by.lastName} ·{" "}
                                {video.number_of_views} views ·{" "}
                                {moment(video.createdAt).fromNow()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <h3 className="text-center text-black text-lg font-BeatriceSemiBold">
                    No content added
                  </h3>
                )}
              </div>
            )}
          </div>

          <div className="border border-gray-50 w-full my-6" />
          {/* products */}
          <div className="mt-3 rounded-lg w-full border bg-orange-150 overflow-hidden border-orange-200 shadow">
            <img src={curatedProduct} alt="trending video" />
            <div className="bg-white p-3">
              <p className="font-BeatriceSemiBold text-base my-3 text-gray-400">
                Our curated products
              </p>
              <p className="text-sm text-gray-200">
                Over 100+ hand selected, trusted items for your hair.
              </p>
              <div className="flex text-orange-200 font-BeatriceSemiBold text-sm mt-3">
                Get them
                <img className="ml-3" src={arrowIcon} alt="arrow icon" />
              </div>
            </div>
          </div>
          <div className="border border-gray-50 w-full my-6 overflow-hidden" />
          {/* articles */}
          <div className="mt-8">
            <p className="mb-8">Continue Learning</p>
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                {getArticles.length > 0 ? (
                  <div className="">
                    {getArticles.slice(0, 1).map((article) => {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
