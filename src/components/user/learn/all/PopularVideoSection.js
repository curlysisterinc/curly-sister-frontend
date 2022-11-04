import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NonAuthRoutes } from "constants";
import Loader from "components/loader-component/loader";
import { useAuthContext } from "redux/auth";
import useGetAllVideos from "hooks/data/admin/useGetAllVideos";
import { queryClient } from "App";
import { VideoItem } from "../videos/VideoItem";

export function PopularVideoSection() {
  const [getVideos, setGetVideos] = useState([]);

  const {
    data: videosData,
    isLoading: isVideosLoading,
    error: videosRrror,
    refetch: videosRefetch,
    isFetching: isVideosFetching,
    fetchNextPage: fetchNextVideosPage,
    hasNextPage: hasVideosNextPage,
  } = useGetAllVideos({ size: 10 });

  useEffect(() => {
    if (videosData) {
      const data = queryClient.getQueryData(["videos"]);
      const currentData = data.pages[0].data.video;
      setGetVideos(currentData);
    }
  }, [videosData]);

  return (
    <div className="mb-20">
      <div className="flex mt-10 mb-6 items-center justify-between">
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
      {isVideosLoading ? (
        <Loader />
      ) : (
        <div>
          {getVideos.length > 0 ? (
            <div>
              <div className="grid grid-cols-3 gap-6">
                {getVideos.slice(0, 3).map((video) => {
                  return <VideoItem video={video} />;
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
    </div>
  );
}
