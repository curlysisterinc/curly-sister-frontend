import { useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "utils";
import utility from "../../../api/utility";

export default ({ query, role }) => {
  const { SearchUser } = utility;
  return useInfiniteQuery(
    ["userSearch", query],
    ({ pageParam = 0 }) => SearchUser({ page: pageParam, ...query, role }),
    {
      enabled: JSON.stringify(query) !== "{}",
      getNextPageParam,
    }
  );
};
