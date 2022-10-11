import React, { useCallback, useState } from "react";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import useReactToComment from "hooks/data/learn/useReactToComment";
import { useParams } from "react-router-dom";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiTwotoneDislike,
  AiTwotoneLike,
} from "react-icons/ai";
import { useAuthContext } from "redux/auth";
import useReplyToComment from "hooks/data/learn/useReplyToComment";
import ReactTextareaAutosize from "react-textarea-autosize";
import { Loadersmall } from "components/loader-component/loader";
import trash from "../../../../assets/images/trash.svg";
import edit from "../../../../assets/images/edit.svg";
import report from "../../../../assets/images/report.svg";
import reply from "../../../../assets/images/reply.svg";
import ellipses from "../../../../assets/images/dark-ellipses.svg";
import gradientAvatar from "../../../../assets/images/gradient-avatar.svg";

export default function CommentBody({ comments, setComments, isReplay }) {
  const { token } = useParams();
  const {
    state: { _id },
  } = useAuthContext();

  const [reportDropdown, setReportDropdown] = useState(false);
  const [replyComment, setReplyComment] = useState(false);

  const {
    isLoading: isReactionLoading,
    data: reactionData,
    mutate: reactToComment,
    error: reactionDataError,
  } = useReactToComment(token);

  const {
    isLoading: isReplyToCommentLoading,
    data: replyToCommentData,
    mutate: replyToComment,
    error: replyToCommentDataError,
  } = useReplyToComment(token);

  const handleQuestionReaction = (id, reaction) => {
    reactToComment({ commentId: id, reaction });
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

  const handleToggleReply = (id) => {
    const newComments = [...comments];
    const index = newComments.findIndex((item) => item._id === id);
    const newIntemAtIndex = {
      ...newComments[index],
      isCommentOpen: !newComments[index].isCommentOpen,
    };
    newComments[index] = newIntemAtIndex;
    setComments(newComments);
  };

  const handleSetReplyValue = (value, id) => {
    const newComments = [...comments];
    const index = newComments.findIndex((item) => item._id === id);
    const newIntemAtIndex = {
      ...newComments[index],
      replyValue: value,
    };
    newComments[index] = newIntemAtIndex;
    setComments(newComments);
  };

  const handleSubmitReply = (item) => {
    replyToComment({ comment: item.replyValue, commentId: item._id });
  };

  return comments?.map((item) => {
    return (
      <div className="mt-10 comment-box">
        <CommentItem
          item={item}
          handleQuestionReaction={handleQuestionReaction}
          displayLikeIcon={displayLikeIcon}
          displayDisLikeIcon={displayDisLikeIcon}
          handleToggleReply={handleToggleReply}
          setReportDropdown={setReportDropdown}
          reportDropdown={reportDropdown}
          setReplyComment={setReplyComment}
          handleSetReplyValue={handleSetReplyValue}
          handleSubmitReply={handleSubmitReply}
        />
        <div className="pl-14">
          {item?.replies?.map((rep) => (
            <div className="comment-box">
              <CommentItem
                item={rep}
                handleQuestionReaction={handleQuestionReaction}
                displayLikeIcon={displayLikeIcon}
                displayDisLikeIcon={displayDisLikeIcon}
                handleToggleReply={handleToggleReply}
                setReportDropdown={setReportDropdown}
                reportDropdown={reportDropdown}
                setReplyComment={setReplyComment}
                handleSetReplyValue={handleSetReplyValue}
                handleSubmitReply={handleSubmitReply}
                isReplyToCommentLoading={isReplyToCommentLoading}
                isReply
              />
            </div>
          ))}
        </div>
      </div>
    );
  });
}

export function CommentItem({
  item,
  handleQuestionReaction,
  displayLikeIcon,
  displayDisLikeIcon,
  handleToggleReply,
  setReportDropdown,
  reportDropdown,
  setReplyComment,
  handleSetReplyValue,
  handleSubmitReply,
  isReply,
  isReplyToCommentLoading,
}) {
  return (
    <div className="mb-5" key={item._id}>
      <div className="flex items-start">
        <img className="h-10 w-10 " src={gradientAvatar} alt="" />
        <div className="ml-5 text-sm text-gray-400 w-full">
          <div className="flex items-center">
            <p className="mr-3">{`${item?.created_by?.firstName ?? ""} ${
              item?.created_by?.lastName ?? ""
            }`}</p>
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
                onClick={() => handleQuestionReaction(item._id, "like")}
              >
                {displayLikeIcon(item)}
              </button>
              <p>{item.likes.length}</p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="mr-2"
                onClick={() => handleQuestionReaction(item._id, "unlikes")}
              >
                {displayDisLikeIcon(item)}
              </button>

              <p>{item.unlikes.length}</p>
            </div>
            {!isReply && (
              <>
                <button
                  type="button"
                  onClick={() => handleToggleReply(item._id)}
                >
                  <img className="cursor-pointer" src={reply} alt="" />
                </button>
                {/* <button
                  type="button"
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
                </button> */}
                <button
                  type="button"
                  onClick={() => setReplyComment(true)}
                  className="text-purple-100 cursor-pointer"
                >
                  {item?.replies?.length} replies
                </button>
              </>
            )}
          </div>
          {item.isCommentOpen ? (
            <div className="m-6 mb-2 flex items-center">
              <img src={gradientAvatar} alt="" className="h-10 w-10" />
              <div className="relative w-full">
                <ReactTextareaAutosize
                  value={item.replyValue}
                  name="comment"
                  id="comment"
                  onChange={(e) =>
                    handleSetReplyValue(e.target.value, item._id)
                  }
                  placeholder="Reply comment"
                  className="ml-5 w-full border rounded-xl border-gray-800 py-3 placeholder:text-gray-700 text-gray-400 text-sm resize-none pr-16 "
                  // minRows={2}
                  maxRows={3}
                />
                {item.replyValue.length ? (
                  <button
                    type="button"
                    onClick={() => handleSubmitReply(item)}
                    className="disabled:text-gray-300 border-0 outline-0 text-sm text-purple-100 cursor-pointer absolute right-0 top-3"
                  >
                    {isReplyToCommentLoading ? <Loadersmall /> : "post"}
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
