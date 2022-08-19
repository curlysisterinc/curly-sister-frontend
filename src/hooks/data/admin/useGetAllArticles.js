import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetAllArticles } = admin;
  return useQuery(["articles"], () => GetAllArticles(), {});
};
