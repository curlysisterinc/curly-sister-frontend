import { curlySistersApi } from "../config";

export default {
  async Search(data) {
    return curlySistersApi.post("/v1/utility/search", data);
  },
};
