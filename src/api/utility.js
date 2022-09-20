import { curlySistersApi } from "../config";

export default {
  async Search(data) {
    const res = await curlySistersApi.get("/v1/utility/search", {
      params: { ...data },
    });
    return res.data;
  },
};
