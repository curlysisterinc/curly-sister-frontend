import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthRoutes } from "constants";
import learn from "api/learn";

import ReactTextareaAutosize from "react-textarea-autosize";
import useGetOneQuestion from "hooks/data/learn/useGetOneQuestion";
import useGetCommentForQuestion from "hooks/data/learn/useGetCommentForQuestion";
import Loader from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { queryClient } from "App";
import useGetAllQuestions from "hooks/data/learn/useGetAllQuestions";
import { getRandomInt } from "utils";
import dayjs from "dayjs";
import gradientAvatar from "../../../../assets/images/gradient-avatar.svg";

import bgBookmark from "../../../../assets/images/bg-bookmark.svg";
import serena from "../../../../assets/images/serena.png";
import pix1 from "../../../../assets/images/pix1.png";
import pix7 from "../../../../assets/images/pix7.png";
import pix8 from "../../../../assets/images/pix8.png";
import bookmark from "../../../../assets/images/book-mark.png";

import backArrow from "../../../../assets/images/back-arrow.svg";
import QuestionMoreOptionDropDown from "./QuestionMoreOptionDropDown";
import AskQuestionModal from "./AddQuestionModal";
import CommunityCommentSection from "./CommunityCommentSection";
import { CommunityQuestionItem } from "./CommunityQuestionItem";

function CommunityContent() {
  const navigate = useNavigate();
  const { token } = useParams();

  const { state } = useLocation();

  const [getQuestion, setGetQuestion] = useState({});
  const [otherQuestions, setOtherQuestions] = useState(null);

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const {
    isLoading: isQuestionLoading,
    data: questionData,
    refetch: refetchQuestion,
    error: questionDataError,
  } = useGetOneQuestion(token);

  useEffect(async () => {
    const ac = new AbortController();
    if (questionData) {
      setGetQuestion(questionData.data.data);
    }

    return function cleanup() {
      ac.abort();
    };
  }, [questionData]);

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
      const Allquestions = [];
      queryClient
        .getQueryData(["questions"])
        .pages.forEach((item) =>
          Allquestions.push(...item.data.payload.questions)
        );
      const randomNumber = getRandomInt({
        min: 0,
        max: Allquestions.length - 1,
      });

      setOtherQuestions(Allquestions[randomNumber]);
    }
  }, [questionsData]);

  return (
    <div className="max-w-1111 bg-white px-3 md:px-5 lg:px-10 py-8 pt-20 md:pt-12 w-full  m-auto">
      <button
        type="button"
        onClick={() => navigate("/learn/communities")}
        className="flex items-center mb-4 cursor-pointer text-sm text-gray-300"
      >
        <img src={backArrow} alt="go back" className="mr-4" />
        Go Back
      </button>

      {isQuestionLoading && <Loader />}

      {questionDataError && <ErrorDisplayComponent refetch={refetchQuestion} />}

      {questionData && (
        <div className="mx-auto max-w-678">
          <div className="">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-400 font-BeatriceSemiBold text-2xl">
                {getQuestion?.title
                  ? getQuestion?.title
                  : getQuestion?.question}
              </h3>
              <div className="">
                <img src={bgBookmark} alt="" />
              </div>
            </div>

            <div className="flex items-center mb-4 relative">
              <p className="text-sm text-gray-200 flex items-center">
                {getQuestion?.created_by?.firstName}{" "}
                {getQuestion?.created_by?.lastName} ·{" "}
                {dayjs(getQuestion?.createdAt).format("DD MMM YYYY")}
              </p>
              <QuestionMoreOptionDropDown
                question={getQuestion}
                openEditQuestionModal={() => setIsQuestionModalOpen(true)}
                isPinned={!!state?.isPinned}
              />

              {isQuestionModalOpen ? (
                <AskQuestionModal
                  getQuestions={getQuestion}
                  // setGetQuestions={setGetQuestions}
                  handleClose={() => setIsQuestionModalOpen(false)}
                />
              ) : null}
            </div>

            <p className="text-gray-400 text-base leading-6">
              {getQuestion?.question}
            </p>
          </div>

          <hr className="w-full border border-gray-250 my-10" />

          <CommunityCommentSection />

          <div className="mt-20">
            <p className="flex mb-5 ">
              Other questions you may be interested in
            </p>
            {otherQuestions && (
              <CommunityQuestionItem question={otherQuestions} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityContent;
