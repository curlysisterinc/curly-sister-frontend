/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import {
  curlySistersOnboarding,
  curlySistersApi,
  curlySistersFormDataApi,
} from "../config";

export default {
  /** Send a GET request to get All Station  */
  async GetAllStylists() {
    return curlySistersOnboarding.get("/v1/admin/get-all-stylists");
  },
  async GetOneStylist(id) {
    return curlySistersOnboarding.get(`/v1/admin/get-stylist/${id}`);
  },
  async GetStylistById(id) {
    return curlySistersApi.get(`/v1/admin/get-stylist/${id}`);
  },
  async AddAdmin(email) {
    const data = {
      email,
      callbackUrl: `${window.location.origin}/login`,
    };
    return curlySistersApi.post("/v1/admin/add-admin", data);
  },
  async GetAllAdmin(page) {
    return curlySistersApi.get(`/v1/admin/get-all-admin?page=${page}&size=20`);
  },
  async DeleteContent(data) {
    return curlySistersApi.get("/v1/admin/delete-content-by-id", data);
  },
  async DeleteAdmin(data) {
    return curlySistersApi.post("/v1/admin/delete-admin", data);
  },
  async SuspendOrActivateAdmin(data) {
    return curlySistersApi.post("/v1/admin/update-admin", data);
  },
  async SuspendOrActivateUser(data) {
    return curlySistersApi.post("/v1/admin/suspend-user", data);
  },
  async EditVideo(data) {
    return curlySistersApi.post("/v1/admin/update-video", data);
  },

  async CreateStylist(data) {
    return curlySistersApi.post("/v1/admin/add-stylist", data);
  },
  async UpdateStylist(data) {
    return curlySistersApi.post("/api/stylist/update-stylist", data);
  },
  async CreateAvailability(data) {
    return curlySistersApi.post("/v1/admin/add-availability", data);
  },
  async UpdateAvailability(data) {
    return curlySistersApi.post("/v1/admin/update-availability", data);
  },
  async GetAvailabilityById(id) {
    return curlySistersApi.get(`/v1/admin/get-availability/${id}`);
  },
  async CreateServices(data) {
    return curlySistersApi.post("/v1/admin/create-service", data);
  },

  async UpdateService(data) {
    return curlySistersApi.post("/v1/admin/update-service", data);
  },
  async GetServices() {
    return curlySistersOnboarding.get("/v1/admin/find-all-service");
  },
  async GetAllIndividuals(page) {
    return curlySistersApi.get(`/v1/admin/view-users?page=${page}&size=20`);
  },
  async DeleteIndividual(data) {
    return curlySistersApi.post("/v1/admin/delete-user", data);
  },
  async GetAllContents({ isSignedIn, page, size }) {
    const newSize = size || 20;
    const res = await curlySistersApi.get(
      `/v1/admin/fetch-all-content?page=${page}&size=${newSize}`
    );

    return res.data;
  },
  async UploadPhoto(formData) {
    return curlySistersFormDataApi.post(
      "/api/v1/file/upload/profile-pic",
      formData
    );
  },
  async UploadtoGallery(formData) {
    return curlySistersFormDataApi.post(
      "/api/v1/file/upload-to-gallery",
      formData
    );
  },

  async CreateCertification(data) {
    return curlySistersApi.post("/v1/admin/create-certifications", data);
  },
  async GetCertification() {
    return curlySistersApi.get("/v1/admin/find-all-certifications");
  },

  async UpdateCertification(data) {
    return curlySistersApi.post("/v1/admin/update-certifications", data);
  },

  async CreateTags(name) {
    const data = {
      name,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersApi.post("/v1/admin/create-tag", stringifiedData);
  },
  async GetTags() {
    return curlySistersOnboarding.get("/v1/admin/find-all-tags");
  },
  async UpdateTag(data) {
    return curlySistersApi.post("/v1/admin/update-tag", data);
  },

  async StripeCheckout(data) {
    return curlySistersApi.post("v1/user/call-to-stripe", data);
  },
  async BookService(data) {
    return curlySistersApi.post("/v1/user/book-service", data);
  },
  async ConfirmBookedService(data) {
    return curlySistersApi.post("/v1/user/confirm-payment", data);
  },
  async GetUpcomingBookings(data) {
    return curlySistersApi.post("/v1/user/get-bookings", data);
  },
  /** Send a POST request to add video to content */
  async AddVideoToContent(data) {
    return curlySistersApi.post("/v1/admin/add-video", data);
  },

  async updateVideo(data) {
    return curlySistersApi.post("/v1/admin/update-video", data);
  },
  /** Send a POST request to add video to content */
  async AddArticleToContent(data) {
    return curlySistersApi.post("/v1/admin/create-article", data);
  },
  async updateArticle(data) {
    return curlySistersApi.post("/v1/admin/update-article", data);
  },

  async CreateVideoCategory(name) {
    return curlySistersApi.post("/v1/admin/create-video-category", { name });
  },
  async updateVideoCategory(data) {
    return curlySistersApi.post("/v1/admin/update-video-category", data);
  },
  async DeleteVideoCategory(videoCategoryId) {
    return curlySistersApi.post("/v1/admin/delete-video-category", {
      videoCategoryId,
    });
  },

  async GetVideoCategory() {
    return curlySistersOnboarding.get("/v1/admin/find-all-video-category");
  },

  async GetAllVideos({ isSignedIn, page, size }) {
    const newSize = size || 20;
    const res = isSignedIn
      ? await curlySistersApi.get(
          `/v1/admin/find-all-videos-protected?page=${page}&size=${newSize}`
        )
      : await curlySistersOnboarding.get(
          `/v1/admin/find-all-videos?page=${page}&size=${newSize}`
        );
    return res.data;
  },

  async GetAllArticles({ isSignedIn, page, size }) {
    const newSize = size || 20;
    const res = isSignedIn
      ? await curlySistersApi.get(
          `/v1/admin/find-all-article-protected?page=${page}&size=${newSize}`
        )
      : await curlySistersOnboarding.get(
          `/v1/admin/find-all-article?page=${page}&size=${newSize}`
        );
    return res.data;
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
