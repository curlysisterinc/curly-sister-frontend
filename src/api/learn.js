/* eslint-disable import/no-cycle */
import { curlySistersOnboarding, curlySistersApi } from "../config";

export default {
  async AskQuestion(data) {
    // const stringifiedData = JSON.stringify(data);
    return curlySistersApi.post("/v1/user/ask-question", data);
  },

  async GetAllQuestions({ isSignedIn, page }) {
    const res = isSignedIn
      ? await curlySistersApi.get(
          `/v1/user/get-questions-protected?page=${page}&size=20`
        )
      : await curlySistersOnboarding.get(
          `/v1/user/get-questions?page=${page}&size=20`
        );
    return res.data;
  },

  async GetOneQuestion(questionId) {
    return curlySistersApi.get(`/v1/user/get-question/${questionId}`);
  },
  async GetOneArticle(articleId) {
    return curlySistersApi.get(`/v1/user/get-article/${articleId}`);
  },
  async GetOneVideo(videoId) {
    return curlySistersApi.get(`/v1/user/get-video/${videoId}`);
  },
  async GetVideoCategories() {
    return curlySistersOnboarding.get(`/admin/find-all-video-category`);
  },
  async GetVideoByCategories() {
    return curlySistersOnboarding.get(`/v1/user/get-videos-by-category`);
  },
  async DeleteVideoById(videoId) {
    const data = { videoId };
    return curlySistersApi.post(`/v1/admin/delete-video`, data);
  },
  async DeleteArticleById(articleId) {
    const data = { articleId };
    return curlySistersApi.post(`/v1/admin/delete-article`, data);
  },
  async CommentOnQuestion(questionId, comment) {
    const data = {
      questionId,
      comment,
    };
    return curlySistersApi.post(`/v1/user/comment-on-question`, { ...data });
  },

  async ReactToVideo(videoId, reaction) {
    return curlySistersApi.post(`/v1/user/video/${videoId}/${reaction}`);
  },
  async ReactToArticle(articleId, reaction) {
    return curlySistersApi.post(`/v1/user/article/${articleId}/${reaction}`);
  },
  async SaveVideo(videoId) {
    const data = {
      videoId,
    };
    return curlySistersApi.post(`v1/user/save-video`, data);
  },
  async DeleteSavedVideo(videoId) {
    const data = {
      id: videoId,
    };

    return curlySistersApi.post(`v1/user/delete-saved-video`, data);
  },
  async SaveArticle(articleId) {
    const data = {
      articleId,
    };
    return curlySistersApi.post(`v1/user/save-article`, data);
  },
  async DeleteSavedArticle(id) {
    const data = {
      id,
    };
    return curlySistersApi.post(`v1/user/delete-saved-article`, data);
  },
  async ReactToArticleComment(articleId, reaction) {
    const data = {
      articleId,
      reaction,
    };
    return curlySistersApi.post(`/v1/user/react-to-article`, data);
  },
  async ReactToQuestionComment(commentId, reaction) {
    const data = {
      commentId,
      reaction,
    };
    return curlySistersApi.post(`/v1/user/react-to-question`, data);
  },
  async ReactToVideoComment(videoId, reaction) {
    const data = {
      videoId,
      reaction,
    };
    return curlySistersApi.post(`/v1/user/react-to-video`, data);
  },
  async CommentOnVideo(videoId, comment) {
    const data = {
      videoId,
      comment,
    };
    return curlySistersApi.post(`/v1/user/comment-on-video`, data);
  },
  async CommentOnArticle(articleId, comment) {
    const data = {
      articleId,
      comment,
    };
    return curlySistersApi.post(`/v1/user/comment-on-article`, data);
  },
  async ReplyCommentOnVideo(videoId, replyTo, comment) {
    const data = {
      videoId,
      replyTo,
      comment,
    };
    return curlySistersApi.post(`/v1/user/comment-on-video`, data);
  },
  async ReplyCommentOnArticle(videoId, reply) {
    const data = {
      videoId,
      reply,
    };
    return curlySistersApi.post(`/v1/user/reply-comment-for-video`, data);
  },
  async ReplyToComment(data) {
    return curlySistersApi.post(`/v1/user/reply-to-comment`, data);
  },
  async DeleteArticleComment(commentId) {
    return curlySistersApi.delete(`/v1/user/article/comment/${commentId}`);
  },
  async DeleteVideoComment(commentId) {
    return curlySistersApi.delete(`/v1/user/video/comment/${commentId}`);
  },
  async DeleteQuestionComment(commentId) {
    return curlySistersApi.delete(`/v1/user/question/comment/${commentId}`);
  },

  async GetCommentForQuestion(questionId) {
    const data = {
      questionId,
    };
    return curlySistersApi.post(`/v1/user/get-comment-for-question`, data);
  },
  async GetCommentForVideo(videoId) {
    const data = {
      videoId,
    };
    return curlySistersOnboarding.post(`/v1/user/get-comment-for-video`, data);
  },
  async GetCommentForArticle(articleId) {
    const data = {
      articleId,
    };
    return curlySistersOnboarding.post(
      `/v1/user/get-comment-for-article`,
      data
    );
  },
  async PinQuestion(questionId) {
    const data = {
      questionId,
    };
    return curlySistersApi.post(`/v1/user/pin-question`, data);
  },
  async UnPinQuestion(questionId) {
    const data = {
      questionId,
    };
    return curlySistersApi.post(`/v1/user/unpin-question`, data);
  },
  async SaveQuestion(questionId) {
    const data = {
      questionId,
    };
    return curlySistersApi.post(`/v1/user/save-question`, data);
  },

  async DeleteSavedQuestion(savedQuestionId) {
    const data = {
      savedQuestionId,
    };
    return curlySistersApi.post(`/v1/user/delete-saved-question`, data);
  },

  async DeleteQuestion(questionId) {
    return curlySistersApi.delete(`/v1/user/delete-question/${questionId}`);
  },
  async UpdateQuestion({ id, ...data }) {
    return curlySistersApi.put(`/v1/user/update-question/${id}`, data);
  },
};
