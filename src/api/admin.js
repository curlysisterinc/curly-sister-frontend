/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { curlySistersApi, curlySistersFormDataApi } from "../config";

export default {
  /** Send a GET request to get All Station  */
  async GetAllStylists() {
    return curlySistersApi.get("/v1/admin/get-all-stylists");
  },
  async AddAdmin(email) {
    const data = { email };
    return curlySistersApi.post("/v1/admin/add-admin", data);
  },
  async GetAllAdmin() {
    return curlySistersApi.get("/v1/admin/get-all-admin");
  },
  async SuspendOrActivateAdmin(data) {
    return curlySistersApi.post("/v1/admin/update-admin", data);
  },
  async EditVideo(data) {
    return curlySistersApi.post("/v1/admin/update-video", data);
  },
  async EditArticle(data) {
    return curlySistersApi.post("/v1/admin/update-article", data);
  },
  async CreateStylist(data) {
    return curlySistersApi.post("/v1/admin/add-stylist", data);
  },

  async CreateServices(data) {
    return curlySistersApi.post("/v1/admin/create-service", data);
  },
  async GetServices() {
    return curlySistersApi.get("/v1/admin/find-all-service");
  },
  async GetAllContents() {
    return curlySistersApi.post("/v1/admin/find-all-content");
  },
  async UploadPhoto(data) {
    return curlySistersFormDataApi.post("/v1/file/upload", data);
  },

  async CreateCertification(name) {
    const data = {
      name,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersApi.post(
      "/v1/admin/create-certifications",
      stringifiedData
    );
  },
  async GetCertification() {
    return curlySistersApi.get("/v1/admin/find-all-certifications");
  },
  async CreateTags(name) {
    const data = {
      name,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersApi.post("/v1/admin/create-tag", stringifiedData);
  },
  async GetTags() {
    return curlySistersApi.get("/v1/admin/find-all-tags");
  },

  /** Send a POST request to add video to content */
  async AddVideoToContent(data) {
    return curlySistersApi.post("/v1/admin/add-video", data);
  },

  /** Send a POST request to add video to content */
  async AddArticleToContent(data) {
    return curlySistersFormDataApi.post(
      "/v1/admin/article/create-article",
      data
    );
  },

  async CreateVideoCategory(name) {
    const data = { name };
    return curlySistersApi.post("/v1/admin/create-video-category", data);
  },

  async GetVideoCategory() {
    return curlySistersApi.get("/v1/admin/find-all-video-category");
  },

  async GetAllVideos() {
    return curlySistersApi.get("/v1/admin/find-all-videos");
  },

  async GetAllArticles() {
    return curlySistersApi.get("/v1/admin/find-all-article");
  },
  async DeleteArticleById(articleId) {
    const data = {
      articleId,
    };
    return curlySistersApi.post("/v1/admin/delete-article", data);
  },
  async DeleteVideoById(videoId) {
    const data = {
      videoId,
    };
    return curlySistersApi.post("/v1/admin/delete-video", data);
  },
  async SaveArticleDraft(data) {
    return curlySistersFormDataApi.post(
      "/V1/admin/article/create-article",
      data
    );
  },
};
