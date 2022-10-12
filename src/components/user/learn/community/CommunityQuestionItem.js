import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import { NonAuthRoutes } from "constants";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import moment from "moment";
import useDeleteSavedQuestion from "hooks/data/learn/useDeleteSavedQuestion";
import useUnPinQuestion from "hooks/data/learn/useUnPinQuestion";
import useSavedQuestion from "hooks/data/learn/useSavedQuestion";
import { Loadersmall } from "components/loader-component/loader";
import bookmarkfilled from "../../../../assets/images/bookmark-filled.png";
import bookmark from "../../../../assets/images/book-mark.png";
import { ReactComponent as PinIcon } from "../../../../assets/images/pinIcon.svg";
import pix3 from "../../../../assets/images/pix3.png";
import pix2 from "../../../../assets/images/pix2.png";
import pix1 from "../../../../assets/images/pix1.png";
import serena from "../../../../assets/images/serena.png";

export function CommunityQuestionItem({
  question,
  isPinned = false,
  owner = {},
}) {
  const navigate = useNavigate();
  const {
    state: { isSignedIn },
  } = useAuthContext();
  const [saveQst, setSaveQst] = useState(false);

  const {
    isLoading: isSavedQuestionLoading,
    data: SavedQuestionData,
    mutate: SaveQuestion,
  } = useSavedQuestion(question._id);

  const {
    isLoading: isDeleteSavedQuestionLoading,
    data: deleteSavedQuestionData,
    mutate: deleteSavedQuestion,
  } = useDeleteSavedQuestion(question._id);

  const handleNavigate = (item) => {
    if (isSignedIn) {
      return navigate(`/learn/communities/${item._id}`, {
        state: {
          isPinned,
        },
      });
    }
    sessionStorage.setItem("link", `/learn/communities/${item._id}`);
    return navigate(NonAuthRoutes.login);
  };

  const handleClickBookmarkButton = (e, isSaved) => {
    e.stopPropagation();
    if (!isSaved) {
      SaveQuestion();
    } else {
      deleteSavedQuestion();
    }
  };

  const isLoading = isSavedQuestionLoading || isDeleteSavedQuestionLoading;

  const isData = SavedQuestionData || deleteSavedQuestionData;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleNavigate(question)}
      onKeyPress={(e) =>
        runFunctionWhenSpaceOrEnterIsClicked(e, handleNavigate(question))
      }
      className={`cursor-pointer flex mb-5 align-center justify-between border rounded-2xl shadow-s01 p-6 ${
        isPinned ? " bg-orange-400 border-orange-200" : "border-gray-600"
      } `}
    >
      <div className="flex">
        <img src={serena} alt="serena" />
        <div className="flex flex-col ml-4">
          <h4 className="text-base font-semibold mb-2 text-gray-400 flex">
            {question?.title ?? question?.question}{" "}
            {isPinned && <PinIcon className="ml-3" />}
          </h4>
          <div className="flex">
            <h4 className="text-sm text-gray-400 font-normal">
              {owner?.firstName ?? question.created_by?.firstName}{" "}
              {owner?.lastName ?? question.created_by?.lastName}
            </h4>
            <p className="ml-2 text-gray-200 font-normal text-sm">
              · {question.comments.length} comments ·{" "}
              {moment(question.createdAt).format("DD MMM YYYY")}
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
        {isSignedIn && (
          <button
            tabIndex={0}
            type="button"
            className=""
            onClick={(e) => handleClickBookmarkButton(e, question.is_saved)}
            onKeyPress={(e) =>
              runFunctionWhenSpaceOrEnterIsClicked(e, (a) =>
                handleClickBookmarkButton(a, question.is_saved)
              )
            }
          >
            {isLoading && <Loadersmall />}
            {!isLoading && question.is_saved ? (
              <img src={bookmarkfilled} alt="bookmark" className="" />
            ) : (
              <img src={bookmark} alt="bookmark" className="" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
