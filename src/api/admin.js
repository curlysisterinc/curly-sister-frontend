/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { curlySistersApi, curlySistersFormDataApi } from "../config";

export default {
  /** Send a GET request to get All Station  */
  async GetAllStylists() {
    return curlySistersApi.get("/api/stylist/fetch-all-stylist");
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

  async CreateTag(name) {
    const data = {
      name,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersApi.post("/v1/admin/create-tag", stringifiedData);
  },

  /** Send a POST request to add video to content */
  async AddVideoToContent(link, category, title, description, by) {
    const data = {
      link,
      category,
      title,
      description,
      by,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersApi.post("/V1/admin/add-video", stringifiedData);
  },

  /** Send a POST request to add video to content */
  async AddArticleToContent(data) {
    return curlySistersFormDataApi.post(
      "/V1/admin/article/create-article",
      data
    );
  },

  async SaveArticleDraft(data) {
    return curlySistersFormDataApi.post(
      "/V1/admin/article/create-article",
      data
    );
  },
};
