import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "redux/auth";
// import { getNextPageParam } from "utils";
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

export const getNextPageParam = (currentPage) => {
  const totalPage =
    currentPage.data.payload.totalCount / Number(currentPage.data.payload.size);
  const lastPage =
    currentPage.data.payload.totalCount %
      Number(currentPage.data.payload.size) ===
    0
      ? totalPage
      : Math.floor(totalPage + 1);

  const nextPage =
    Number(currentPage?.data?.payload?.page) !== lastPage
      ? Number(currentPage.data.payload.page) + 1
      : undefined;
  return nextPage;
};
