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
import admin from "../../../../api/admin";

import play from "../../../../assets/images/play-btn.svg";
import moment from "moment";
import ReactPlayer from "react-player";
import Loader from "components/loader-component/loader";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { VideoItem } from "./VideoItem";
import useGetAllVideos from "hooks/data/admin/useGetAllVideos";
import ErrorDisplayComponent from "components/errorDisplayComponent";

function VideoTab() {
  const navigate = useNavigate();
  const [getVideos, setGetVideos] = useState([]);

  const {
    data: videosData,
    isLoading: isVideosLoading,
    error: videosErrror,
    refetch: videosRefetch,
  } = useGetAllVideos();

  useEffect(() => {
    if (videosData) {
      setGetVideos(videosData.data.data);
    }
  }, [videosData]);

  return (
    <div className="my-10">
      <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
        Hair styling
      </h2>

      {isVideosLoading && <Loader />}
      {videosErrror && <ErrorDisplayComponent refetch={videosRefetch} />}
      {videosData && (
        <div>
          {getVideos.length > 0 ? (
            <div className="mt-10">
              <div className="cursor-grab carousel overflow-x-hidden">
                <div className="grid grid-cols-3 gap-6">
                  {getVideos?.map((video) => {
                    return <VideoItem video={video} key={video._id} />;
                  })}
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
