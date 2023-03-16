import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import { NonAuthRoutes } from "constants";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import useDeleteSavedQuestion from "hooks/data/learn/useDeleteSavedQuestion";
import useUnPinQuestion from "hooks/data/learn/useUnPinQuestion";
import useSavedQuestion from "hooks/data/learn/useSavedQuestion";
import { Loadersmall } from "components/loader-component/loader";
import dayjs from "dayjs";
import bookmarkfilled from "../../../../assets/images/bookmark-filled.png";
import bookmark from "../../../../assets/images/book-mark.png";
import { ReactComponent as PinIcon } from "../../../../assets/images/pinIcon.svg";

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

  const handleReturnUsersImage = (userQuestion, ownerOfQuestion) => {
    const user =
      typeof userQuestion?.created_by === "string"
        ? ownerOfQuestion
        : userQuestion?.created_by;
    const firstNameLetter = user?.firstName[0].toUpperCase();
    const lastNameLetter = user?.lastName[0].toUpperCase();
    const photo = user?.profile_pic || "";
    return photo ? (
      <img src={photo} alt="user profile avatar" />
    ) : (
      `${firstNameLetter}${lastNameLetter}`
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleNavigate(question)}
      onKeyPress={(e) =>
        runFunctionWhenSpaceOrEnterIsClicked(e, handleNavigate(question))
      }
      className={`cursor-pointer flex  mb-5 align-center justify-between border rounded-2xl shadow-s01 p-6 relative ${
        isPinned ? " bg-orange-400 border-orange-200" : "border-gray-600"
      } `}
    >
      <div className="flex flex-col md:flex-row gap-3">
        <div className="h-14 w-14 rounded-full flex justify-center items-center bg-purple-700 text-white text-22">
          {handleReturnUsersImage(question, owner)}
        </div>
        <div className="flex flex-col  md:ml-4">
          <h4 className="text-base font-semibold mb-2 text-gray-400 flex">
            {question?.title ?? question?.question}{" "}
            {isPinned && <PinIcon className="ml-3" />}
          </h4>
          <div className="flex  gap-1 flex-wrap">
            <h4 className="text-sm text-gray-400 font-normal">
              {owner?.firstName ?? question.created_by?.firstName}{" "}
              {owner?.lastName ?? question.created_by?.lastName}
            </h4>
            <p className="md:ml-2 text-gray-200 font-normal text-sm">
              · {question.comments.length} comments ·{" "}
              {dayjs(question.createdAt).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center absolute md:static right-2 top-2">
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
            {isLoading && (
              <div className="h-8 w-8">
                <Loadersmall />
              </div>
            )}
            {!isLoading &&
              (question.is_saved ? (
                <img src={bookmarkfilled} alt="bookmark" className="" />
              ) : (
                <img src={bookmark} alt="bookmark" className="" />
              ))}
          </button>
        )}
      </div>
    </div>
  );
}
