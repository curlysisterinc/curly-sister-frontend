import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "utils";
import admin from "../../../api/admin";

export default () => {
  const { GetAllIndividuals } = admin;
  return useInfiniteQuery(
    ["individuals"],
    ({ pageParam = 0 }) => GetAllIndividuals(pageParam),
    {
      getNextPageParam,
    }
  );
};
