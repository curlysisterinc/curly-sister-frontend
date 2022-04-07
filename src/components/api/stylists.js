/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
/* eslint-disable object-shorthand */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import { curlySistersApi } from "../../config";
// eslint-disable-next-line

export default {
  /** Send a GET request to get All Station  */
  async GetAllStylists() {
    return curlySistersApi.get("/stylist/fetch-all-stylist");
  },
};
