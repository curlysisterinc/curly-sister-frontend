/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../constants";
import admin from "../../api/admin";

// import allyn from "../../assets/images/allyn-antoine.png";
// import phoebe from "../../assets/images/phoebe-ash.png";
// import san from "../../assets/images/san-junipero.png";
// import bookmark from "../../assets/images/book-mark.png";
// import bookmarkfilled from "../../assets/images/bookmark-filled.png";
// import play from "../../assets/images/play-btn.svg";
import videos from "./videoData";
import SideBarComponent from "../sidebar/sidebar";
import LearnTabComponent from "./learnTabComponent";
import videoThumbnail from "../../assets/images/san-junipero.png";
import allyn from "../../assets/images/allyn-antoine.png";
import play from "../../assets/images/play-btn.svg";
import bookmark from "../../assets/images/book-mark.png";

function VideoTab() {
  const navigate = useNavigate();
  const [getVideos, setGetVideos] = useState([]);
  const [getVideoCategories, setGetVideoCategories] = useState([]);

  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetAllVideos()
      .then((response) => {
        console.log(response.data.data, "Success");

        setGetVideos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  // useEffect(async () => {
  //   admin
  //     .GetVideoCategory()
  //     .then((response) => {
  //       console.log(response.data.data, "category");

  //       setGetVideoCategories(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="learn" />
      <div className="ml-80 bg-white px-10 pt-14 w-full">
        <div>
          <LearnTabComponent active="videos" />
        </div>
        <div className="my-20">
          {getVideos.length > 0 ? (
            <>
              <div className="">
                <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
                  Hair styling
                </h2>
                <div className=" ">
                  <div className="cursor-grab carousel overflow-x-hidden">
                    <div className="grid grid-cols-3 gap-6">
                      {getVideos?.map((video) => {
                        return (
                          <div className="relative ">
                            <img
                              src={allyn}
                              alt="allyn"
                              className="w-full h-full relative"
                            />
                            <div className="absolute bg-red-400 top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-400 rounded-2xl" />
                            <img
                              src={play}
                              onClick={() =>
                                navigate(`/learn/video/${video._id}`)
                              }
                              alt="play"
                              className="mx-auto cursor-pointer z-2 absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
                            />
                            <div className="absolute top-0 right-0 mr-4 mt-4 ">
                              <img
                                src={bookmark}
                                alt="bookmark"
                                className="p-2"
                              />
                            </div>

                            <div className="absolute top-0 left-0 mt-4 ml-4 bg-gray-400 bg-opacity-50 rounded-xl">
                              <p className="py-1 px-2 text-xs text-white font-normal leading-5">
                                15:04
                              </p>
                            </div>
                            <div className="absolute bottom-0 mb-4 ml-4">
                              <h5 className="text-white text-base font-semibold">
                                {video.title}
                              </h5>
                              <p className="text-white text-opacity-50 text-sm font-normal">
                                Allyn Antoine · 9k views · 2 weeks ago
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
                  Illustration
                </h2>
                <div className="">
                  <div className="cursor-grab carousel overflow-x-hidden">
                    <div className="grid grid-cols-3 gap-6">
                      {getVideos?.map((video) => {
                        return (
                          <div
                            onClick={() =>
                              navigate(`/learn/video/${video._id}`)
                            }
                            className="relative cursor-pointer"
                          >
                            <img
                              src={allyn}
                              alt="allyn"
                              className="w-full h-full relative"
                            />
                            <div className="absolute bg-red-400 top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-400 rounded-2xl" />
                            <img
                              src={play}
                              alt="play"
                              className="mx-auto z-2 absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
                            />
                            <div className="absolute top-0 right-0 mr-4 mt-4 ">
                              <img
                                src={bookmark}
                                alt="bookmark"
                                className="p-2"
                              />
                            </div>

                            <div className="absolute top-0 left-0 mt-4 ml-4 bg-gray-400 bg-opacity-50 rounded-xl">
                              <p className="py-1 px-2 text-xs text-white font-normal leading-5">
                                15:04
                              </p>
                            </div>
                            <div className="absolute bottom-0 mb-4 ml-4">
                              <h5 className="text-white text-base font-semibold">
                                {video.title}
                              </h5>
                              <p className="text-white text-opacity-50 text-sm font-normal">
                                Allyn Antoine · 9k views · 2 weeks ago
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h3 className="text-center text-black text-xl font-BeatriceSemiBold">
              No content added
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoTab;
