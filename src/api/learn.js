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
    return curlySistersApi.get(`v1/user/get-question/${questionId}`);
  },

  async CommentOnQuestion(questionId, comment) {
    const data = {
      questionId,
      comment,
    };
    return curlySistersApi.post(`v1/user/comment-on-question`, data);
  },

  async GetCommentForQuestion(questionId, comment) {
    const data = {
      questionId,
      comment,
    };
    return curlySistersApi.post(`v1/user/comment-on-question`, data);
  },
};
