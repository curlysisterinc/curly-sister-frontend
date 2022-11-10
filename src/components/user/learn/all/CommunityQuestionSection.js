import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NonAuthRoutes } from "constants";
import Loader from "components/loader-component/loader";
import { useAuthContext } from "redux/auth";
import useGetAllQuestions from "hooks/data/learn/useGetAllQuestions";
import { queryClient } from "App";
import { CommunityQuestionItem } from "../community/CommunityQuestionItem";

export function CommunityQuestionSection() {
  const navigate = useNavigate();
  const {
    state: { isSignedIn },
  } = useAuthContext();

  const [getQuestions, setGetQuestions] = useState([]);
  const [pinnedQuestions, setPinnedQuestions] = useState([]);

  const {
    data: questionsData,
    isFetching: isQuestionsLoading,
    error: questionsRrror,
    refetch: questionsRefetch,
    fetchNextPage: fetchNextQuestionsPage,
    hasNextPage: hasQuestionsNextPage,
  } = useGetAllQuestions();

  useEffect(() => {
    if (questionsData) {
      const data = queryClient.getQueryData(["questions"]);
      if (data?.pages) {
        const currentData = data?.pages[0].data.payload.questions;
        const pinnedData = data.pages[0].data.pinnedQuestions;

        setGetQuestions(currentData);
        setPinnedQuestions(pinnedData);
      }
    }
  }, [questionsData]);

  return (
    <div className="mb-20">
      <div className="flex mt-10 mb-6 items-center justify-between">
        <h2 className="text-gray-400 text-2xl font-semibold">
          Latest from community
        </h2>
        {getQuestions.length > 0 && (
          <Link
            to={NonAuthRoutes.communities}
            className="text-purple-100 text-sm font-normal"
          >
            View all questions
          </Link>
        )}
      </div>
      {isQuestionsLoading ? (
        <Loader />
      ) : (
        <div>
          {getQuestions.length > 0 ? (
            <div className="flex flex-col">
              {getQuestions.slice(0, 4).map((question) => {
                return (
                  <CommunityQuestionItem
                    question={question}
                    key={question._id}
                  />
                );
              })}
            </div>
          ) : (
            <h3 className="text-center text-black text-xl font-BeatriceSemiBold">
              No content added
            </h3>
          )}
        </div>
      )}
    </div>
  );
}
