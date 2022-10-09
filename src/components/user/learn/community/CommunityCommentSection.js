import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import {
  AiTwotoneDislike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import learn from "api/learn";
import ReactTextareaAutosize from "react-textarea-autosize";
import useGetCommentForQuestion from "hooks/data/learn/useGetCommentForQuestion";
import useCommentOnQuestion from "hooks/data/learn/useCommentOnQuestion";
import useReactToComment from "hooks/data/learn/useReactToComment";
import { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { useAuthContext } from "redux/auth";
import gradientAvatar from "../../../../assets/images/gradient-avatar.svg";
import trash from "../../../../assets/images/trash.svg";
import edit from "../../../../assets/images/edit.svg";
import report from "../../../../assets/images/report.svg";
import reply from "../../../../assets/images/reply.svg";
import ellipses from "../../../../assets/images/dark-ellipses.svg";

dayjs.extend(relativeTime);

function CommunityCommentSection() {
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    state: { _id },
  } = useAuthContext();

  const { state } = useLocation();

  const [comments, setGetComments] = useState([]);
  const [questionDropdown, setQuestionDropdown] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);
  const [replyComment, setReplyComment] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [pinQuestion, setPinQuestion] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const {
    isLoading: isQuestionCommentLoading,
    data: questionCommentData,
    refetch: refetchQuestionComment,
    error: questionCommentDataError,
  } = useGetCommentForQuestion(token);

  const {
    isLoading: isCommentOnQuestionLoading,
    data: commentOnQuestionData,
    mutate: commentOnQuestion,
    error: commentOnQuestionDataError,
  } = useCommentOnQuestion(token);

  const {
    isLoading: isReactionLoading,
    data: reactionData,
    mutate: reactToComment,
    error: reactionDataError,
  } = useReactToComment(token);

  useEffect(async () => {
    const ac = new AbortController();
    if (questionCommentData) {
      setGetComments(questionCommentData.data.data);
    }

    return function cleanup() {
      ac.abort();
    };
  }, [questionCommentData]);

  useEffect(async () => {
    const ac = new AbortController();
    if (commentOnQuestionData) {
      setCommentValue("");
    }
    return function cleanup() {
      ac.abort();
    };
  }, [commentOnQuestionData]);

  const handleQuestionReaction = (id, reaction) => {
    reactToComment({ commentId: id, reaction });
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    commentOnQuestion(commentValue);
  };

  const displayLikeIcon = useCallback(
    (item) => {
      if (item.likes.includes(_id)) {
        return <AiTwotoneLike color="#8E8695" />;
      }
      return <AiOutlineLike color="#8E8695" />;
    },
    [comments]
  );

  const displayDisLikeIcon = useCallback(
    (item) => {
      if (item.unlikes.includes(_id)) {
        return <AiTwotoneDislike color="#8E8695" />;
      }
      return <AiOutlineDislike color="#8E8695" />;
    },
    [comments]
  );

  return (
    <>
      {questionCommentDataError && (
        <ErrorDisplayComponent refetch={refetchQuestionComment} />
      )}
      <div className="flex items-center justify-center mb-6">
        {isQuestionCommentLoading && <Loadersmall />}
      </div>

      {questionCommentData && (
        <div className="">
          <div className="">
            <div className="flex items-center">
              <img src={gradientAvatar} alt="" className="h-10 w-10 mr-5" />
              <div className="relative w-full">
                <ReactTextareaAutosize
                  value={commentValue}
                  name="comment"
                  id="comment"
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Add your comment"
                  className="w-full border rounded-xl border-gray-800 py-3 placeholder:text-gray-700 text-gray-400 text-sm resize-none pr-16"
                  // minRows={2}
                  maxRows={3}
                />
                {commentValue.length ? (
                  <button
                    type="button"
                    onClick={handleSubmitComment}
                    className="disabled:text-gray-300 border-0 outline-0 text-sm text-purple-100 cursor-pointer absolute right-5 top-3"
                  >
                    {isCommentOnQuestionLoading ? <Loadersmall /> : "post"}
                  </button>
                ) : null}
              </div>
            </div>

            {comments?.map((item) => {
              return (
                <div className="mt-8" key={item._id}>
                  <div className="flex items-start">
                    <img
                      className="h-10 w-10 mt-2"
                      src={gradientAvatar}
                      alt=""
                    />
                    <div className="ml-5 text-sm text-gray-400 w-full">
                      <div className="flex items-center">
                        <p className="mr-3">{`${
                          item?.created_by?.firstName ?? ""
                        } ${item?.created_by?.lastName ?? ""}`}</p>
                        <span className="text-gray-200 text-xs ">
                          {dayjs().to(dayjs(item.createdAt))}
                        </span>
                      </div>
                      <p className="mt-3 leading-6 break-all">{item.comment}</p>
                      <div className="flex space-x-4 mt-4 items-center">
                        <div className="flex">
                          <button
                            type="button"
                            className="mr-2 items-center"
                            onClick={() =>
                              handleQuestionReaction(item._id, "like")
                            }
                          >
                            {displayLikeIcon(item)}
                          </button>
                          <p>{item.likes.length}</p>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="mr-2"
                            onClick={() =>
                              handleQuestionReaction(item._id, "unlikes")
                            }
                          >
                            {displayDisLikeIcon(item)}
                          </button>

                          <p>{item.unlikes.length}</p>
                        </div>
                        {/* <button
                          type="button"
                          onClick={() => setReplyComment(!replyComment)}
                        >
                          <img className="cursor-pointer" src={reply} alt="" />
                        </button> */}
                        {/* <button
                          type="button"
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
                        </button> */}
                        {/* <button
                          type="button"
                          onClick={() => setReplyComment(true)}
                          className="text-purple-100 cursor-pointer"
                        >
                          {item?.replies?.length} replies
                        </button> */}
                      </div>
                      {/* {replyComment ? (
                        <div className="m-6 flex items-center">
                          <img
                            src={gradientAvatar}
                            alt=""
                            className="h-10 w-10"
                          />
                          <div className="relative w-full">
                            <ReactTextareaAutosize
                              value={replyValue}
                              name="comment"
                              id="comment"
                              onChange={(e) => setReplyValue(e.target.value)}
                              placeholder="Replysss comment"
                              className="ml-5 w-full border rounded-xl border-gray-800 py-3 placeholder:text-gray-700 text-gray-400 text-sm resize-none pr-16 "
                              // minRows={2}
                              maxRows={3}
                            />
                            {replyValue.length ? (
                              <button
                                type="button"
                                onClick={handleSubmitReply}
                                className="disabled:text-gray-300 border-0 outline-0 text-sm text-purple-100 cursor-pointer absolute right-0 top-3"
                              >
                                {isCommentOnQuestionLoading ? (
                                  <Loadersmall />
                                ) : (
                                  "post"
                                )}
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ) : null} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default CommunityCommentSection;
