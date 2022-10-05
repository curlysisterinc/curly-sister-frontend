/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Loadersmall } from "components/loader-component/loader";
import useAskQuestion from "hooks/data/learn/useAskQuestion";
import React, { useState, useEffect } from "react";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import closeModalBtn from "../../../../assets/images/cancel.svg";

function AddQuestionModal({ handleClose, setGetQuestions, getQuestions }) {
  const [askQuestion, setAskQuestion] = useState({
    title: "",
    question: "",
  });
  const {
    isLoading,
    mutate: sendQuestion,
    data: askQuestionData,
  } = useAskQuestion();

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Ask a question";
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    if (askQuestionData) {
      handleClose();
    }
  }, [askQuestionData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDisabled = Object.values(askQuestion).some((item) => item === "");

    if (!isDisabled) {
      const data = {
        ...askQuestion,
      };
      sendQuestion(data);
    }
  };

  // handle input change
  const handleInputChange = (e) => {
    setAskQuestion({ ...askQuestion, [e.target.name]: e.target.value });
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 left-0 h-full overflow-y-auto z-200 bg-black-100 w-full flex  justify-end items-center"
    >
      <div
        className="flex items-start justify-end h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className=" bg-white rounded-full p-2 fixed top-2  right-2 xs:left-auto xs:right-500"
          onClick={handleClose}
          role="button"
          tabIndex="0"
          onKeyPress={(e) =>
            runFunctionWhenSpaceOrEnterIsClicked(e, handleClose)
          }
        >
          <img src={closeModalBtn} alt="close button" />
        </div>
        <div className="bg-white min-h-screen p-5 pt-10 sm:p-10 w-full max-w-480 ">
          <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
            Ask a question
          </h4>
          <p className="text-gray-200 text-base">Enter your question below</p>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label
                htmlFor={askQuestion.title}
                className="pb-10 text-gray-400 text-sm"
              >
                Question title
                <input
                  type="text"
                  name="title"
                  id={askQuestion.title}
                  className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                  placeholder="Type here..."
                  value={askQuestion.title}
                  onChange={handleInputChange}
                />
              </label>
              <label
                htmlFor={askQuestion.question}
                className="text-gray-400 text-sm "
              >
                Description
                <textarea
                  rows="3"
                  type="text"
                  name="question"
                  id={askQuestion.question}
                  className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Provide some more context..."
                  value={askQuestion.question}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold flex justify-center items-center"
            >
              {isLoading ? <Loadersmall /> : "Ask question"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionModal;
