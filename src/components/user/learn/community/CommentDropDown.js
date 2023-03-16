import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropDown from "components/customdropdown/primitive";
import DropDownMenuContent from "components/customdropdown/primitive/DropDownMenuContent";
import DropDownItem from "components/customdropdown/primitive/DropDownItem";
import { Loadersmall } from "components/loader-component/loader";
import { useAuthContext } from "redux/auth";

import { ReactComponent as KebabIcon } from "../../../../assets/images/kebab.svg";
import trash from "../../../../assets/images/trash.svg";
import edit from "../../../../assets/images/edit.svg";

function CommentDropDownOptions({
  isUserCreatorOfComment,
  isAdmin,
  deleteComment,
}) {
  return (
    <DropDownMenuContent className=" z-40 bg-white  border border-gray-600 shadow-s01  overflow-hidden text-sm text-gray-400 w-44 rounded-2xl  ">
      {/* <DropDownItem>
        <button
          type="button"
          onClick={openEditContentModal}
          className="flex items-center justify-start cursor-pointer text-gray-400 text-sm w-full p-3 hover:bg-gray-50"
        >
          <img src={edit} alt="pin" className="mr-3" />
          <p>Report</p>
        </button>
      </DropDownItem> */}
      {(isUserCreatorOfComment || isAdmin) && (
        <DropDownItem>
          <button
            type="button"
            onClick={deleteComment}
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

function CommentDropDown({ comment, deleteComment, isCommentDeleting }) {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    state: { role, _id },
  } = useAuthContext();

  const isUserCreatorOfComment = useMemo(
    () => _id === comment?.created_by?._id,
    [comment, _id]
  );

  const isAdmin = useMemo(() => role.toLowerCase().includes("admin"), [role]);

  return (
    (isUserCreatorOfComment || isAdmin) && (
      <DropDown
        content={
          <CommentDropDownOptions
            deleteComment={deleteComment}
            isUserCreatorOfComment={isUserCreatorOfComment}
            isAdmin={isAdmin}
          />
        }
      >
        <button
          type="button"
          className="hover:bg-gray-500 rounded-full  flex justify-center items-center p-1 ml-4"
        >
          {isCommentDeleting ? (
            <Loadersmall />
          ) : (
            <KebabIcon height={20} width={20} />
          )}
        </button>
      </DropDown>
    )
  );
}

export default CommentDropDown;
