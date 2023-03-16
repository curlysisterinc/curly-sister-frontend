/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import useCreateVideoCategory from "hooks/data/admin/useCreateVideoCategory";
import useUpdateVideoCategory from "hooks/data/admin/useUpdateVideoCategory";
import useDeleteVideoCategory from "hooks/data/admin/useDeleteVideoCategory";
import { Loadersmall } from "components/loader-component/loader";
import differenceWith from "lodash.differencewith";
import closeModalBtn from "../../../../../assets/images/cancel.svg";
import trashIcon from "../../../../../assets/images/trash.svg";
import admin from "../../../../../api/admin";

function NewVideoCategory({ handleClose, videoCategories }) {
  const [inputList, setInputList] = useState([]);
  const [localInputList, setLocalInputList] = useState([]);
  const [currentClickedInput, setCurrentClickedInput] = useState("");

  const {
    isLoading: isCreateVideoCategoryLoading,
    data: createVideoCategoryData,
    isError: createVideoCategoryError,
    refetch: createVideoCategoryRefetch,
    mutateAsync: createVideoCategory,
  } = useCreateVideoCategory();

  const {
    isLoading: isUpdateVideoCategoryLoading,
    data: updateVideoCategoryData,
    isError: updateVideoCategoryError,
    refetch: updateVideoCategoryRefetch,
    mutateAsync: updateVideoCategory,
  } = useUpdateVideoCategory();

  const {
    isLoading: isDeleteVideoCategoryLoading,
    data: deleteVideoCategoryData,
    isError: deleteVideoCategoryError,
    refetch: deleteVideoCategoryRefetch,
    mutate: deleteVideoCategory,
  } = useDeleteVideoCategory();

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Create tags";

    if (videoCategories.length) {
      setInputList([...videoCategories, ...localInputList]);
      setLocalInputList([]);
    } else {
      setInputList({ name: "", _id: new Date().getTime() });
    }
    return function cleanup() {
      ac.abort();
    };
  }, [videoCategories]);

  // handle input change
  const handleInputChange = (e, cat) => {
    const { name, value } = e.target;
    const newList = inputList.map((item) => {
      if (item._id === cat._id) {
        return { ...item, name: value };
      }
      return item;
    });
    setInputList(newList);
  };

  // handle click event of the Remove button
  const removeCategory = (cat) => {
    setCurrentClickedInput(cat._id);
    const list = [...inputList];
    const index = list.findIndex((item) => item._id === cat._id);
    const isLocal = typeof cat._id === "number";
    if (isLocal) {
      list.splice(index, 1);
      setInputList(list);
    } else {
      // set new local input list so that when the server own refresh we can just append this local ones
      const newLocalInputList = inputList.filter(
        (item) => typeof item._id === "number"
      );
      setLocalInputList(newLocalInputList);
      deleteVideoCategory(cat._id);
    }
  };

  // handle click event of the Add button
  const addNewCategory = () => {
    const newInputList = inputList.length ? [...inputList] : [];
    newInputList.push({ name: "", _id: new Date().getTime() });
    setInputList(newInputList);
  };

  const createOrUpdateVideoCategory = async (list) => {
    try {
      const result = await Promise.allSettled(
        list.map((item) => {
          // because user created id's are numbers while server creted are strings
          if (typeof item._id === "number") {
            return createVideoCategory(item.name);
          }
          const { _id, ...rest } = item;
          return updateVideoCategory({ ...rest, videoCategoryId: _id });
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const differentArrays = useMemo(
    () => differenceWith(inputList, videoCategories),
    [inputList, videoCategories]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrUpdateVideoCategory(differentArrays);
  };

  const handleDisabled = useMemo(() => {
    return (
      !inputList.length ||
      !differentArrays.length ||
      inputList.some((item) => item.name.trim() === "")
    );
  }, [inputList]);

  return (
    <div
      onClick={handleClose}
      className=" fixed top-0 left-0 h-full overflow-y-auto z-200 bg-black-100 w-full"
    >
      <div
        className="flex items-start justify-end h-full w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={handleClose}>
          <img
            className="mt-20 mr-10 bg-white rounded-full p-2"
            src={closeModalBtn}
            alt="close button"
          />
        </button>
        <div className="bg-white min-h-screen p-10 w-full max-w-480">
          <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
            Video categories
          </h4>
          <p className="text-gray-200 text-base">Add video categories</p>
          <form onSubmit={handleSubmit}>
            {/* <div className="w-full">
              <label htmlFor="category">
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="mt-5 w-full border border-gray-800 rounded-lg"
                  placeholder="Enter name of category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </label>
            </div> */}
            <div className="max-h-screen-250px overflow-auto">
              {inputList.length &&
                inputList.map((category, index) => {
                  return (
                    <div key={index}>
                      <div className="mt-5 border border-gray-800 rounded-lg overflow-hidden">
                        <div className=" flex ">
                          <input
                            type="text"
                            name="name"
                            className={clsx(
                              "col-span-11",
                              "col  pl-4 py-3 appearance-none border-0 w-full text-gray-400 placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm"
                            )}
                            placeholder="Enter name of category"
                            value={category.name}
                            onChange={(e) => handleInputChange(e, category)}
                            disabled={
                              isUpdateVideoCategoryLoading ||
                              isCreateVideoCategoryLoading
                            }
                          />

                          <button
                            type="button"
                            onClick={() => removeCategory(category)}
                            className=" col col-span-1 w-12  cursor-pointer flex items-center justify-center border-l border-gray-800
                         disabled:cursor-not-allowed "
                            disabled={
                              isUpdateVideoCategoryLoading ||
                              isCreateVideoCategoryLoading
                            }
                          >
                            {(currentClickedInput &&
                              isDeleteVideoCategoryLoading) === category._id ? (
                              <Loadersmall />
                            ) : (
                              <img
                                className=""
                                src={trashIcon}
                                alt="trash icon"
                                width={24}
                                height={24}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <button
              type="button"
              onClick={addNewCategory}
              className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer"
            >
              Create a new category
            </button>
            <button
              type="submit"
              className="mt-6 w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={
                handleDisabled ||
                isUpdateVideoCategoryLoading ||
                isCreateVideoCategoryLoading
              }
            >
              {isCreateVideoCategoryLoading || isUpdateVideoCategoryLoading ? (
                <Loadersmall />
              ) : (
                "Save changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewVideoCategory;
