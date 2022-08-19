import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetAllVideos } = admin;
  return useQuery(["videos"], () => GetAllVideos(), {});
};
