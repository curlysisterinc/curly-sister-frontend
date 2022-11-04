import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "components/loader-component/loader";
import useGetAllVideos from "hooks/data/admin/useGetAllVideos";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { queryClient } from "App";
import { useInView } from "react-intersection-observer";
import { VideoItem } from "./VideoItem";

function VideoTab() {
  const [getVideos, setGetVideos] = useState([]);
  const [ref, inView] = useInView();
  const {
    data: videosData,
    isLoading: isVideosLoading,
    error: videosErrror,
    refetch: videosRefetch,
    isFetching: isVideosFetching,
    fetchNextPage: fetchNextVideosPage,
    hasNextPage: hasVideosNextPage,
  } = useGetAllVideos({ size: 10 });

  useEffect(() => {
    if (videosData) {
      const data = queryClient.getQueryData(["videos"]);
      const currentData = data.pages
        .map((item) => item.data.video)
        .flatMap((a) => a);
      setGetVideos(currentData);
    }
  }, [videosData]);

  React.useEffect(() => {
    if (inView) {
      fetchNextVideosPage();
    }
  }, [inView]);

  return (
    <div className="my-10">
      <h2 className="font-BeatriceSemiBold text-2xl mb-8 text-gray-400">
        Hair styling
      </h2>

      {isVideosLoading && <Loader />}
      {videosErrror && <ErrorDisplayComponent refetch={videosRefetch} />}
      {videosData && (
        <>
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
          <div className="my-10">
            {hasVideosNextPage && (
              <div className="loading" ref={ref}>
                <Loader />
              </div>
            )}{" "}
          </div>
        </>
      )}
    </div>
  );
}

export default VideoTab;
