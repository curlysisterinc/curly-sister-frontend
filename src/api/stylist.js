import { curlySistersApi } from "../config";

export default {
  async GetAllStylists(page) {
    const res = await curlySistersApi.get(
      `/v1/user/fetch-stylist?page=${page}&size=20`
    );
    return res.data;
  },
};
