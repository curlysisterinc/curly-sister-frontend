import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import { NonAuthRoutes } from "constants";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import moment from "moment";
import bookmarkfilled from "../../../../assets/images/bookmark-filled.png";
import bookmark from "../../../../assets/images/book-mark.png";
import play from "../../../../assets/images/play-btn.svg";
import pix3 from "../../../../assets/images/pix3.png";
import pix2 from "../../../../assets/images/pix2.png";
import pix1 from "../../../../assets/images/pix1.png";
import serena from "../../../../assets/images/serena.png";

export function CommunityQuestionItem({ question }) {
  const navigate = useNavigate();
  const {
    state: { isSignedIn },
  } = useAuthContext();
  const [saveQst, setSaveQst] = useState(false);

  const handleNavigate = (item) => {
    return navigate(`/learn/communities/${item._id}`);
  };

  return (
    <div
      key={question._id}
      className="cursor-pointer flex mb-5 align-center justify-between border-gray-100 rounded-md shadow p-4"
    >
      <div className="flex">
        <img src={serena} alt="serena" />
        <div className="flex flex-col ml-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate(question)}
            onKeyPress={(e) =>
              runFunctionWhenSpaceOrEnterIsClicked(e, handleNavigate(question))
            }
          >
            <h4 className="text-base font-semibold mb-2 text-gray-400">
              {question?.title ?? question?.question}
            </h4>
          </div>
          <div className="flex">
            <h4 className="text-sm text-gray-400 font-normal">
              {question.created_by.firstName} {question.created_by.lastName}
            </h4>
            <p className="ml-2 text-gray-200 font-normal text-sm">
              · {question.comments.length} comments ·{" "}
              {moment(question.createdAt).format("YYYY-MM-DD")}
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
        <div
          tabIndex={0}
          role="button"
          className=""
          onClick={() => setSaveQst(!saveQst)}
          onKeyPress={(e) =>
            runFunctionWhenSpaceOrEnterIsClicked(e, setSaveQst(!saveQst))
          }
        >
          {saveQst ? (
            <img src={bookmarkfilled} alt="bookmark" className="" />
          ) : (
            <img src={bookmark} alt="bookmark" className="" />
          )}
        </div>
      </div>
    </div>
  );
}
