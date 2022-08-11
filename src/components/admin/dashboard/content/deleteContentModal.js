/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import closeModalBtn from "../../../../assets/images/cancel.svg";

function DeleteContentModal({ handleClose, handleDelete }) {
  return (
    <div
      onClick={handleClose}
      className=" fixed top-0 left-0 h-full overflow-y-auto z-50 bg-black-100 w-full flex  justify-end items-center"
    >
      <div
        className="flex flex-col items-center w-full mx-auto h-full mt-40"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="mb-10 bg-white rounded-full p-2 w-10 h-10 "
          onClick={handleClose}
          src={closeModalBtn}
          alt="close button"
        />
        <div className="bg-white rounded-xl p-10 w-2/5">
          <h4>Delete content</h4>
          <p>
            Are you sure you want to delete this content? This action is
            permanent and cannot be reversed.
          </p>
          <div className="flex space-x-6 mt-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full w-1/2 text-sm border border-gray-250 py-3"
            >
              Nevermind, go back
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-full w-1/2 text-sm bg-red-400 text-white py-3"
            >
              Yes, delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteContentModal;
