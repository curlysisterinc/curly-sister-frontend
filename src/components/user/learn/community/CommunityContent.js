/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthRoutes } from "constants";
import learn from "api/learn";
import gradientAvatar from "../../../../assets/images/gradient-avatar.svg";
import reply from "../../../../assets/images/reply.svg";
import ellipses from "../../../../assets/images/dark-ellipses.svg";
import bgBookmark from "../../../../assets/images/bg-bookmark.svg";
import serena from "../../../../assets/images/serena.png";
import pix1 from "../../../../assets/images/pix1.png";
import pix7 from "../../../../assets/images/pix7.png";
import pix8 from "../../../../assets/images/pix8.png";
import bookmark from "../../../../assets/images/book-mark.png";
import trash from "../../../../assets/images/trash.svg";
import edit from "../../../../assets/images/edit.svg";
import report from "../../../../assets/images/report.svg";
import backArrow from "../../../../assets/images/back-arrow.svg";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import {
  AiTwotoneDislike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import useGetOneQuestion from "hooks/data/learn/useGetOneQuestion";
import Loader from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import moment from "moment";
import QuestionMoreOptionDropDown from "./QuestionMoreOptionDropDown";
import AskQuestionModal from "./AddQuestionModal";

function CommunityContent() {
  const navigate = useNavigate();
  const { token } = useParams();

  const { state } = useLocation();

  const [questionDropdown, setQuestionDropdown] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);
  const [replyComment, setReplyComment] = useState(false);
  const [getQuestion, setGetQuestion] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  const [pinQuestion, setPinQuestion] = useState(true);
  const [commentValue, setCommentValue] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [getComments, setGetComments] = useState([]);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const {
    isLoading: isQuestionLoading,
    data: questionData,
    refetch: refetchQuestion,
    error: questionDataError,
  } = useGetOneQuestion(token);

  useEffect(async () => {
    const ac = new AbortController();
    if (questionData) {
      console.log(questionData);
      setGetQuestion(questionData.data.data);
    }

    return function cleanup() {
      ac.abort();
    };
  }, [questionData]);

  useEffect(() => {
    const ac = new AbortController();

    learn
      .GetCommentForQuestion(token)
      .then((response) => {
        setGetComments(response.data.data);
      })
      .catch((error) => {});

    return function cleanup() {
      ac.abort();
    };
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    learn
      .CommentOnQuestion(token, commentValue)
      .then((response) => {
        setCommentValue("");
      })
      .catch((error) => {});
  };
  const handleSubmitReply = (e) => {
    e.preventDefault();

    learn
      .ReplyCommentOnArticle(token, replyValue)
      .then((response) => {
        setReplyValue("");
      })
      .catch((error) => {});
  };

  const handleArticleReactionLike = () => {
    setIsLiked(true);
    if (isLiked) {
      setIsLiked(false);
    }

    learn
      .ReactToQuestion(token, "like")
      .then((response) => {})
      .catch((error) => {});
  };

  const handleArticleReactionDisLike = () => {
    setIsDisLiked(true);
    if (isDisLiked) {
      setIsDisLiked(false);
    }

    learn
      .ReactToQuestion(token, "unlike")
      .then((response) => {})
      .catch((error) => {});
  };
  return (
    <div className="max-w-1111 bg-white px-3 md:px-5 lg:px-10 py-8 pt-20 md:pt-12 w-full  m-auto">
      <div
        onClick={() => navigate("/learn/communities")}
        className="flex items-center mb-4 cursor-pointer text-sm text-gray-300"
      >
        <img src={backArrow} alt="go back" className="mr-4" />
        Go Back
      </div>

      {isQuestionLoading && <Loader />}
      {questionDataError && <ErrorDisplayComponent refetch={refetchQuestion} />}
      {questionData && (
        <div className="mx-auto max-w-678">
          <div className="">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-400 font-BeatriceSemiBold text-2xl">
                {getQuestion?.title
                  ? getQuestion?.title
                  : getQuestion?.question}
              </h3>
              <div className="">
                <img src={bgBookmark} alt="" />
              </div>
            </div>

            <div className="flex items-center mb-4 relative">
              <p className="text-sm text-gray-200 flex items-center">
                {getQuestion?.created_by?.firstName}{" "}
                {getQuestion?.created_by?.lastName} ·{" "}
                {moment(getQuestion?.createdAt).format("DD MMM YYYY")}
              </p>
              <QuestionMoreOptionDropDown
                question={getQuestion}
                openEditQuestionModal={() => setIsQuestionModalOpen(true)}
                isPinned={!!state?.isPinned}
              />

              {isQuestionModalOpen ? (
                <AskQuestionModal
                  getQuestions={getQuestion}
                  // setGetQuestions={setGetQuestions}
                  handleClose={() => setIsQuestionModalOpen(false)}
                />
              ) : null}
            </div>

            <p className="text-gray-400 text-base leading-6">
              {getQuestion?.question}
            </p>
          </div>

          <hr className="w-full border border-gray-250 my-10" />
          <div className="">
            <div className="">
              <div className="flex items-center">
                <img src={gradientAvatar} alt="" className="h-10 w-10 mr-5" />
                <div className="relative w-full">
                  <input
                    type="text"
                    value={commentValue}
                    name="comment"
                    id="comment"
                    onChange={(e) => setCommentValue(e.target.value)}
                    placeholder="Add your comment"
                    className="w-full border h-46 rounded-xl border-gray-800 3 placeholder:text-gray-70 text-gray-400 text-sm"
                  />
                  {commentValue.length ? (
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
              {getQuestion?.comments &&
                getQuestion?.comments?.map((element) => {
                  return (
                    <div className="mt-8" key={element._id}>
                      <div className="flex items-start">
                        <img
                          className="h-10 w-10 mt-2"
                          src={gradientAvatar}
                          alt=""
                        />
                        <div className="ml-5 text-sm text-gray-400">
                          <div className="flex items-center">
                            <p className="mr-3">Serena Williams</p>
                            <span className="text-gray-200 text-xs ">
                              3 mins ago
                            </span>
                          </div>
                          <p className="mt-3 leading-6">{element.comment}</p>
                          <div className="flex space-x-4 mt-4 items-center">
                            <div className="flex">
                              <span
                                className="mr-2 items-center"
                                onClick={() => setIsLiked(!isLiked)}
                              >
                                {!isLiked ? (
                                  <AiOutlineLike color="#8E8695" />
                                ) : (
                                  <AiTwotoneLike color="#8E8695" />
                                )}
                              </span>
                              <p>{element.likes.length}</p>
                            </div>
                            <div className="flex items-center">
                              <span
                                className="mr-2"
                                onClick={() => setIsDisLiked(!isDisLiked)}
                              >
                                {!isDisLiked ? (
                                  <AiOutlineDislike color="#8E8695" />
                                ) : (
                                  <AiTwotoneDislike color="#8E8695" />
                                )}
                              </span>

                              <p>{element.unlikes.length}</p>
                            </div>
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
                              <img
                                className="cursor-pointer"
                                src={ellipses}
                                alt=""
                              />
                              {reportDropdown ? (
                                <div className="absolute top-4 left-0 bg-white w-44 rounded-2xl shadow-md p-3">
                                  <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm">
                                    <img
                                      src={report}
                                      alt="report"
                                      className="mr-3"
                                    />
                                    Report
                                  </div>
                                </div>
                              ) : null}
                            </span>
                            <span
                              onClick={() => setReplyComment(true)}
                              className="text-purple-100 cursor-pointer"
                            >
                              {element?.replies?.length} replies
                            </span>
                          </div>
                          {replyComment ? (
                            <div className="m-6 flex items-center">
                              <img
                                src={gradientAvatar}
                                alt=""
                                className="h-10 w-10"
                              />
                              <div className="relative w-full">
                                <input
                                  type="text"
                                  value={replyValue}
                                  name="comment"
                                  id="comment"
                                  onChange={(e) =>
                                    setReplyValue(e.target.value)
                                  }
                                  placeholder="Reply comment"
                                  className="ml-5 w-300 border h-46 rounded-xl border-gray-800 3 placeholder:text-gray-400 text-gray-400 text-sm"
                                />
                                {replyValue.length ? (
                                  <button
                                    type="button"
                                    onClick={handleSubmitReply}
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
                  );
                })}
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
      )}
    </div>
  );
}

export default CommunityContent;
