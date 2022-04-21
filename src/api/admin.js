/* eslint-disable import/no-cycle */
import { curlySistersApi } from "../config";

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
};
