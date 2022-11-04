/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import {
  AiTwotoneDislike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import learn from "api/learn";
import ReactTextareaAutosize from "react-textarea-autosize";
import { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { useAuthContext } from "redux/auth";
import gradientAvatar from "../../assets/images/gradient-avatar.svg";
import CommentBody from "../user/learn/community/CommentBody";

export function Comments({
  refetchCommentData,
  commentDataError,
  isCommentDataLoading,
  commentData,
  replyToCommentData,
  replyToComment,
  isReplyToCommentDataLoading,
  type,
}) {
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const {
    state: { profile_pic, firstName, lastName },
  } = useAuthContext();

  useEffect(async () => {
    const ac = new AbortController();
    if (commentData) {
      const newCommentData = commentData.map((item) => ({
        ...item,
        isCommentOpen: false,
        isToggleButtonOpen: false,
        replyValue: "",
      }));

      setComments(newCommentData);
    }

    return function cleanup() {
      ac.abort();
    };
  }, [commentData]);

  useEffect(async () => {
    const ac = new AbortController();
    if (replyToCommentData) {
      setCommentValue("");
    }
    return function cleanup() {
      ac.abort();
    };
  }, [replyToCommentData]);

  const handleSubmitComment = () => {
    replyToComment(commentValue);
  };

  const handleReturnUsersImage = (userQuestion, ownerOfQuestion) => {
    const user =
      typeof userQuestion.created_by === "string"
        ? ownerOfQuestion
        : userQuestion.created_by;
    const firstNameLetter = user?.firstName[0].toUpperCase();
    const lastNameLetter = user?.lastName[0].toUpperCase();
    const photo = user?.profile_pic || "";
    return photo ? (
      <img src={photo} alt="user profile avatar" />
    ) : (
      `${firstNameLetter}${lastNameLetter}`
    );
  };

  const handleUsersImage = () => {
    const firstNameLetter = firstName[0].toUpperCase();
    const lastNameLetter = lastName[0].toUpperCase();
    return profile_pic.trim() ? (
      <img src={profile_pic} alt="user profile avatar" />
    ) : (
      `${firstNameLetter}${lastNameLetter}`
    );
  };

  return (
    <>
      {commentDataError && (
        <ErrorDisplayComponent refetch={refetchCommentData} />
      )}
      <div className="flex items-center justify-center mb-6">
        {isCommentDataLoading && <Loadersmall />}
      </div>

      {commentData && (
        <div className="">
          <div className="">
            <div className="flex items-center mb-5">
              <div className=" mr-5 rounded-full flex justify-center items-center  text-white text-15">
                <p className="h-10 w-10 rounded-full flex justify-center items-center bg-purple-700 text-white text-15">
                  {handleUsersImage()}
                </p>
              </div>
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
                    {isReplyToCommentDataLoading ? <Loadersmall /> : "post"}
                  </button>
                ) : null}
              </div>
            </div>
            <CommentBody
              comments={comments}
              setComments={setComments}
              type={type}
            />
          </div>
        </div>
      )}
    </>
  );
}
