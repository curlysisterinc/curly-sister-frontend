/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import learn from "../../../api/learn";
import closeModalBtn from "../../../assets/images/cancel.svg";

function AddQuestionModal({ handleClose, setGetQuestions, getQuestions }) {
  const [askQuestion, setAskQuestion] = useState({
    title: "",
    question: "",
  });
  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Ask a question";

    // if (authenticated === null) {
    //   navigate(NonAuthRoutes.login);
    // } else {
    //   navigate(AuthRoutes.home);
    // }

    return function cleanup() {
      ac.abort();
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      question: askQuestion.question,
    };
    learn
      .AskQuestion(data)
      .then((response) => {
        console.log(response);
        setGetQuestions([...getQuestions, response.data.data.tag]);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle input change
  const handleInputChange = (e) => {
    setAskQuestion({ ...askQuestion, [e.target.name]: e.target.value });
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 left-0 h-full overflow-y-auto z-50 bg-black-100 w-full "
    >
      <div
        className="flex items-start justify-end h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="mt-20 mr-10 bg-white rounded-full p-2"
          onClick={handleClose}
          src={closeModalBtn}
          alt="close button"
        />
        <div className="bg-white min-h-screen  p-10 w-2/5">
          <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
            Ask a question
          </h4>
          <p className="text-gray-200 text-base">Enter your question below</p>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mt-5  overflow-hidden">
                <div className="">
                  <label
                    htmlFor={askQuestion.title}
                    className="pb-10 text-gray-400 text-sm"
                  >
                    Question title
                    <input
                      type="text"
                      name="title"
                      id={askQuestion.title}
                      className="pl-3 mb-5 mt-2 py-2 appearance-none rounded-lg border border-gray-800 w-full text-gray-400 placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm"
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
                      className=" pl-3 py-2 mt-2 appearance-none rounded-lg border border-gray-800 w-full text-gray-400 placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm"
                      placeholder="Provide some more context..."
                      value={askQuestion.question}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold"
            >
              Ask question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionModal;
