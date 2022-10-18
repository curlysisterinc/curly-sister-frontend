import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetVideoCategory } = admin;
  return useQuery(["videoCategory"], () => GetVideoCategory(), {});
};
