import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useAuthContext } from "redux/auth";
import learn from "../../../api/learn";

export default () => {
  const {
    state: { isSignedIn },
  } = useAuthContext();
  const { GetAllQuestions } = learn;
  return useInfiniteQuery(
    ["questions"],
    ({ pageParam = 0 }) => GetAllQuestions({ page: pageParam, isSignedIn }),
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
