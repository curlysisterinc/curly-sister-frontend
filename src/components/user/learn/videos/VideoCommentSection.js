import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import useGetCommentForArticle from "hooks/data/learn/useGetCommentForArticle";
import useCommentOnArticle from "hooks/data/learn/useCommentOnArticle";
import useReactToComment from "hooks/data/learn/useReactToComment";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { useAuthContext } from "redux/auth";
import useGetCommentForVideo from "hooks/data/learn/useGetCommentForVideo";
import useCommentOnVideo from "hooks/data/learn/useCommentOnVideo";
import Comments from "../../../CommentSection";

dayjs.extend(relativeTime);

function VideoCommentSection() {
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    state: { _id },
  } = useAuthContext();

  const { state } = useLocation();

  const {
    isLoading: isVideoCommentLoading,
    data: videoCommentData,
    refetch: refetchVideoComment,
    error: videoCommentDataError,
  } = useGetCommentForVideo(token);

  const {
    isLoading: isCommentOnVideoLoading,
    data: commentOnVideoData,
    mutate: commentOnVideo,
    error: commentOnVideoDataError,
  } = useCommentOnVideo(token);

  return (
    <Comments
      refetchCommentData={refetchVideoComment}
      commentDataError={videoCommentDataError}
      isCommentDataLoading={isVideoCommentLoading}
      commentData={videoCommentData?.data?.data?.comment}
      replyToCommentData={commentOnVideoData}
      replyToComment={commentOnVideo}
      isReplyToCommentDataLoading={isCommentOnVideoLoading}
      type="videos"
    />
  );
}

export default VideoCommentSection;
