/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../../api/admin";

// import allyn from "../../assets/images/allyn-antoine.png";
// import phoebe from "../../assets/images/phoebe-ash.png";
// import san from "../../assets/images/san-junipero.png";
// import bookmark from "../../assets/images/book-mark.png";
// import bookmarkfilled from "../../assets/images/bookmark-filled.png";
// import play from "../../assets/images/play-btn.svg";
import videos from "./videoData";
import LearnTabComponent from "./learnTabComponent";
import videoThumbnail from "../../../assets/images/san-junipero.png";
import allyn from "../../../assets/images/allyn-antoine.png";
import play from "../../../assets/images/play-btn.svg";
import bookmark from "../../../assets/images/book-mark.png";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import moment from "moment";
import ReactPlayer from "react-player";
import Loader from "../../loader-component/loader";

function VideoTab() {
  const navigate = useNavigate();
  const [getVideos, setGetVideos] = useState([]);
  // const [getVideoCategories, setGetVideoCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);

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
    <div className="my-20">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {getVideos.length > 0 ? (
            <div className="">
              <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
                Hair styling
              </h2>
              <div className=" ">
                <div className="cursor-grab carousel overflow-x-hidden">
                  <div className="grid grid-cols-3 gap-6">
                    {getVideos?.map((video) => {
                      return (
                        <div
                          className="relative col-1 h-80 overflow-hidden rounded-xl"
                          key={video._id}
                        >
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
                          <div className="absolute  top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-400 rounded-2xl" />
                          <img
                            src={play}
                            onClick={() =>
                              navigate(`/learn/video/${video._id}`)
                            }
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
                              15:04
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
              </div>
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

export default VideoTab;
