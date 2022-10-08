import { useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "utils";
import utility from "../../../api/utility";

export default ({ query }) => {
  console.log({ query });
  const { Search } = utility;
  return useInfiniteQuery(
    ["stylistsSearch", query],
    ({ pageParam = 0 }) => Search({ page: pageParam, ...query }),
    {
      enabled: JSON.stringify(query) !== "{}",
      getNextPageParam,
    }
  );
};
