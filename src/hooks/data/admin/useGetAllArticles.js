import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "redux/auth";
import admin from "../../../api/admin";

export default ({ size }) => {
  const {
    state: { isSignedIn },
  } = useAuthContext();

  const { GetAllArticles } = admin;
  return useInfiniteQuery(
    ["articles"],
    ({ pageParam = 0 }) =>
      GetAllArticles({ page: pageParam, isSignedIn, size }),
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
  console.log({ nextPage, lastPage, bb: currentPage.data.payload, totalPage });

  return nextPage;
};
