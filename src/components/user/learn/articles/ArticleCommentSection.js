import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import useGetCommentForArticle from "hooks/data/learn/useGetCommentForArticle";
import useCommentOnArticle from "hooks/data/learn/useCommentOnArticle";
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
    isLoading: isArticleCommentLoading,
    data: articleCommentData,
    refetch: refetchArticleComment,
    error: articleCommentDataError,
  } = useGetCommentForArticle(token);

  const {
    isLoading: isCommentOnArticleLoading,
    data: commentOnArticleData,
    mutate: commentOnArticle,
    error: commentOnArticleDataError,
  } = useCommentOnArticle(token);

  return (
    <Comments
      refetchCommentData={refetchArticleComment}
      commentDataError={articleCommentDataError}
      isCommentDataLoading={isArticleCommentLoading}
      commentData={articleCommentData?.data?.data?.comment}
      replyToCommentData={commentOnArticleData}
      replyToComment={commentOnArticle}
      isReplyToCommentDataLoading={isCommentOnArticleLoading}
      type="articles"
    />
  );
}

export default CommunityCommentSection;
