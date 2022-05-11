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
import clsx from "clsx";
import closeModalBtn from "../../../../../assets/images/cancel.svg";
import trashIcon from "../../../../../assets/images/trash.svg";

function NewVideoCategory({ handleClose }) {
  const [inputList, setInputList] = useState([{ name: "" }]);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Create tags";

    // if (authenticated === null) {
    //   navigate(NonAuthRoutes.login);
    // } else {
    //   navigate(AuthRoutes.home);
    // }

    return function cleanup() {
      ac.abort();
    };
  }, []);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const removeCategory = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const addNewCategory = () => {
    setInputList([...inputList, { name: "" }]);
  };

  return (
    <div
      onClick={handleClose}
      className=" fixed top-0 left-0 h-full overflow-y-auto z-50 bg-black-100 w-full"
    >
      <div
        className="flex items-start justify-end h-full w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="mt-20 mr-10 bg-white rounded-full p-2"
          onClick={handleClose}
          src={closeModalBtn}
          alt="close button"
        />
        <div className="bg-white min-h-screen p-10 w-1/3">
          <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
            Video categories
          </h4>
          <p className="text-gray-200 text-base">
            Add and remove video categories
          </p>
          <form>
            {inputList.map((category, index) => {
              return (
                <div key={index}>
                  <div className="mt-5 border border-gray-800 rounded-lg overflow-hidden">
                    <div className=" grid grid-cols-12 ">
                      <input
                        type="text"
                        name="name"
                        className={clsx(
                          inputList.length > 1 ? "col-span-11" : "col-span-12",
                          "col  pl-3 py-2 appearance-none border-0 w-full text-gray-700 placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm"
                        )}
                        placeholder="Enter name of category"
                        value={category.name}
                        onChange={(e) => handleInputChange(e, index)}
                      />

                      {inputList.length > 1 && (
                        <div
                          onClick={removeCategory}
                          className=" col col-span-1 py-2  cursor-pointer flex items-center justify-center border-l border-gray-800"
                        >
                          <img className="" src={trashIcon} alt="trash icon" />
                        </div>
                      )}
                    </div>
                  </div>
                  {inputList.length - 1 === index && inputList.length < 4 && (
                    <div
                      onClick={addNewCategory}
                      className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer"
                    >
                      Create a new category
                    </div>
                  )}
                </div>
              );
            })}
            <button
              type="submit"
              className="mt-6 w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold"
              onClick={handleClose}
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewVideoCategory;
