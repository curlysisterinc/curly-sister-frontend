import React, { useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import { NonAuthRoutes } from "constants";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import * as dayjs from "dayjs";
import useSaveVideo from "hooks/data/learn/useSaveVideo";
import useDeleteSavedVideo from "hooks/data/learn/useDeleteSavedVideo";
import { Loadersmall } from "components/loader-component/loader";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { ReactComponent as PlayIcon } from "../../../../assets/images/play-btn.svg";

dayjs.extend(relativeTime);

export function VideoItem({ video }) {
  const playerRef = useRef();
  const navigate = useNavigate();
  const {
    isLoading: isSavedVideoLoading,
    data: SavedVideoData,
    mutate: SaveVideo,
  } = useSaveVideo(video._id);

  const {
    isLoading: isDeleteSavedVideoLoading,
    data: deleteSavedVideoData,
    mutate: deleteSavedVideo,
  } = useDeleteSavedVideo(video._id);

  const {
    state: { isSignedIn },
  } = useAuthContext();

  const handleNavigate = (item) => {
    return isSignedIn
      ? navigate(`/learn/video/${item._id}`)
      : navigate(NonAuthRoutes.login);
  };

  const handleClickBookmarkButton = (e) => {
    e.stopPropagation();
    if (!video.is_saved) {
      SaveVideo();
    } else {
      deleteSavedVideo();
    }
  };
  const isLoading = isSavedVideoLoading || isDeleteSavedVideoLoading;

  const isData = SavedVideoData || deleteSavedVideoData;

  const handleVideoLink = (videoLink) => {
    if (videoLink.startsWith("//s3")) {
      return `https:${videoLink}`;
    }
    return videoLink;
  };

  const handleVideoThumbnail = (thumbnail) => {
    if (thumbnail?.startsWith("//s3")) {
      return `https:${thumbnail}`;
    }
    return true;
  };

  const handleReadyOption = () => {
    console.log(playerRef.current);
    console.log(playerRef.current.getDuration());
    console.log(playerRef.current.references.player());
  };

  return (
    <div
      role="button"
      key={video._id}
      className="relative col-1 h-234 overflow-hidden rounded-lg cursor-pointer "
      tabIndex={0}
      onClick={() => handleNavigate(video)}
      onKeyPress={(e) =>
        runFunctionWhenSpaceOrEnterIsClicked(e, handleNavigate(video))
      }
    >
      <ReactPlayer
        url={handleVideoLink(video.link)}
        onStart={() => handleNavigate(video)}
        light={handleVideoThumbnail(video.thumbnail)}
        controls={false}
        width="100%"
        height="100%"
        playIcon={<PlayIcon height={27} width={27} fill="red" />}
        // onReady={handleReadyOption}
        ref={playerRef}
      />

      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-purple-200 rounded-2xl
        overflow-hidden"
      />
      <button
        type="button"
        className="absolute top-0 right-0 mr-4 mt-4 z-40"
        onClick={handleClickBookmarkButton}
      >
        <span className="rounded-full p-2 bg-gray-200 opacity-80  flex justify-center items-center">
          {isLoading && (
            <div className="h-4 w-4 flex justify-center items-center">
              <Loadersmall />
            </div>
          )}

          {!isLoading &&
            (video.is_saved ? (
              <MdBookmark color="white" />
            ) : (
              <MdOutlineBookmarkBorder color="white" />
            ))}
        </span>
      </button>

      <div className="absolute top-0 left-0 mt-4 ml-4 bg-gray-400 bg-opacity-50 rounded-xl">
        <p className="py-1 px-2 text-xs text-white font-normal leading-5">
          3.05
        </p>
      </div>
      <div className="absolute bottom-0 mb-4 ml-4">
        <h5 className="text-white text-base font-semibold">{video.title}</h5>
        <p className="text-white text-opacity-50 text-sm font-normal">
          {video?.created_by?.firstName} {video?.created_by?.lastName} ·{" "}
          {video?.number_of_views} views ·{" "}
          {video?.createdAt ? dayjs(video.createdAt).fromNow() : ""}
        </p>
      </div>
    </div>
  );
}
