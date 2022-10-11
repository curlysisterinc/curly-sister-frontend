import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
import useReplyToComment from "hooks/data/learn/useReplyToComment";
import useCommentOnQuestion from "hooks/data/learn/useCommentOnQuestion";
import useReactToComment from "hooks/data/learn/useReactToComment";
import { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { useAuthContext } from "redux/auth";
import gradientAvatar from "../../../../assets/images/gradient-avatar.svg";

import CommentBody from "./CommentBody";

dayjs.extend(relativeTime);

function CommunityCommentSection() {
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    state: { _id },
  } = useAuthContext();

  const { state } = useLocation();

  const [comments, setComments] = useState([]);
  const [questionDropdown, setQuestionDropdown] = useState(false);
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

  useEffect(async () => {
    const ac = new AbortController();
    if (questionCommentData) {
      const commentData = questionCommentData.data.data.map((item) => ({
        ...item,
        isCommentOpen: false,
        isToggleButtonOpen: false,
        replyValue: "",
      }));

      setComments(commentData);
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

  const handleSubmitComment = (e) => {
    e.preventDefault();
    commentOnQuestion(commentValue);
  };

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

            <CommentBody comments={comments} setComments={setComments} />
          </div>
        </div>
      )}
    </>
  );
}

export default CommunityCommentSection;
