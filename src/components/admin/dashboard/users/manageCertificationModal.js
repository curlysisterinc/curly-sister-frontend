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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import closeModalBtn from "../../../../assets/images/cancel.svg";
import trashIcon from "../../../../assets/images/trash.svg";
import admin from "../../../../api/admin";

function ManageCertificationModal({ handleClose, setIsCertificationUpdate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputList, setInputList] = useState([{ name: "", checked: false }]);
  const [optionList, setOptionList] = useState([
    { option: "", openOption: false },
  ]);

  const { name, checked } = inputList;

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Create certifications";

    return function cleanup() {
      ac.abort();
      setIsCertificationUpdate(false);
    };
  }, []);
  // handle input change
  const handleOptionInputChange = (e, index) => {
    const { name, value } = e.target;
    const option = [...optionList];
    option[index][name] = value;
    setOptionList(option);
  };

  // handle click event of the Remove button
  const handleOptionRemoveClick = (index) => {
    const option = [...optionList];
    option.splice(index, 1);
    setOptionList(option);
  };

  // handle click event of the Add button
  const handleOptionAddClick = () => {
    setOptionList([...optionList, { option: "" }]);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", checked: false }]);
  };

  // handle check
  const handleCheckboxChange = (e, dataIndex) => {
    const { checked } = e.target;
    setInputList(
      inputList.map((certificate, index) => {
        if (index === dataIndex) {
          certificate.checked = checked;
        }
        return certificate;
      })
    );
  };

  const handleToggle = (index) => {
    const mylist = [...inputList];
    if (mylist[index].checked === true) {
      return (
        <div className="w-full  ">
          <hr className="first:border-t ml-8 border-gray-800 w-full " />

          {optionList.map((option, index) => {
            return (
              <div key={index}>
                <div className=" grid grid-cols-12">
                  <input
                    type="text"
                    name="option"
                    className={clsx(
                      optionList.length > 1 ? "col-span-11 " : "col-span-12 ",
                      "col  py-2  border-0 pl-8 w-full text-gray-700 outline-none placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm"
                    )}
                    placeholder="Enter link here"
                    value={option.option}
                    onChange={(e) => handleOptionInputChange(e, index)}
                  />
                  {optionList.length > 1 && (
                    <div
                      onClick={handleOptionRemoveClick}
                      className=" col col-span-1 py-2  cursor-pointer flex items-center justify-center border-l border-gray-800"
                    >
                      <img className="" src={trashIcon} alt="trash icon" />
                    </div>
                  )}
                </div>
                <hr className="border-[0.5] border-gray-800 w-full ml-8 last:border-0" />

                {optionList.length - 1 === index && optionList.length < 4 && (
                  <div
                    onClick={handleOptionAddClick}
                    className="text-purple-100 pl-8 text-sm font-BeatriceRegular py-3 cursor-pointer"
                  >
                    Add new options
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
  };

  const handleSubmit = (e) => {
    console.log("new cert");
    e.preventDefault();
    const list = [...inputList];
    let newName;
    console.log(list);
    const listed = list.map((item) => {
      newName = item.name;
    });

    console.log(newName);
    admin.CreateCertification(newName).then((response) => {
      if (response.status === 200) {
        const res = response.data;

        const newstate = inputList.map((item) => {
          return { ...item, name: "" };
        });
        setIsCertificationUpdate(true);
        setInputList(newstate);
        handleClose();
        console.log(res, "res");
      }
    });
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 left-0 h-full overflow-y-auto z-50 bg-black-100 w-full "
    >
      <div
        className="flex items-start justify-end h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="mt-20 mr-10 bg-white rounded-full p-2"
          onClick={handleClose}
          src={closeModalBtn}
          alt="close button"
        />
        <div className="bg-white min-h-screen  p-10 w-2/5">
          <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
            Certifications
          </h4>
          <p className="text-gray-200 text-base">
            Add and remove certifications
          </p>
          <form>
            {inputList.map((certificate, index) => {
              return (
                <div key={index}>
                  <div className="mt-5 border border-gray-800 rounded-lg overflow-hidden">
                    <div className=" grid grid-cols-12 ">
                      <label
                        htmlFor={certificate.name}
                        className={clsx(
                          inputList.length > 1
                            ? "col-span-7"
                            : "xl:col-span-8 2xl:col-span-9",
                          " "
                        )}
                      >
                        <input
                          type="text"
                          name="name"
                          id={certificate.name}
                          className="col  pl-3 py-2 appearance-none border-0 w-full text-gray-400 placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm"
                          placeholder="Enter link here"
                          value={certificate.name}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </label>
                      <div
                        className={clsx(
                          inputList.length > 1
                            ? "col-span-4"
                            : "xl:col-span-4 2xl:col-span-3",
                          "mr-2 py-2 "
                        )}
                      >
                        <label
                          htmlFor={index + 1}
                          className="flex items-center cursor-pointer"
                        >
                          <span className="mr-3 text-gray-400 text-sm ">
                            Add options
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              onChange={(e) => handleCheckboxChange(e, index)}
                              id={index + 1}
                              checked={certificate.checked}
                              className="sr-only"
                            />
                            <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" />
                          </div>
                        </label>
                      </div>
                      {inputList.length > 1 && (
                        <div
                          onClick={handleRemoveClick}
                          className=" col col-span-1 py-2  cursor-pointer flex items-center justify-center border-l border-gray-800"
                        >
                          <img className="" src={trashIcon} alt="trash icon" />
                        </div>
                      )}
                    </div>
                    {handleToggle(index)}
                  </div>
                  {inputList.length - 1 === index && inputList.length < 4 && (
                    <div
                      onClick={handleAddClick}
                      className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer"
                    >
                      Add new certification
                    </div>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-6 w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageCertificationModal;
