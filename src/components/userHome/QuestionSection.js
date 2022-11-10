import React, { useEffect, useState } from "react";
import { CommunityQuestionItem } from "components/user/learn/community/CommunityQuestionItem";
import useGetAllQuestions from "hooks/data/learn/useGetAllQuestions";
import { queryClient } from "App";
import { Loadersmall } from "components/loader-component/loader";
import { Link } from "react-router-dom";

export function QuestionSection() {
  const {
    data: questionsData,
    isFetching: isQuestionsLoading,
    error: questionsRrror,
    refetch: questionsRefetch,
    fetchNextPage: fetchNextQuestionsPage,
    hasNextPage: hasQuestionsNextPage,
  } = useGetAllQuestions();

  const [otherQuestions, setOtherQuestions] = useState(null);

  useEffect(() => {
    if (questionsData) {
      const Allquestions = [];
      queryClient
        .getQueryData(["questions"])
        .pages.forEach((item) =>
          Allquestions.push(...item.data.payload.questions)
        );

      setOtherQuestions(Allquestions.slice(0, 3));
    }
  }, [questionsData]);

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-5">
        <p className="text-gray-400 text-base">New questions</p>
        <Link
          to="/learn/communities"
          className="text-sm font-bold text-purple-100"
        >
          View more
        </Link>
      </div>

      {isQuestionsLoading && <Loadersmall />}
      {questionsData &&
        otherQuestions &&
        otherQuestions.map((item) => (
          <CommunityQuestionItem question={item} key={item?._id} />
        ))}
    </div>
  );
}
