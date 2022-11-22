import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "redux/auth";
import { getNextPageParam } from "utils";
import admin from "../../../api/admin";

export default ({ size }) => {
  const {
    state: { isSignedIn },
  } = useAuthContext();
  const { GetAllContents } = admin;
  return useInfiniteQuery(
    ["content"],
    ({ pageParam = 0 }) =>
      GetAllContents({ page: pageParam, isSignedIn, size }),
    {
      // enabled: JSON.stringify(query) !== "{}",
      getNextPageParam,
    }
  );
};
