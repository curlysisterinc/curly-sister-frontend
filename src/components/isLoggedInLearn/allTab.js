/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../constants";
import FooterComponent from "../footer/footer";
import allyn from "../../assets/images/allyn-antoine.png";
import phoebe from "../../assets/images/phoebe-ash.png";
import san from "../../assets/images/san-junipero.png";
import curly1 from "../../assets/images/curly-sister.png";
import oprah from "../../assets/images/oprah-winfrey.png";
import curly2 from "../../assets/images/curly-sister2.png";
import serena from "../../assets/images/serena.png";
import learn from "../../api/learn";

import pix1 from "../../assets/images/pix1.png";
import pix2 from "../../assets/images/pix2.png";
import pix3 from "../../assets/images/pix3.png";

import play from "../../assets/images/play-btn.svg";
import more from "../../assets/images/there's-more.png";
import course from "../../assets/images/course-bg.png";
import bookmark from "../../assets/images/book-mark.png";
import bookmarkfilled from "../../assets/images/bookmark-filled.png";

function AllTab() {
  const navigate = useNavigate();
  const [getQuestions, setGetQuestions] = useState([]);
  const [saveQst, setSaveQst] = useState(false);

  useEffect(async () => {
    learn
      .GetAllQuestions()
      .then((response) => {
        console.log(response.data.data);

        setGetQuestions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="flex mt-20 mb-10 items-center justify-between">
        <h2 className="text-gray-400 text-2xl font-semibold">Popular videos</h2>
        <a href="/" className="text-purple-100 text-sm font-normal">
          View all videos
        </a>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div
          onClick={() => navigate(AuthRoutes.videoContent)}
          className="relative cursor-pointer"
        >
          <img src={allyn} alt="allyn" className="w-full h-full relative" />
          <div className="absolute bg-red-400 top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-400 rounded-2xl" />
          <img
            src={play}
            alt="play"
            className="mx-auto z-2 absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
          />
          <div className="absolute top-0 right-0 mr-4 mt-4 ">
            <img src={bookmark} alt="bookmark" className="p-2" />
          </div>

          <div className="absolute top-0 left-0 mt-4 ml-4 bg-gray-400 bg-opacity-50 rounded-xl">
            <p className="py-1 px-2 text-xs text-white font-normal leading-5">
              15:04
            </p>
          </div>
          <div className="absolute bottom-0 mb-4 ml-4">
            <h5 className="text-white text-base font-semibold">
              How to properly color hair
            </h5>
            <p className="text-white text-opacity-50 text-sm font-normal">
              Allyn Antoine · 9k views · 2 weeks ago
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate(AuthRoutes.videoContent)}
          className="relative cursor-pointer"
        >
          <img src={phoebe} alt="phoebe" className="w-full h-full relative" />
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-400 rounded-2xl" />
          <img
            src={play}
            alt="play"
            className="mx-auto z-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <div className="absolute top-0 right-0 mr-4 mt-4">
            <img src={bookmark} alt="bookmark" className="" />
          </div>
          <div className="absolute top-0 left-0 mt-4 ml-4 bg-gray-400 bg-opacity-50 rounded-xl">
            <p className="py-1 px-2 text-xs text-white font-normal leading-5">
              09:12
            </p>
          </div>

          <div className="absolute bottom-0 mb-4 ml-4">
            <h5 className="text-white text-base font-semibold">
              Imagine a world
            </h5>
            <p className="text-white text-opacity-50 text-sm font-normal">
              Phoebe Ash · 10.5k views · 1 month ago
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate(AuthRoutes.videoContent)}
          className="relative cursor-pointer"
        >
          <img src={san} alt="san" className="w-full h-full relative" />
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-400 rounded-2xl" />
          <img
            src={play}
            alt="play"
            className="mx-auto z-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <div className="absolute top-0 right-0 mr-4 mt-4 ">
            <img src={bookmarkfilled} alt="bookmark" className="" />
          </div>
          <div className="absolute top-0 left-0 mt-4 ml-4 bg-gray-400 bg-opacity-50 rounded-xl">
            <p className="py-1 px-2 text-xs text-white font-normal leading-5">
              00:45
            </p>
          </div>
          <div className="absolute bottom-0 mb-4 ml-4">
            <h5 className="text-white text-base font-semibold">
              Preparing for a session
            </h5>
            <p className="text-white text-opacity-50 text-sm font-normal">
              San Junipero · 12k views · Yesterday
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => navigate(AuthRoutes.videoContent)}
        className="flex mt-20 mb-10 items-center justify-between"
      >
        <h2 className="text-gray-400 text-2xl font-semibold">
          Featured articles
        </h2>
        <a href="/" className="text-purple-100 text-sm font-normal">
          View all articles
        </a>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div
          onClick={() => navigate(AuthRoutes.articleContent)}
          className="bg-white border rounded-2xl border-gray-100 shadow relative"
        >
          <img src={curly1} alt="curly-1" className="relative" />
          <div className="absolute top-0 right-0 mr-4 mt-4 ">
            <img src={bookmark} alt="bookmark" className="p-2" />
          </div>
          <div className="p-4">
            <h2 className="text-sm text-gray-200 font-normal mb-2">
              Curly Sister · 07 Mar 2022
            </h2>
            <h4 className="text-base text-gray-400 font-semibold mb-2">
              7 great tips for refreshing your next day hair
            </h4>
            <p className="text-sm text-gray-200 font-normal">
              The first question of course was, how to get dry again: they had a
              meeting about this, and after a few minutes...
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate(AuthRoutes.articleContent)}
          className="bg-white border rounded-2xl border-gray-100 shadow relative"
        >
          <img src={oprah} alt="oprah" className="relative" />
          <div className="absolute top-0 right-0 mr-4 mt-4 ">
            <img src={bookmarkfilled} alt="bookmark" className="p-2" />
          </div>
          <div className="p-4">
            <h2 className="text-sm text-gray-200 font-normal mb-2">
              Oprah Winfrey · 11 Feb 2022
            </h2>
            <h4 className="text-base text-gray-400 font-semibold mb-2">
              Here&#39;s help for drying your textured hair the right way
            </h4>
            <p className="text-sm text-gray-200 font-normal">
              A speech caused a remarkable sensation among the party. Some of
              the birds hurried off at once to see...
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate(AuthRoutes.articleContent)}
          className="bg-white border rounded-2xl border-gray-100 shadow relative"
        >
          <img src={curly2} alt="curly-2" className="relative" />
          <div className="absolute top-0 right-0 mr-4 mt-4 ">
            <img src={bookmark} alt="bookmark" className="p-2" />
          </div>
          <div className="p-4">
            <h2 className="text-sm text-gray-200 font-normal mb-2">
              Curly Sister · 09 Jan 2022
            </h2>
            <h4 className="text-base text-gray-400 font-semibold mb-2">
              Want to go swimming? Here&#39;s all you need to know first
            </h4>
            <p className="text-sm text-gray-200 font-normal">
              It did so indeed, and much sooner than she had expected. Before
              she had drunk half the bottle, she found...
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-20 mb-10 items-center justify-between">
        <h2 className="text-gray-400 text-2xl font-semibold">
          Latest from community
        </h2>
        <a href="/" className="text-purple-100 text-sm font-normal">
          View all questions
        </a>
      </div>

      <div className="flex flex-col">
        {getQuestions.map((question) => {
          return (
            <div
              key={question.id}
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
                    <p className="ml-2 text-gray-200 font-normal text-sm">
                      {question.comments.length} comments ·{" "}
                      {question.createdAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join(" ")}
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
                <div className="" onClick={() => setSaveQst(!saveQst)}>
                  {saveQst ? (
                    <img src={bookmarkfilled} alt="bookmark" className="" />
                  ) : (
                    <img src={bookmark} alt="bookmark" className="" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 my-20 h-auto">
        <div className="bg-orange-50 border border-orange-150 h-full rounded-xl relative">
          <div className="flex flex-col h-full justify-center relative">
            <div className="w-2/3 pl-10">
              <h2 className="text-gray-400 text-2xl font-bold mb-2">
                There's more
              </h2>
              <p className="text-gray-200 text-sm font-normal">
                It was high time to go, for the pool was getting quite crowded
              </p>
              <a
                href="/"
                className="text-white inline-block rounded-3xl bg-gray-400 text-sm font-semibold px-4 py-2 mt-3"
              >
                Visit blog
              </a>
            </div>
            <div className="w-1/2 absolute right-0 h-full">
              <img
                src={more}
                alt="shocked woman"
                className="w-full object-cover h-full "
              />
            </div>
          </div>
        </div>
        <div className="bg-purple-200 rounded-xl relative">
          <div className="flex flex-col h-full justify-center relative py-10">
            <div className="w-55 pl-10">
              <h2 className="text-white text-2xl font-bold leading-9 mb-2">
                Here&#39;s the name of the course
              </h2>
              <p className="text-white text-opacity-80 text-sm font-normal">
                Luckily for her, the little magic bottle had now had its effect
              </p>
              <a
                href="/"
                className="text-white inline-block rounded-3xl bg-purple-100 text-sm font-semibold px-4 py-2 mt-3"
              >
                View courses
              </a>
            </div>
            <div className="w-1/2 absolute right-0 h-full">
              <img
                src={course}
                alt="shocked woman"
                className="w-full object-cover h-full "
              />
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default AllTab;
