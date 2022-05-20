/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthRoutes } from "../../constants";
import learn from "../../api/learn";
import SideBarComponent from "../sidebar/sidebar";
import gradientAvatar from "../../assets/images/gradient-avatar.svg";
import like from "../../assets/images/like.svg";
import dislike from "../../assets/images/dislike.svg";
import reply from "../../assets/images/reply.svg";
import ellipses from "../../assets/images/dark-ellipses.svg";
import bgBookmark from "../../assets/images/bg-bookmark.svg";
import serena from "../../assets/images/serena.png";
import pix1 from "../../assets/images/pix1.png";
import pix7 from "../../assets/images/pix7.png";
import pix8 from "../../assets/images/pix8.png";
import bookmark from "../../assets/images/book-mark.png";
import trash from "../../assets/images/trash.svg";
import edit from "../../assets/images/edit.svg";
import pin from "../../assets/images/pin.svg";
import report from "../../assets/images/report.svg";
import backArrow from "../../assets/images/back-arrow.svg";

function CommunityContent() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [questionDropdown, setQuestionDropdown] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);
  const [replyComment, setReplyComment] = useState(false);
  const [getQuestion, setGetQuestion] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  const [comment, setComment] = useState("");
  useEffect(async () => {
    learn
      .GetOneQuestion(token)
      .then((response) => {
        setGetQuestion(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          onClick={() => navigate(AuthRoutes.communities)}
          className="flex items-center mb-10 cursor-pointer text-sm text-gray-300"
        >
          <img src={backArrow} alt="go back" className="mr-4" />
          Go Back
        </div>
        <div className="mx-20">
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-400 font-BeatriceSemiBold text-2xl">
                {getQuestion?.question
                  ? getQuestion.question
                  : "How to style hair"}
              </h3>
              <div className="">
                <img src={bgBookmark} alt="" />
              </div>
            </div>
            <p className="text-sm text-gray-200 flex items-center">
              {getQuestion?.created_by?.firstName}{" "}
              {getQuestion?.created_by?.lastName} ·{" "}
              {getQuestion?.createdAt
                ?.split("T")[0]
                .split("-")
                .reverse()
                .join(" ")}
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
            <p className="text-gray-400 text-base leading-6 mt-5">
              This is a sample question asked on the platform. It sounded an
              excellent plan, no doubt, and very neatly and simply arranged; the
              only difficulty was, that she had not the smallest idea how to set
              about it.
            </p>
          </div>

          <hr className="w-full border border-gray-250 my-10" />
          <div className="">
            <div className="">
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
                        className="cursor-pointer"
                        src={reply}
                        alt=""
                        onClick={() => setReplyComment(!replyComment)}
                      />
                      <span
                        className="relative"
                        onClick={() => setReportDropdown(!reportDropdown)}
                      >
                        <img className="cursor-pointer" src={ellipses} alt="" />
                        {reportDropdown ? (
                          <div className="absolute top-4 left-0 bg-white w-44 rounded-2xl shadow-md p-3">
                            <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm">
                              <img src={report} alt="report" className="mr-3" />
                              Report
                            </div>
                          </div>
                        ) : null}
                      </span>
                      <span className="text-purple-100 cursor-pointer">
                        5 replies
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-start">
                  <img className="h-10 w-10 mt-2" src={gradientAvatar} alt="" />
                  <div className="ml-5 text-sm text-gray-400">
                    <div className="flex items-center">
                      <p className="mr-3">Nike Coates</p>
                      <span className="text-gray-200 text-xs">3 days ago</span>
                    </div>
                    <p className="leading-6 mt-3">
                      The next thing was to eat the comfits: this caused some
                      noise and confusion, as the large birds complained that
                      they could not taste theirs, and the small ones choked and
                      had to be patted on the back.
                    </p>
                    <div className="flex space-x-3 items-center mt-4">
                      <div className="flex items-center">
                        <img className="mr-2" src={like} alt="" />
                        120
                      </div>
                      <img className="" src={dislike} alt="" />
                      <img className="" src={reply} alt="" />
                      <span
                        className="relative"
                        onClick={() => setReportDropdown(!reportDropdown)}
                      >
                        <img className="cursor-pointer" src={ellipses} alt="" />
                        {reportDropdown ? (
                          <div className="absolute top-4 left-0 bg-white w-44 rounded-2xl shadow-md p-3">
                            <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm">
                              <img src={report} alt="report" className="mr-3" />
                              Report
                            </div>
                          </div>
                        ) : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <p>Related questions</p>
            <div
              onClick={() => navigate(AuthRoutes.communityContent)}
              className="flex mb-5 align-center justify-between border-gray-100 rounded-md shadow p-4"
            >
              <div className="flex">
                <img src={serena} alt="serena" />
                <div className="flex flex-col ml-4">
                  <h4 className="text-base font-semibold mb-2 text-gray-400">
                    Help, my hair is breaking.
                  </h4>
                  <div className="flex">
                    <h4 className="text-sm text-gray-400 font-normal">
                      Serena Williams
                    </h4>
                    <p className="ml-2 text-gray-200 font-normal text-sm">
                      24 comments · 05 Dec 2021
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="-space-x-6 mr-4">
                  <img
                    src={pix7}
                    alt="pix7"
                    className="relative z-10 inline object-cover w-10 h-10"
                  />
                  <img
                    src={pix8}
                    alt="pix8"
                    className="relative z-20 inline object-cover w-10 h-10"
                  />
                  <img
                    src={pix1}
                    alt="pix1"
                    className="relative z-30 inline object-cover w-10 h-10"
                  />
                </div>
                <div className="">
                  <img src={bookmark} alt="bookmark" className="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityContent;
