/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import Iframe from "react-iframe";
import { useNavigate, useParams } from "react-router-dom";
import { AuthRoutes } from "../../constants";
import learn from "../../api/learn";
import wideVideo from "../../assets/images/wide-video.png";
import imagineHairVideo from "../../assets/images/imagine-video.png";
import SideBarComponent from "../sidebar/sidebar";
import gradientAvatar from "../../assets/images/gradient-avatar.svg";
import like from "../../assets/images/like.svg";
import dislike from "../../assets/images/dislike.svg";
import reply from "../../assets/images/reply.svg";
import ellipses from "../../assets/images/dark-ellipses.svg";
import bgLike from "../../assets/images/bg-like.svg";
import bgDislike from "../../assets/images/bg-dislike.svg";
import bgBookmark from "../../assets/images/bg-bookmark.svg";
import backArrow from "../../assets/images/back-arrow.svg";
import trash from "../../assets/images/trash.svg";
import edit from "../../assets/images/edit.svg";
import pin from "../../assets/images/pin.svg";
import report from "../../assets/images/report.svg";

function VideoContent() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [comment, setComment] = useState("");
  const [questionDropdown, setQuestionDropdown] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    learn
      .CommentOnQuestion(token, comment)
      .then((response) => {
        console.log(response);
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="learn" isLoggedIn />
      <div className="ml-80 bg-white px-10 pt-14 w-full">
        <div
          onClick={() => navigate(AuthRoutes.videos)}
          className="flex items-center mb-10 cursor-pointer text-sm text-gray-300"
        >
          <img src={backArrow} alt="go back" className="mr-4" />
          Go Back
        </div>

        <div className="w-full h-auto">
          <img className="w-full h-full object-cover" src={wideVideo} alt="" />
        </div>
        <div className="mt-8">
          <div className="flex justify-between space-x-5 items-start">
            <div className="w-9/12">
              <h3 className="text-gray-400 font-BeatriceSemiBold text-2xl mb-6">
                How to properly color hair
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
                      <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm">
                        <img src={pin} alt="pin" className="mr-3" />
                        <p>Pin</p>
                      </div>
                      <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm my-3">
                        <img src={edit} alt="pin" className="mr-3" />
                        <p>Edit</p>
                      </div>
                      <div className="flex items-center justify-start cursor-pointer text-red-400 text-sm">
                        <img src={trash} alt="pin" className="mr-3" />
                        <p>Delete</p>
                      </div>
                    </div>
                  ) : null}
                </span>
              </p>
              <p className="text-base mt-5 text-gray-400 leading-7">
                This is a quick description of this video if one has been
                provided. She stretched herself up on tiptoe, and peeped over
                the edge of the mushroom, and her eyes immediately met those of
                a large blue caterpillar.
              </p>
            </div>
            <div className="flex space-x-7">
              <img src={bgLike} alt="" />
              <img src={bgDislike} alt="" />
              <img src={bgBookmark} alt="" />
            </div>
          </div>
          <hr className="w-full border border-gray-250 my-10" />
          <div className="flex justify-between space-x-8 items-start">
            <div className="w-8/12">
              <div className="flex items-center">
                <img src={gradientAvatar} alt="" className="h-10 w-10" />
                <div className="relative w-full">
                  <input
                    type="text"
                    value={comment}
                    name="comment"
                    id="comment"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your comment"
                    className="ml-5 w-full border h-46 rounded-xl border-gray-800 3 placeholder:text-gray-70 text-gray-400 text-sm"
                  />
                  {comment.length ? (
                    <button
                      type="button"
                      onClick={handleSubmitComment}
                      className="disabled:text-gray-300 border-0 outline-0 text-sm text-purple-100 cursor-pointer absolute right-0 top-3"
                    >
                      post
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-start">
                  <img className="h-10 w-10 mt-2" src={gradientAvatar} alt="" />
                  <div className="ml-5 text-sm text-gray-400">
                    <div className="flex items-center">
                      <p className="mr-3">Serena Williams</p>
                      <span className="text-gray-200 text-xs ">3 mins ago</span>
                    </div>
                    <p className="mt-3 leading-6">
                      However, it was over at last, and they sat down again in a
                      ring, and begged the mouse to tell them something more.
                    </p>
                    <div className="flex space-x-4 mt-4 items-center">
                      <div className="flex">
                        <img className="mr-2" src={like} alt="" />
                        120
                      </div>
                      <img className="cursor-pointer" src={dislike} alt="" />
                      <img
                        onClick={() => setOpenReply(!openReply)}
                        className="cursor-pointer"
                        src={reply}
                        alt=""
                      />
                      <span className="relative">
                        <img
                          onClick={() => setReportDropdown(!reportDropdown)}
                          className="cursor-pointer"
                          src={ellipses}
                          alt=""
                        />
                        {reportDropdown ? (
                          <div className="absolute top-4 left-0 bg-white w-44 rounded-2xl shadow-md p-3">
                            <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm">
                              <img src={report} alt="report" className="mr-3" />
                              Report
                            </div>
                          </div>
                        ) : null}
                      </span>
                      {/* <span className="text-purple-100 cursor-pointer">
                        5 replies
                      </span> */}
                    </div>
                    {openReply ? (
                      <div className="m-6 flex items-center">
                        <img
                          src={gradientAvatar}
                          alt=""
                          className="h-10 w-10"
                        />
                        <div className="relative w-full">
                          <input
                            type="text"
                            value={comment}
                            name="comment"
                            id="comment"
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Reply comment"
                            className="ml-5 w-full border h-46 rounded-xl border-gray-800 3 placeholder:text-gray-70 text-gray-400 text-sm"
                          />
                          {comment.length ? (
                            <button
                              type="button"
                              onClick={handleSubmitComment}
                              className="disabled:text-gray-300 border-0 outline-0 text-sm text-purple-100 cursor-pointer absolute right-0 top-3"
                            >
                              post
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
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
    </div>
  );
}

export default VideoContent;
