import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NonAuthRoutes } from "constants";
import Loader from "components/loader-component/loader";
import { useAuthContext } from "redux/auth";
import useGetAllQuestions from "hooks/data/learn/useGetAllQuestions";
import { CommunityQuestionItem } from "../community/CommunityQuestionItem";

export function CommunityQuestionSection() {
  const navigate = useNavigate();
  const {
    state: { isSignedIn },
  } = useAuthContext();

  const [getQuestions, setGetQuestions] = useState([]);
  const [saveQst, setSaveQst] = useState(false);

  const {
    data: questionsData,
    isLoading: isQuestionsLoading,
    error: questionsRrror,
    refetch: questionsRefetch,
  } = useGetAllQuestions();

  useEffect(() => {
    if (questionsData) {
      setGetQuestions(questionsData.data.data);
    }
  }, [questionsData]);

  return (
    <div>
      <div className="flex mt-20 mb-10 items-center justify-between">
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
              {getQuestions.slice(0, 3).map((question) => {
                return <CommunityQuestionItem question={question} />;
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
