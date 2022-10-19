import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import useGetCommentForQuestion from "hooks/data/learn/useGetCommentForQuestion";
import useReplyToComment from "hooks/data/learn/useReplyToComment";
import useCommentOnQuestion from "hooks/data/learn/useCommentOnQuestion";
import useReactToComment from "hooks/data/learn/useReactToComment";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { useAuthContext } from "redux/auth";
import Comments from "../../../CommentSection";

dayjs.extend(relativeTime);

function CommunityCommentSection() {
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    state: { _id },
  } = useAuthContext();

  const { state } = useLocation();

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

  return (
    <Comments
      refetchCommentData={refetchQuestionComment}
      commentDataError={questionCommentDataError}
      isCommentDataLoading={isQuestionCommentLoading}
      commentData={questionCommentData?.data?.data?.comment}
      replyToCommentData={commentOnQuestionData}
      replyToComment={commentOnQuestion}
      isReplyToCommentDataLoading={isCommentOnQuestionLoading}
      type="questions"
    />
  );
}

export default CommunityCommentSection;
