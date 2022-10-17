import React, { useEffect, useState } from "react";
import { CommunityQuestionItem } from "components/user/learn/community/CommunityQuestionItem";
import useGetAllQuestions from "hooks/data/learn/useGetAllQuestions";
import { queryClient } from "App";
import { Loadersmall } from "components/loader-component/loader";
import { Link } from "react-router-dom";
import CommonCard from "components/stylistCard";
import useGetAllStylists from "hooks/data/admin/useGetAllStylists";
import { getRandomInt } from "utils";

export function StylistSection() {
  const {
    data: stylistData,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error,
  } = useGetAllStylists();

  const [stylistList, setStylistList] = React.useState([]);

  React.useEffect(() => {
    if (stylistData) {
      const data = queryClient.getQueryData(["stylists"]);
      const currentData = data.pages
        .map((item) => item.data.stylist)
        .flatMap((a) => a);

      const randomNumber = getRandomInt({
        min: 0,
        max: currentData.length - 3,
      });

      setStylistList(currentData.splice(randomNumber, 2));
    }
  }, [stylistData]);

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-5">
        <p className="text-gray-400 text-base">
          Popular around you
          <span>.</span>
          <span className="text-gray-200">Interesting styles</span>
        </p>
        <Link to="/stylists" className="text-sm font-bold text-purple-100">
          View more
        </Link>
      </div>
      {isFetching && <Loadersmall />}
      {/* stylists */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
        {stylistList.length > 0 &&
          stylistList.map((item) => {
            return <CommonCard key={item._id} stylist={item} />;
          })}
      </div>
    </div>
  );
}
