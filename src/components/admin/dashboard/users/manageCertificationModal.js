/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { useState } from "react";
import closeModalBtn from "../../../../assets/images/close-modal.svg";
import trashIcon from "../../../../assets/images/trash.svg";

function ManageCertificationModal({ handleClose }) {
  const [inputList, setInputList] = useState([
    { certification: "", checked: true },
  ]);
  const [optionList, setOptionList] = useState([
    { option: "", openOption: false },
  ]);
  const [isClicked, setIsClicked] = useState({});
  const [openOptions, setOpenOptions] = useState(false);
  const [checkId, setCheckId] = useState(1);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);
  const toggleOn = "transition transform-none";
  const toggleOff = "transition transform translate-x-5";

  // handle check
  const handleClick = (event, index) => {
    const { id, checked } = event.target;
    console.log(checked, id);
    const newData = [...inputList];
    newData.splice(index, 1, {
      certification: inputList[index].certification,
      checked: !inputList[index].checked,
    });
    setInputList((state) => ({
      ...state[index].checked, // <-- copy previous state
      [index]: !state[index].checked, // <-- update value by index key
    }));
    setCheckedArray([...checkedArray, id]);
    if (!checked) {
      setCheckedArray(checkedArray.filter((item) => item !== id));
    }
  };
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
    setInputList([...inputList, { certification: "", checked: false }]);
  };

  // handle checkbox toggle
  const toggleOptions = (index) => {
    setIsClicked((state) => ({
      ...state, // <-- copy previous state
      [index]: !state[index], // <-- update value by index key
    }));
    setOpenOptions(!openOptions);
    // setCheckId((checkId) => checkId + 1);

    // check(event) {
    //      console.log(event.checked) // true or false
    // }
  };

  return (
    <div
      onClick={handleClose}
      className=" fixed top-0 left-0 h-full bg-black-100 w-full flex  justify-end items-center"
    >
      <section className="" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start">
          <img
            className="mt-10 mr-10"
            onClick={handleClose}
            src={closeModalBtn}
            alt="close button"
          />
          <div className="bg-white h-screen p-10">
            <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
              Certifications
            </h4>
            <p className="text-gray-200 text-base">
              Add and remove certifications
            </p>
            {inputList.map((certificate, index) => {
              return (
                <div key={index}>
                  <div className="mt-5 border border-gray-800 rounded-lg overflow-hidden">
                    <div className=" grid grid-cols-12 ">
                      <input
                        type="text"
                        name="certification"
                        className="col col-span-7 pl-3 py-2 appearance-none border-0 w-full text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                        placeholder="Enter Link Here"
                        value={certificate.certification}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                      <div className="col col-span-4 mr-2 py-2">
                        <label
                          htmlFor={index + 1}
                          className="flex items-center cursor-pointer"
                        >
                          <span className="mr-3 text-gray-900 text-sm font-medium">
                            Add Options
                          </span>
                          {openOptions ? (
                            <div
                              className="w-12 h-7 flex items-center bg-purple-600 rounded-full p-1 cursor-pointer"
                              onClick={() => toggleOptions(index)}
                            >
                              <div
                                className={`bg-white h-5 w-5 rounded-full shadow-md transition transform translate-x-5 ${
                                  isClicked[index] ? toggleOff : null
                                }`}
                              />
                            </div>
                          ) : (
                            <div
                              className="w-12 h-7 flex items-center bg-purple-600 rounded-full p-1 cursor-pointer"
                              id={index + 1}
                              onClick={() => toggleOptions(index)}
                            >
                              <div
                                className={`bg-white h-5 w-5 rounded-full shadow-md transition transform ${
                                  isClicked[index] ? toggleOn : null
                                }`}
                              />
                            </div>
                          )}

                          {/* <div className="relative">
                            <input
                              type="checkbox"
                              name={index + 1}
                              onChange={(e) => toggleOptions(e, index)}
                              id={index + 1}
                              checked={certificate.checked}
                              className="sr-only"
                            />
                            <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full" />
                          </div> */}
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
                    {/* option list */}
                    {openOptions ? (
                      <div className="w-full">
                        {optionList.map((option, index) => {
                          return (
                            <div key={index}>
                              <hr className="border w-full ml-8 border-gray-800" />

                              <div className=" grid grid-cols-12 ">
                                <input
                                  type="text"
                                  name="option"
                                  className="col col-span-11   pl-8  py-2 appearance-none  w-full text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                                  placeholder="Enter link here"
                                  value={option.option}
                                  onChange={(e) =>
                                    handleOptionInputChange(e, index)
                                  }
                                />
                                {optionList.length > 1 && (
                                  <div
                                    onClick={handleOptionRemoveClick}
                                    className=" col col-span-1 py-2  cursor-pointer flex items-center justify-center border-l border-gray-800"
                                  >
                                    <img
                                      className=""
                                      src={trashIcon}
                                      alt="trash icon"
                                    />
                                  </div>
                                )}
                              </div>
                              {optionList.length - 1 === index &&
                                optionList.length < 4 && (
                                  <div
                                    onClick={handleOptionAddClick}
                                    className="text-purple-100 ml-8 border-t border-gray-800  text-sm font-BeatriceRegular py-3 cursor-pointer"
                                  >
                                    Add new options
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <span />
                    )}
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
              type="submit"
              className="mt-6 w-full py-3 bg-orange-200 rounded-full text-white text-sm"
            >
              Save changes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageCertificationModal;
