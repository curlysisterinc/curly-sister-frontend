import { curlySistersApi } from "../config";

export default {
  async Search(data) {
    const res = await curlySistersApi.get("/v1/utility/search", {
      params: { ...data },
    });
    return res.data;
  },
  async SearchUser(data) {
    const res = await curlySistersApi.get("/v1/user/find-user", {
      params: { ...data },
    });
    return res.data;
  },
  async GetExternalVideoData(link) {
    const res = await fetch(`https://noembed.com/embed?url=${link}`);
    return res.json();
  },
};
