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
import moment from "moment";
import VideoCommentSection from "./VideoCommentSection";
import useGetCommentForVideo from "hooks/data/learn/useGetCommentForVideo";
// import useCommentOnVideo from "hooks/data/learn/useCommentOnVideo";

function VideoContent() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [replyValue, setReplyValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [questionDropdown, setQuestionDropdown] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);
  const [getVideos, setGetVideos] = useState({});
  const [getComments, setGetComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const ac = new AbortController();

    learn
      .GetOneVideo(token)
      .then((response) => {
        setGetVideos(response.data.data);
      })
      .catch((error) => {});
    return function cleanup() {
      ac.abort();
    };
  }, []);

  const deleteVideoById = () => {
    learn
      .DeleteVideoById(token)
      .then((response) => {
        setGetVideos(response.data.data);
        navigate(-1);
      })
      .catch((error) => {});
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();

    learn
      .CommentOnVideo(token, commentValue)
      .then((response) => {
        setGetComments([response.data.data.comment, ...getComments]);
        setCommentValue("");
      })
      .catch((error) => {});
  };
  const handleSubmitReply = (e) => {
    e.preventDefault();

    learn
      .ReplyCommentOnVideo(token, replyValue)
      .then((response) => {
        setReplyValue("");
      })
      .catch((error) => {});
  };

  const handleVideoReactionLike = () => {
    setIsLiked(true);
    if (isLiked) {
      setIsLiked(false);
    }

    learn
      .ReactToVideo(token, "like")
      .then((response) => {})
      .catch((error) => {});
  };

  const handleVideoReactionDisLike = () => {
    setIsDisLiked(true);
    if (isDisLiked) {
      setIsDisLiked(false);
    }

    learn
      .ReactToVideo(token, "unlike")
      .then((response) => {})
      .catch((error) => {});
  };

  const handleSaveVideo = () => {
    learn
      .SaveVideo({ videoId: token })
      .then((response) => {})
      .catch((error) => {});
  };

  const handleDeleteSavedVideo = () => {
    learn
      .DeleteSavedVideo({ id: token })
      .then((response) => {})
      .catch((error) => {});
  };
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
            <p className="text-sm text-gray-200 flex items-center">
              Allyn Antoine · 9k views · 22 Jan 2022
              <span
                className="ml-5 relative"
                onClick={() => setQuestionDropdown(!questionDropdown)}
              >
                <img className="cursor-pointer" src={ellipses} alt="" />
                {questionDropdown ? (
                  <div className="absolute top-4 left-0 bg-white w-44 rounded-2xl shadow-md p-3">
                    <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm my-3">
                      <img src={edit} alt="pin" className="mr-3" />
                      <p>Edit</p>
                    </div>
                    <div
                      className="flex items-center justify-start cursor-pointer text-red-400 text-sm"
                      onClick={deleteVideoById}
                    >
                      <img src={trash} alt="pin" className="mr-3" />
                      <p>Delete</p>
                    </div>
                  </div>
                ) : null}
              </span>
            </p>
            <p className="text-base mt-5 text-gray-400 leading-7">
              {getVideos.description}
            </p>
          </div>
          <div className="flex space-x-7">
            <span
              className="rounded-full p-2 bg-gray-200"
              onClick={handleVideoReactionLike}
            >
              {!isLiked ? (
                <AiOutlineLike color="white" />
              ) : (
                <AiTwotoneLike color="white" />
              )}
            </span>
            <span
              className="rounded-full p-2 bg-gray-200"
              onClick={handleVideoReactionDisLike}
            >
              {!isDisLiked ? (
                <AiOutlineDislike color="white" />
              ) : (
                <AiTwotoneDislike color="white" />
              )}
            </span>
            <span
              className="rounded-full p-2 bg-gray-200"
              onClick={() => setIsSaved(!isSaved)}
            >
              {!isSaved ? (
                <MdOutlineBookmarkBorder
                  color="white"
                  onClick={handleSaveVideo}
                />
              ) : (
                <MdBookmark color="white" onClick={handleDeleteSavedVideo} />
              )}
            </span>
          </div>
        </div>
        <hr className="w-full border border-gray-250 my-10" />
        <div className="flex justify-between space-x-8 items-start">
          <div className="w-8/12">
            <VideoCommentSection />
          </div>

          <div className="">
            Related Videos
            <img
              onClick={() => navigate(AuthRoutes.videoContent)}
              src={imagineHairVideo}
              alt=""
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoContent;
