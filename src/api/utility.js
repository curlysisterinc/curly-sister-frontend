import { curlySistersApi } from "../config";

export default {
  async Search(data) {
    const res = await curlySistersApi.post("/v1/utility/search", data);
    return res.data;
  },
};
