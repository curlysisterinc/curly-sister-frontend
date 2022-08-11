import { curlySistersApi } from "../config";

export default {
  async GetAllStylists() {
    return curlySistersApi.get("/v1/user/fetch-stylist");
  },
};
