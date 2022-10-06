import React, { useState, useMemo, useEffect } from "react";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
// import DropDown from "../../../primitive";
import DropDown from "components/customdropdown/primitive";
import DropDownMenuContent from "components/customdropdown/primitive/DropDownMenuContent";
import DropDownItem from "components/customdropdown/primitive/DropDownItem";
// import KebabIcon from "../../../../assets/images/kebab.svg";
import { Loadersmall } from "components/loader-component/loader";
import { useAuthContext } from "redux/auth";
import usePinQuestion from "hooks/data/learn/usePinQuestion";
import useUnPinQuestion from "hooks/data/learn/useUnPinQuestion";
import useDeleteQuestion from "hooks/data/learn/useDeleteQuestion";
import { ReactComponent as KebabIcon } from "../../../../assets/images/kebab.svg";
import trash from "../../../../assets/images/trash.svg";
import edit from "../../../../assets/images/edit.svg";
import learn from "../../../../api/learn";

function QuestionMoreOptionContent({
  pinQuestion,
  unPinQuestion,
  isUserCreatorOfQuestion,
  isAdmin,
  deleteQuestion,
  openEditQuestionModal,
}) {
  const [isQuestionPinned, setIsQuestionPinned] = useState(false);

  return (
    <DropDownMenuContent className=" z-40 bg-white  border border-gray-600 shadow-s01  overflow-hidden text-sm text-gray-400 w-44 rounded-2xl  ">
      {isAdmin && (
        <DropDownItem>
          <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm w-full p-3 hover:bg-gray-50">
            <button
              type="button"
              className="flex items-center space-x-3"
              //   onClick={pinQuestion}
              onClick={!isQuestionPinned ? pinQuestion : unPinQuestion}
            >
              {!isQuestionPinned ? (
                <>
                  <BsPinAngle width={24} size={24} height={24} />
                  <p className="">Pin</p>
                </>
              ) : (
                <>
                  <BsPinAngleFill width={24} size={24} height={24} />
                  <p className="">Unpin</p>
                </>
              )}
            </button>
          </div>
        </DropDownItem>
      )}

      <DropDownItem>
        <button
          type="button"
          onClick={openEditQuestionModal}
          className="flex items-center justify-start cursor-pointer text-gray-400 text-sm w-full p-3 hover:bg-gray-50"
        >
          <img src={edit} alt="pin" className="mr-3" />
          <p>Edit</p>
        </button>
      </DropDownItem>
      {(isUserCreatorOfQuestion || isAdmin) && (
        <DropDownItem>
          <button
            type="button"
            onClick={deleteQuestion}
            className="flex items-center justify-start cursor-pointer text-red-400 text-sm w-full p-3 hover:bg-gray-50"
          >
            <img src={trash} alt="pin" className="mr-3" />
            <p>Delete</p>
          </button>
        </DropDownItem>
      )}
    </DropDownMenuContent>
  );
}

function QuestionMoreOptionDropDown({ question, openEditQuestionModal }) {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    state: { role, _id },
  } = useAuthContext();

  const {
    isLoading: isPinQuestionLoading,
    data: pinQuestionData,
    mutate: pinQuestion,
  } = usePinQuestion(token);

  const {
    isLoading: isUnPinQuestionLoading,
    data: unPinQuestionData,
    mutate: unPinQuestion,
  } = useUnPinQuestion(token);
  const {
    isLoading: isBeleteQuestionLoading,
    data: deleteQuestionData,
    mutate: deleteQuestion,
  } = useDeleteQuestion(token);

  useEffect(() => {
    if (deleteQuestionData) navigate(-1);
  }, [deleteQuestionData]);

  const isLoading =
    isUnPinQuestionLoading || isPinQuestionLoading || isBeleteQuestionLoading;
  const isUserCreatorOfQuestion = useMemo(
    () => _id === question?.created_by?._id,
    [question, _id]
  );

  const isAdmin = useMemo(() => role.toLowerCase().includes("admin"), [role]);

  return (
    (isUserCreatorOfQuestion || isAdmin) && (
      <DropDown
        content={
          <QuestionMoreOptionContent
            pinQuestion={pinQuestion}
            unPinQuestion={unPinQuestion}
            deleteQuestion={deleteQuestion}
            isLoading={isLoading}
            isUserCreatorOfQuestion={isUserCreatorOfQuestion}
            isAdmin={isAdmin}
            openEditQuestionModal={openEditQuestionModal}
          />
        }
      >
        <button
          type="button"
          className="hover:bg-gray-500 rounded-full  flex justify-center items-center p-1 ml-4"
        >
          {isLoading ? <Loadersmall /> : <KebabIcon height={20} width={20} />}
        </button>
      </DropDown>
    )
  );
}

export default QuestionMoreOptionDropDown;
