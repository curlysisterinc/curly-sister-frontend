/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";
import useUpdateStylist from "hooks/data/admin/useUpdateStylist";
import useCreateTags from "hooks/data/admin/useCreateTags";
import useUpdateTag from "hooks/data/admin/useUpdateTag";
import { Loadersmall } from "components/loader-component/loader";
import closeModalBtn from "../../../../assets/images/cancel.svg";
import trashIcon from "../../../../assets/images/trash.svg";
import admin from "../../../../api/admin";

function ManageTagModal({ handleClose, setIsTagUpdate, tags }) {
  const {
    isLoading: isCreateTagsLoading,
    data: createTagsData,
    isError: createTagsError,
    refetch: createTagsRefetch,
    mutateAsync: createTag,
  } = useCreateTags();

  const {
    isLoading: isUpdateTagsLoading,
    data: updateTagsData,
    isError: updateTagsError,
    refetch: updateTagsRefetch,
    mutateAsync: updateTag,
  } = useUpdateTag();

  const { id: stylistId } = useParams();
  const {
    isLoading: isStylistUpdateLoading,
    data: stylistUpdateData,
    isError: stylistUpdateError,
    mutate: updateStylist,
  } = useUpdateStylist(stylistId);

  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    if (tags?.length) {
      const newTags = tags.map((item) => {
        return { ...item, checked: false };
      });
      setInputList(newTags);
    }
  }, [tags]);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Create tags";

    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    if (stylistUpdateData) {
      handleClose();
    }
  }, [stylistUpdateData]);

  // handle input change
  const handleInputChange = (e, _id) => {
    const { value } = e.target;
    const newTag = inputList.map((tag) => {
      const newTag = tag;
      if (tag._id === _id) {
        newTag[e.target.name] = value;
      }
      return newTag;
    });
    setInputList(newTag);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (id) => {
    const list = inputList.filter((item) => item._id !== id);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { _id: new Date().getTime(), name: "", checked: false },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTags = inputList.map((item) => {
      const { name, _id } = item;
      return {
        name,
        _id,
      };
    });
    createOrUpdateTags(newTags);
  };

  const disableTagbutton = () => {
    const isDisabled = inputList.some((item) => item.name === "");
    return (
      isDisabled ||
      isCreateTagsLoading ||
      isStylistUpdateLoading ||
      isUpdateTagsLoading
    );
  };

  const createOrUpdateTags = async (tags) => {
    try {
      const result = await Promise.allSettled(
        tags.map((tag) => {
          console.log(tag);
          // because user created id's are numbers while server creted are strings
          if (typeof tag._id === "number") {
            const { name } = tag;
            return createTag(tag.name);
          }
          const { _id, ...rest } = tag;
          return updateTag({ ...rest, tagId: _id });
        })
      );

      const successResult =
        result.length &&
        result
          .filter((item) => item.status === "fulfilled")
          .map(
            (success) =>
              success?.value?.data?.data?.tag?._id ??
              success?.value?.data?.data?.tags?._id
          );

      if (successResult.length)
        updateStylist({ tags: successResult, id: stylistId });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={handleClose}
      className=" fixed top-0 left-0 h-full overflow-y-auto z-50 bg-black-100 w-full z-500"
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
            Tags
          </h4>
          <p className="text-gray-200 text-base mb-10">Add and remove tags</p>
          <form onSubmit={handleSubmit}>
            {inputList.map((tag, index) => {
              const { _id, name } = tag;
              return (
                <div key={_id}>
                  <div className="mt-5 flex">
                    <div className="flex flex-1 border border-gray-800 rounded-lg overflow-hidden">
                      <label htmlFor={name}>
                        <input
                          type="text"
                          name="name"
                          id={name}
                          className="appearance-none border-0  text-gray-400 placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm w-full h-12"
                          placeholder="Enter link here"
                          value={name}
                          onChange={(e) => handleInputChange(e, _id)}
                        />
                      </label>
                    </div>
                    <div
                      onClick={() => handleRemoveClick(_id)}
                      className=" col col-span-1 py-2  cursor-pointer flex items-center justify-center border-0 border-gray-800 w-10"
                    >
                      <img className="" src={trashIcon} alt="trash icon" />
                    </div>
                  </div>
                </div>
              );
            })}

            {(!inputList.length || inputList.length < 10) && (
              <div
                onClick={handleAddClick}
                className="text-purple-100 text-sm font-BeatriceRegular my-5 cursor-pointer"
              >
                Add new tag
              </div>
            )}
            {!!inputList.length && (
              <button
                type="submit"
                disabled={disableTagbutton()}
                className="w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold disabled:opacity-60 disabled:cursor-not-allowed "
              >
                {isCreateTagsLoading ||
                isStylistUpdateLoading ||
                isUpdateTagsLoading ? (
                  <Loadersmall />
                ) : (
                  "Save changes"
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageTagModal;
