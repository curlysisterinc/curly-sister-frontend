import { useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "utils";
import stylist from "../../../api/stylist";

export default () => {
  const { GetAllStylists } = stylist;
  return useInfiniteQuery(
    ["stylists"],
    ({ pageParam = 0 }) => GetAllStylists(pageParam),
    {
      getNextPageParam,
    }
  );
};
