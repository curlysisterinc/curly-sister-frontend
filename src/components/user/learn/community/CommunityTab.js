/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable import/newline-after-import */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import serena from "../../../../assets/images/serena.png";
import pix1 from "../../../../assets/images/pix1.png";
import pix2 from "../../../../assets/images/pix2.png";
import pix3 from "../../../../assets/images/pix3.png";
import bookmark from "../../../../assets/images/book-mark.png";
import orangePin from "../../../../assets/images/orange-pin.svg";
import bookmarkfilled from "../../../../assets/images/bookmark-filled.png";
import AskQuestionModal from "./AddQuestionModal";
import moment from "moment";
import { NonAuthRoutes } from "constants";
import { CommunityQuestionItem } from "./CommunityQuestionItem";
import { PinnedQuestion } from "./PinnedQuestion";
import useGetAllQuestions from "hooks/data/learn/useGetAllQuestions";
import { useAuthContext } from "redux/auth";
import Loader from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { queryClient } from "App";
import { useInView } from "react-intersection-observer";

function CommunityTab() {
  const [activeTab, setActiveTab] = useState("all");
  const [getQuestions, setGetQuestions] = useState([]);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [pinnedQuestions, setPinnedQuestions] = useState([]);

  const [ref, inView] = useInView();

  const navigate = useNavigate();
  const {
    state: { isSignedIn },
  } = useAuthContext();

  // open question dialog
  const openQuestionModal = () => {
    if (isSignedIn) {
      setIsQuestionModalOpen(true);
    } else {
      navigate(NonAuthRoutes.login);
    }
  };

  // close question dialog
  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

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
      const currentData = data.pages
        .map((item) => item.data.payload.questions)
        .flatMap((a) => a);
      const pinnedData = data.pages[0].data.pinnedQuestions;
      console.log({ pinnedData });
      console.log({ currentData });
      setGetQuestions(currentData);
      setPinnedQuestions(pinnedData);
    }
  }, [questionsData]);

  React.useEffect(() => {
    if (inView) {
      fetchNextQuestionsPage();
    }
  }, [inView]);

  return (
    <div className="mt-10 max-w-777 mx-auto">
      <div className="flex justify-between">
        <h2 className="text-2xl text-gray-400 font-BeatriceSemiBold">
          Questions
        </h2>
        {questionsData && (
          <button
            type="button"
            onClick={openQuestionModal}
            className="bg-purple-100 rounded-full text-white py-3 px-5 text-sm outline-none "
          >
            Ask a question
          </button>
        )}
        {isQuestionModalOpen ? (
          <AskQuestionModal
            getQuestions={getQuestions}
            setGetQuestions={setGetQuestions}
            handleClose={closeQuestionModal}
          />
        ) : null}
      </div>
      {questionsRrror && <ErrorDisplayComponent refetch={questionsRefetch} />}
      {isQuestionsLoading && <Loader />}

      {questionsData && (
        <>
          <div className="mt-6 flex space-x-6">
            <div
              onClick={() => setActiveTab("all")}
              className={clsx(
                activeTab === "all"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              All
            </div>
            <div
              onClick={() => setActiveTab("popular")}
              className={clsx(
                activeTab === "popular"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Popular
            </div>
            <div
              onClick={() => setActiveTab("recent")}
              className={clsx(
                activeTab === "recent"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Recent
            </div>
            <div
              onClick={() => setActiveTab("pinned")}
              className={clsx(
                activeTab === "pinned"
                  ? "text-purple-100 border-purple-100"
                  : "text-gray-300 border-gray-250",
                "border rounded-full px-3 py-1 text-sm  cursor-pointer"
              )}
            >
              Pinned
            </div>
          </div>
          <div className="mt-10 overflow-auto pr-5 max-h-screen-300px scroll-smooth">
            {activeTab === "all" && (
              <div>
                <PinnedQuestion pinnedQuestions={pinnedQuestions} />
                {getQuestions.length > 0 ? (
                  getQuestions.map((question) => {
                    return (
                      <CommunityQuestionItem
                        question={question}
                        key={question._id}
                      />
                    );
                  })
                ) : (
                  <h3 className="text-center text-black text-xl font-BeatriceSemiBold">
                    No content added
                  </h3>
                )}
              </div>
            )}
            {activeTab === "pinned" && (
              <PinnedQuestion pinnedQuestions={pinnedQuestions} />
            )}

            <div className="my-10">
              {hasQuestionsNextPage && (
                <div className="loading" ref={ref}>
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CommunityTab;
