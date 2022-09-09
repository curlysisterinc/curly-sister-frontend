import { useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "utils";
import utility from "../../../api/utility";

export default ({ query }) => {
  const { Search } = utility;
  return useInfiniteQuery(
    ["stylistsSearch", query.address],
    ({ pageParam = 0 }) => Search({ page: pageParam, ...query }),
    {
      enabled: !!query.address,
      getNextPageParam: (currentPage) => {
        // console.log({ currentPage });
        const totalPage =
          currentPage.data.totalSearchCount / currentPage.data.size;
        const lastPage =
          currentPage.data.totalSearchCount % currentPage.data.size === 0
            ? totalPage
            : Math.floor(totalPage + 1);
        const nextPage =
          currentPage?.data?.page === lastPage - 1
            ? undefined
            : currentPage.data.page + 1;

        return nextPage;
      },
    }
  );
};
