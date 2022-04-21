/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { weekList } from "./data";
import dash from "../../../../assets/images/dash.svg";
import cancel from "../../../../assets/images/cancel.svg";

function AvailabilityTab() {
  const [inputList, setInputList] = useState([
    {
      timezone: "GMT +1: Central European Time",
      timeInAm: "09:00 Am",
      timeInPm: "05:00 PM",
    },
  ]);
  const [dateRangeList, setDateRangeList] = useState([{ dateRange: "" }]);
  const [days, setDays] = useState(weekList);
  const { timezone } = inputList;

  const changeTimeZone = (event, dataIndex) => {
    setInputList(
      inputList.map((value, index) => {
        if (index === dataIndex) {
          value.timezone = event.target.value;
        }
      })
    );
  };
  const changeTimeInAm = (event, dataIndex) => {
    setInputList(
      inputList.map((value, index) => {
        if (index === dataIndex) {
          value.timeInAm = event.target.value;
        }
      })
    );
    // setInputList({ ...inputList, timeInAm: event.target.value });
  };
  const changeTimeInPm = (event, dataIndex) => {
    setInputList(
      inputList.map((value, index) => {
        if (index === dataIndex) {
          value.timeInPm = event.target.value;
        }
      })
    );
  };
  const onDayCheck = (e, data) => {
    const { checked } = e.target;
    setDays(
      days.map((day) => {
        if (day.id === data.id) {
          day.selected = checked;
        }
        return day;
      })
    );
  };

  // // handle click event of the Remove button
  // const handleRemoveClick = (index) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        timezone: "GMT +1: Central European Time",
        timeInAm: "09:00 Am",
        timeInPm: "05:00 PM",
      },
    ]);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddRangeClick = () => {
    setDateRangeList([
      ...dateRangeList,
      {
        dateRange: "",
      },
    ]);
  };

  // handle click event of the Remove button
  const handleRemoveRangeClick = (index) => {
    const list = [...dateRangeList];
    list.splice(index, 1);
    setDateRangeList(list);
  };
  return (
    <div className="mt-5">
      <label htmlFor="timezone">
        TimeZone
        <select
          id="timezone"
          value={timezone}
          onChange={changeTimeZone}
          name="timezone"
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Gmt">GMT +1: Central European Time</option>
          <option value="Gmtt">GMT +1: Central European Time</option>
        </select>
      </label>
      <div className="mt-5">
        <p className="text-gray-400 text-sm mb-3">Recurring time ranges</p>
        {inputList.map((list, index) => {
          return (
            <>
              <div className="flex items-center justify-between mb-5 relative">
                {inputList.length > 1 && (
                  <div
                    onClick={handleRemoveClick}
                    className=" col col-span-1 py-2  cursor-pointer flex items-center justify-center border-l border-gray-800"
                  >
                    <img
                      className="absolute -right-10"
                      src={cancel}
                      alt="trash icon"
                    />
                  </div>
                )}
                {/* weekday list */}
                <div className="flex justify-center">
                  {days.map((day) => {
                    return (
                      <div key={day.id} className="mr-6">
                        <label
                          className="flex flex-col justify-center items-center text-gray-800"
                          htmlFor={day.id}
                        >
                          <input
                            className="form-check-input appearance-none h-5 w-5 rounded-md border border-gray-300 bg-white checked:bg-purple-100 checked:border-purple-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain  cursor-pointer"
                            type="checkbox"
                            id={day.id}
                            checked={day.selected}
                            onChange={(e) => onDayCheck(e, day)}
                          />
                          <p className="text-sm text-gray-400 mt-4">
                            {day.day}
                          </p>
                        </label>
                      </div>
                    );
                  })}
                </div>
                {/* time dropdown */}
                <div className="flex items-center">
                  <select
                    id="time1"
                    value={list.timeInAm}
                    onChange={changeTimeInAm}
                    name="timeAm"
                    className="shadow-sm appearance-none border border-gray-800 rounded w-32 py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="1am">01:00 AM</option>
                    <option value="2am">02:00 AM</option>
                    <option value="3am">03:00 AM</option>
                    <option value="4am">04:00 AM</option>
                    <option value="5am">05:00 AM</option>
                    <option value="6am">06:00 AM</option>
                    <option value="7am">07:00 AM</option>
                    <option value="8am">08:00 AM</option>
                    <option value="9am">09:00 AM</option>
                    <option value="10am">10:00 AM</option>
                    <option value="11am">11:00 AM</option>
                  </select>
                  <img className="mx-2" src={dash} alt="" />
                  <select
                    id="time2"
                    value={list.timeInPm}
                    onChange={changeTimeInPm}
                    name="timePm"
                    className="shadow-sm appearance-none border border-gray-800 rounded w-32 py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="12pm">12:00 PM</option>
                    <option value="1pm">01:00 PM</option>
                    <option value="2pm">02:00 PM</option>
                    <option value="3pm">03:00 PM</option>
                    <option value="4pm">04:00 PM</option>
                    <option value="5pm">05:00 PM</option>
                    <option value="6pm">06:00 PM</option>
                    <option value="7pm">07:00 PM</option>
                    <option value="8pm">08:00 PM</option>
                    <option value="9pm">09:00 PM</option>
                    <option value="10pm">10:00 PM</option>
                    <option value="11pm">11:00 PM</option>
                  </select>
                </div>
              </div>
              {inputList.length - 1 === index && inputList.length < 4 && (
                <div
                  onClick={handleAddClick}
                  className="text-purple-100 text-sm mt-4 cursor-pointer"
                >
                  Add another recurring time range
                </div>
              )}
            </>
          );
        })}
      </div>
      <hr className="border border-gray-800 w-full my-6" />
      <div className="">
        <p className="text-gray-400 text-sm mb-3">Blocked dates</p>
        <div>
          {dateRangeList.map((list, index) => {
            return (
              <>
                <div className="relative">
                  {dateRangeList.length > 1 && (
                    <div
                      onClick={handleRemoveRangeClick}
                      className="  cursor-pointer"
                    >
                      <img
                        className="absolute -right-10 top-1/2"
                        src={cancel}
                        alt="trash icon"
                      />
                    </div>
                  )}

                  <input
                    type="date"
                    placeholder="Monday, 01 April 2022 — Saturday, 22 May 2022"
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {dateRangeList.length - 1 === index &&
                  dateRangeList.length < 4 && (
                    <div
                      onClick={handleAddRangeClick}
                      className="text-purple-100 text-sm mt-4 cursor-pointer"
                    >
                      Add another blocked date range
                    </div>
                  )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AvailabilityTab;
