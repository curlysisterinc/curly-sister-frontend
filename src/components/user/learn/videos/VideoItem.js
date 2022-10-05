import React from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import { NonAuthRoutes } from "constants";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import moment from "moment";
import play from "../../../../assets/images/play-btn.svg";

export function VideoItem({ video }) {
  const navigate = useNavigate();
  const {
    state: { isSignedIn },
  } = useAuthContext();

  const handleNavigate = (item) => {
    return isSignedIn
      ? navigate(`/learn/video/${item._id}`)
      : navigate(NonAuthRoutes.login);
  };

  return (
    <div
      key={video._id}
      className="relative col-1 h-80 overflow-hidden rounded-lg"
    >
      <ReactPlayer
        url={video.link}
        onStart={() => handleNavigate(video)}
        light
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
      <div
        role="button"
        tabIndex={0}
        onClick={() => handleNavigate(video)}
        onKeyPress={(e) =>
          runFunctionWhenSpaceOrEnterIsClicked(e, handleNavigate(video))
        }
      >
        <img
          src={play}
          alt="play"
          className="mx-auto cursor-pointer z-2 absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
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
        <h5 className="text-white text-base font-semibold">{video.title}</h5>
        <p className="text-white text-opacity-50 text-sm font-normal">
          {video.created_by.firstName} {video.created_by.lastName} ·{" "}
          {video.number_of_views} views · {moment(video.createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
}
