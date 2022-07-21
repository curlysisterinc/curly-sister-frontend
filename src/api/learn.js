/* eslint-disable import/no-cycle */
import { curlySistersApi } from "../config";

export default {
  async AskQuestion(data) {
    // const stringifiedData = JSON.stringify(data);
    return curlySistersApi.post("/v1/user/ask-question", data);
  },

  async GetAllQuestions() {
    return curlySistersApi.get("/v1/user/get-questions");
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
    return curlySistersApi.get(`/admin/find-all-video-category`);
  },
  async GetVideoByCategories() {
    return curlySistersApi.get(`/v1/user/get-videos-by-category`);
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
    return curlySistersApi.post(`/v1/user/comment-on-question`, data);
  },

  async ReactToVideo(videoId, reaction) {
    const data = {
      videoId,
      reaction,
    };
    return curlySistersApi.post(`/v1/user/react-to-video`, data);
  },
  async SaveVideo(videoId) {
    return curlySistersApi.post(`v1/user/save-video`, videoId);
  },
  async DeleteSavedVideo(videoId) {
    return curlySistersApi.post(`v1/user/delete-saved-video`, videoId);
  },
  async SaveArticle(articleId) {
    return curlySistersApi.post(`v1/user/save-article`, articleId);
  },
  async DeleteSavedArticle(articleId) {
    return curlySistersApi.post(`v1/user/delete-saved-article`, articleId);
  },
  async ReactToArticle(articleId, reaction) {
    const data = {
      articleId,
      reaction,
    };
    return curlySistersApi.post(`/v1/user/react-to-article`, data);
  },
  async ReactToQuestion(articleId, reaction) {
    const data = {
      articleId,
      reaction,
    };
    return curlySistersApi.post(`/v1/user/react-to-article`, data);
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
    return curlySistersApi.post(`/v1/user/get-comment-for-video`, data);
  },
  async GetCommentForArticle(articleId) {
    const data = {
      articleId,
    };
    return curlySistersApi.post(`/v1/user/get-comment-for-article`, data);
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
};