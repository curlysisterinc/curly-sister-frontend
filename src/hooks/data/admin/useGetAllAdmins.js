import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "utils";
import admin from "../../../api/admin";

export default () => {
  const { GetAllAdmin } = admin;
  return useInfiniteQuery(
    ["admins"],
    ({ pageParam = 0 }) => GetAllAdmin(pageParam),
    {
      getNextPageParam,
    }
  );
};
