import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import stylist from "../../../api/stylist";

export default () => {
  const { GetAllStylists } = stylist;
  return useInfiniteQuery(
    ["stylists"],
    ({ pageParam = 0 }) => GetAllStylists(pageParam),
    {
      // getPreviousPageParam: (firstPage, allPages) => {
      //   const prevPage = firstPage.data.page - 1;
      //   return firstPage?.data?.page !== 0 ? prevPage : undefined;
      // },
      getNextPageParam: (currentPage, allPages) => {
        const totalPage =
          currentPage.data.totalStylistCount / currentPage.data.size;
        const lastPage =
          currentPage.data.totalStylistCount % currentPage.data.size === 0
            ? totalPage
            : Math.floor(totalPage + 1);
        const nextPage =
          currentPage?.data?.page !== lastPage
            ? currentPage.data.page + 1
            : undefined;
        return nextPage;
      },
    }
  );
};
