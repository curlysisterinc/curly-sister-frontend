/* eslint-disable no-shadow */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthRoutes } from "../../../../constants";
import ReactPlayer from "react-player";
import learn from "../../../../api/learn";
import imagineHairVideo from "../../../../assets/images/imagine-video.png";
import gradientAvatar from "../../../../assets/images/gradient-avatar.svg";
import reply from "../../../../assets/images/reply.svg";
import ellipses from "../../../../assets/images/dark-ellipses.svg";
import backArrow from "../../../../assets/images/back-arrow.svg";
import trash from "../../../../assets/images/trash.svg";
import edit from "../../../../assets/images/edit.svg";
import report from "../../../../assets/images/report.svg";
import {
  AiTwotoneDislike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import VideoCommentSection from "./VideoCommentSection";
import useGetCommentForVideo from "hooks/data/learn/useGetCommentForVideo";
import useDeleteVideo from "hooks/data/learn/useDeleteVideo";
import useGetOneVideo from "hooks/data/learn/useGetOneVideo";
import ContentOptionDropDown from "../ContentOptionDropDown";
import { formartCount, getRandomInt } from "utils";
import dayjs from "dayjs";
import { Loadersmall } from "components/loader-component/loader";
import useSaveVideo from "hooks/data/learn/useSaveVideo";
import useDeleteSavedVideo from "hooks/data/learn/useDeleteSavedVideo";
import useReactToContent from "hooks/data/learn/useReactToContent";
import { VideoItem } from "./VideoItem";
import useGetAllVideos from "hooks/data/admin/useGetAllVideos";
import { queryClient } from "App";

// import useCommentOnVideo from "hooks/data/learn/useCommentOnVideo";

function VideoContent() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [getVideos, setGetVideos] = useState({});
  const [getComments, setGetComments] = useState([]);
  const [moreVideo, setMoreVideo] = useState(null);

  const {
    isLoading: isDeleteVideoLoading,
    data: deleteVideoData,
    mutate: deleteVideo,
  } = useDeleteVideo(token);

  const {
    isLoading: isVideoLoading,
    data: videoData,
    error: videoError,
    refetch: refetchVideo,
  } = useGetOneVideo(token);
  const {
    isLoading: isCommentForVideoLoading,
    data: commentForVideoData,
    error: commentForVideoError,
    refetch: refetchCommentForVideo,
  } = useGetCommentForVideo(token);

  const {
    isLoading: isReactionLoading,
    data: reactionData,
    mutate: reactToVideos,
    error: reactionDataError,
  } = useReactToContent(token, "videos");

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
    if (videosData && videoData) {
      const data = queryClient.getQueryData(["videos"]);
      if (data?.pages) {
        const currentData = data?.pages[0]?.data?.video ?? {};
        const int = getRandomInt(1, currentData.length);
        const testvideo = currentData[int];
        if (testvideo._id === getVideos._id && currentData[int + 1]) {
          setMoreVideo(currentData[int + 1]);
        } else if (testvideo._id === getVideos._id && currentData[int - 1]) {
          setMoreVideo(currentData[int - 1]);
        } else {
          setMoreVideo(currentData[int]);
        }
      }
    }
  }, [videosData, videoData, getVideos]);

  useEffect(() => {
    if (deleteVideoData) {
      navigate("/dashboard/content");
    }
  }, [deleteVideoData]);

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  useEffect(() => {
    if (videoData) {
      setGetVideos(videoData.data.data);
    }
  }, [videoData]);

  useEffect(() => {
    if (commentForVideoData) {
      setGetComments(commentForVideoData.data.data);
    }
  }, [commentForVideoData]);

  const handleVideoReactionLike = () => {
    reactToVideos({ contentId: token, reaction: "like" });
  };

  const handleVideoReactionDisLike = () => {
    reactToVideos({ contentId: token, reaction: "unlike" });
  };

  const {
    isLoading: isSavedVideoLoading,
    data: SavedVideoData,
    mutate: SaveVideo,
  } = useSaveVideo(getVideos._id);

  const {
    isLoading: isDeleteSavedVideoLoading,
    data: deleteSavedVideoData,
    mutate: deleteSavedVideo,
  } = useDeleteSavedVideo(getVideos._id);

  const handleClickBookmarkButton = (e) => {
    e.stopPropagation();
    if (!getVideos.is_saved) {
      SaveVideo();
    } else {
      deleteSavedVideo();
    }
  };

  const isSavingsLoading = isSavedVideoLoading || isDeleteSavedVideoLoading;

  return (
    <div className="bg-white px-10 py-8 pt-20 md:pt-12 w-full max-w-1111 m-auto">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center mb-10 cursor-pointer text-sm text-gray-300"
      >
        <img src={backArrow} alt="go back" className="mr-4" />
        Go Back
      </div>

      <div className="w-full h-auto rounded-2xl overflow-hidden">
        <div>
          <ReactPlayer
            controls
            url={getVideos.link}
            width="100%"
            height="500px"
          />
        </div>
        {/* <img className="w-full h-full object-cover" src={wideVideo} alt="" /> */}
      </div>
      <div className="mt-8">
        <div className="flex justify-between space-x-5 items-start">
          <div className="w-9/12">
            <h3 className="text-gray-400 font-BeatriceSemiBold text-2xl mb-6">
              {getVideos.title}
            </h3>
            <div className="flex items-center mb-4 relative">
              <p className="text-sm text-gray-200 flex items-center">
                {getVideos?.created_by?.firstName}{" "}
                {getVideos?.created_by?.lastName} ·{" "}
                {formartCount(getVideos?.number_of_views)} views ·{" "}
                {dayjs(getVideos?.createdAt).format("DD MMM YYYY")}
              </p>
              <ContentOptionDropDown
                content={getVideos}
                openEditContentModal={() =>
                  navigate(`/edit-video/${getVideos._id}`)
                }
                deleteContent={deleteVideo}
                isContentDeleting={isDeleteVideoLoading}
              />
            </div>
            <p className="text-base mt-5 text-gray-400 leading-7">
              {getVideos.description}
            </p>
          </div>
          <div className="flex space-x-7">
            <span
              className="rounded-full p-2 bg-gray-200"
              onClick={handleVideoReactionLike}
            >
              {getVideos.is_liked ? (
                <AiTwotoneLike color="white" />
              ) : (
                <AiOutlineLike color="white" />
              )}
            </span>
            <span
              className="rounded-full p-2 bg-gray-200"
              onClick={handleVideoReactionDisLike}
            >
              {getVideos.is_unLiked ? (
                <AiTwotoneDislike color="white" />
              ) : (
                <AiOutlineDislike color="white" />
              )}
            </span>
            <button
              className="rounded-full p-2 bg-gray-200"
              type="button"
              onClick={handleClickBookmarkButton}
            >
              {isSavingsLoading && (
                <div className="h-4 w-4 flex justify-center items-center">
                  <Loadersmall />
                </div>
              )}

              {!isSavingsLoading &&
                (!getVideos.is_saved ? (
                  <MdOutlineBookmarkBorder color="white" />
                ) : (
                  <MdBookmark color="white" />
                ))}
            </button>
          </div>
        </div>
        <hr className="w-full border border-gray-250 my-10" />
        <div className="flex justify-between space-x-8 items-start">
          <div className="w-8/12">
            <VideoCommentSection />
          </div>

          {moreVideo && (
            <div className="w-4/12">
              More Videos
              <VideoItem video={moreVideo} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoContent;
