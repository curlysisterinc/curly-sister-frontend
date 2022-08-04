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
import { NonAuthRoutes } from "../../../constants";
import learn from "../../../api/learn";
import authHandler from "../../../authHandler";
import serena from "../../../assets/images/serena.png";
import pix1 from "../../../assets/images/pix1.png";
import pix2 from "../../../assets/images/pix2.png";
import pix3 from "../../../assets/images/pix3.png";
import bookmark from "../../../assets/images/book-mark.png";
import orangePin from "../../../assets/images/orange-pin.svg";
import bookmarkfilled from "../../../assets/images/bookmark-filled.png";
import AskQuestionModal from "./newQuestionModal";
import LearnTabComponent from "./learnTabComponent";
import moment from "moment";

function CommunityTab() {
  const [activeTab, setActiveTab] = useState("all");
  const [getQuestions, setGetQuestions] = useState([]);
  const [questionModal, setQuestionModal] = useState(false);
  const [saveQst, setSaveQst] = useState(false);
  // const [clicked, setClicked] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const ac = new AbortController();

    const details = localStorage.getItem("user");
    if (details) {
      setIsLoggedIn(true);
    }
    return function cleanup() {
      ac.abort();
    };
  }, []);
  // open question dialog
  const openQuestionModal = () => {
    if (isLoggedIn) {
      setQuestionModal(true);
    } else {
      navigate(NonAuthRoutes.login);
    }
  };

  // close question dialog
  const closeQuestionModal = () => {
    setQuestionModal(false);
  };

  const userDetails = authHandler.getUser("users");

  useEffect(async () => {
    const ac = new AbortController();

    learn
      .GetAllQuestions()
      .then((response) => {
        console.log(response.data.data);

        setGetQuestions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(async () => {
    const ac = new AbortController();

    learn
      .GetAllQuestions()
      .then((response) => {
        console.log(response.data.data);

        setGetQuestions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <>
      {/* <div>
        <LearnTabComponent active="communities" />
      </div> */}
      <div className="m-20">
        <div className="flex justify-between">
          <h2 className="text-2xl text-gray-400 font-BeatriceSemiBold">
            Questions
          </h2>
          <button
            type="button"
            onClick={openQuestionModal}
            className="bg-purple-100 rounded-full text-white py-3 px-5 text-sm outline-none "
          >
            Ask a question
          </button>
          {questionModal ? (
            <AskQuestionModal
              getQuestions={getQuestions}
              setGetQuestions={setGetQuestions}
              handleClose={closeQuestionModal}
            />
          ) : null}
        </div>
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
        <div className="mt-10">
          {activeTab === "all" && (
            <div>
              {getQuestions.length > 0 ? (
                <>
                  <div className="cursor-pointer flex mb-5 align-center justify-between border bg-orange-50 border-orange-100 rounded-md shadow p-4">
                    <div className="flex">
                      <img src={serena} alt="serena" />
                      <div className="flex flex-col ml-4">
                        <h4 className="flex items-center text-base font-semibold mb-2 text-gray-400">
                          How do I style my hair in winter
                          <img className="ml-2" src={orangePin} alt="pin" />
                        </h4>
                        <div className="flex">
                          <h4 className="text-sm text-gray-400 font-normal">
                            Serena Williams
                          </h4>
                          <p className="ml-2 text-gray-200 font-normal text-sm">
                            5 comments · 23 10 2022
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="-space-x-6 mr-4">
                        <img
                          src={pix1}
                          alt="pix1"
                          className="relative z-10 inline object-cover w-10 h-10"
                        />
                        <img
                          src={pix2}
                          alt="pix2"
                          className="relative z-20 inline object-cover w-10 h-10"
                        />
                        <img
                          src={pix3}
                          alt="pix3"
                          className="relative z-30 inline object-cover w-10 h-10"
                        />
                      </div>
                      <div className="">
                        <img src={bookmark} alt="bookmark" className="" />
                      </div>
                    </div>
                  </div>
                  {getQuestions.map((question) => {
                    return (
                      <div
                        key={question._id}
                        className="cursor-pointer flex mb-5 align-center justify-between border-gray-100 rounded-md shadow p-4"
                      >
                        <div className="flex">
                          <img src={serena} alt="serena" />
                          <div className="flex flex-col ml-4">
                            <h4
                              onClick={() =>
                                navigate(`/learn/communities/${question._id}`)
                              }
                              className="text-base font-semibold mb-2 text-gray-400"
                            >
                              {question.question}
                            </h4>
                            <div className="flex">
                              <h4 className="text-sm text-gray-400 font-normal">
                                {question.created_by.name}
                              </h4>
                              <div className="flex space-x-3 items-center">
                                <p className="text-sm text-gray-350">
                                  {question.created_by.firstName}{" "}
                                  {question.created_by.lastName}
                                </p>
                                <p className="ml-2 text-gray-200 font-normal text-sm">
                                  {question.comments.length} comments ·{" "}
                                  {moment(question.createdAt).format(
                                    "YYYY-MM-DD"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="-space-x-6 mr-4">
                            <img
                              src={pix1}
                              alt="pix1"
                              className="relative z-10 inline object-cover w-10 h-10"
                            />
                            <img
                              src={pix2}
                              alt="pix2"
                              className="relative z-20 inline object-cover w-10 h-10"
                            />
                            <img
                              src={pix3}
                              alt="pix3"
                              className="relative z-30 inline object-cover w-10 h-10"
                            />
                          </div>
                          <div
                            className=""
                            onClick={() => setSaveQst(!saveQst)}
                          >
                            {saveQst ? (
                              <img
                                src={bookmarkfilled}
                                alt="bookmark"
                                className=""
                              />
                            ) : (
                              <img src={bookmark} alt="bookmark" className="" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <h3 className="text-center text-black text-xl font-BeatriceSemiBold">
                  No content added
                </h3>
              )}
            </div>
          )}
          {activeTab === "pinned" && (
            <div>
              <div className="cursor-pointer flex mb-5 align-center justify-between border bg-orange-50 border-orange-100 rounded-md shadow p-4">
                <div className="flex">
                  <img src={serena} alt="serena" />
                  <div className="flex flex-col ml-4">
                    <h4 className="flex items-center text-base font-semibold mb-2 text-gray-400">
                      How do I style my hair in winter
                      <img className="ml-2" src={orangePin} alt="pin" />
                    </h4>
                    <div className="flex">
                      <h4 className="text-sm text-gray-400 font-normal">
                        Serena Williams
                      </h4>
                      <p className="ml-2 text-gray-200 font-normal text-sm">
                        5 comments · 23 10 2022
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="-space-x-6 mr-4">
                    <img
                      src={pix1}
                      alt="pix1"
                      className="relative z-10 inline object-cover w-10 h-10"
                    />
                    <img
                      src={pix2}
                      alt="pix2"
                      className="relative z-20 inline object-cover w-10 h-10"
                    />
                    <img
                      src={pix3}
                      alt="pix3"
                      className="relative z-30 inline object-cover w-10 h-10"
                    />
                  </div>
                  <div className="">
                    <img src={bookmark} alt="bookmark" className="" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CommunityTab;
