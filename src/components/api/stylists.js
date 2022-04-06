/* eslint-disable import/no-cycle */
import { curlySistersApi } from "../../config";

export default {
  /** Send a GET request to get All Station  */
  async GetAllStylists() {
    return curlySistersApi.get("/stylist/fetch-all-stylist");
  },
};
