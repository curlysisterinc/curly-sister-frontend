/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */

import React, { useEffect, useMemo, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays as addDaysfn } from "date-fns";
import { useLocation } from "react-router-dom";
import cancel from "../../../../../assets/images/cancel.svg";
import TimeRange from "./availablity/timeRange";
import DaysRange from "./availablity/daysRange";
import admin from "../../../../../api/admin";
import { Select, SelectItem } from "../../../../customSelect";

function AvailabilityTab({ ariaHidden, idx, setActiveTab, state, dispatch }) {
  const [availabledays, setAvailabledays] = useState([
    { day: "Mon", available: true, triggerby: "" },
    { day: "Tue", available: true, triggerby: "" },
    { day: "Wed", available: true, triggerby: "" },
    { day: "Thu", available: true, triggerby: "" },
    { day: "Fri", available: true, triggerby: "" },
    { day: "Sat", available: true, triggerby: "" },
    { day: "Sun", available: true, triggerby: "" },
  ]);
  const [buttonAction, setButtonAction] = useState("Save");
  const [isloading, setIsloading] = useState(false);

  const { state: locationState } = useLocation();
  const localId = localStorage.getItem("createdStylist");

  useEffect(() => {
    dispatch({ type: "ADD_STYLISTID", payload: localId });
    console.log(localId);
    if (locationState._id !== undefined) {
      dispatch({ type: "ADD_STYLISTID", payload: locationState._id });
      setButtonAction("Edit");
    }
  }, []);

  const makeavailable = (day) => {
    const daysavail = availabledays.map((weekday) => {
      if (weekday.day !== day) {
        return weekday;
      }
      return { ...weekday, available: true, triggerby: "" };
    });
    setAvailabledays([...daysavail]);
  };

  const makeunavailable = (day, id) => {
    const daysavail = availabledays.map((weekday) => {
      if (weekday.day !== day) {
        return weekday;
      }
      return { ...weekday, available: false, triggerby: id };
    });
    setAvailabledays([...daysavail]);
  };

  const handleCreateStylist = () => {
    setIsloading(true);
    const {
      stylistId,
      timezone,
      range: tempRange,
      blocked_dates: tempBlockeDates,
    } = state;
    const range = tempRange.map(({ days, time_range }) => {
      return { days, time_range };
    });
    const blocked_dates = tempBlockeDates.map((date) => {
      const { endDate, startDate } = date[1];
      return { endDate, startDate };
    });

    const data = {
      stylistId,
      timezone,
      range,
      blocked_dates,
    };

    admin
      .CreateAvailability(data)
      .then((response) => {
        console.log(response.data, "availabilty sent");
        setActiveTab((prev) => ({ ...prev, galleryTab: true }));
        setButtonAction("Edit");
        setIsloading(false);
      })
      .catch((error) => console.log(error.message, "availability error"));
    console.log(data, "availability");
  };

  const clickHandler = () => {
    if (buttonAction === "Save" || buttonAction === "Update") {
      handleCreateStylist();
    }
    if (buttonAction === "Edit") {
      setButtonAction("Update");
    }
  };

  const memLength = useMemo(
    () => availabledays.filter((item) => item.available === false).length
  ); //eslint-disable-line

  useEffect(() => {
    if (availabledays.filter((item) => item.available === false).length === 7) {
      dispatch({ type: "REMOVE_EMPTY_RANGE" });
    }
  }, [memLength]);

  const changeTimeZone = (e) => {
    dispatch({ type: "CHANGE_TIMEZONE", payload: e });
  };

  const addDays = (id, value) => {
    availabledays.forEach((itm) => {
      const { available, day, triggerby } = itm;
      if (day === value && available === true && triggerby === "") {
        dispatch({ type: "ADD_DAY", payload: { id, value } });
        makeunavailable(value, id);
      }
    });
  };

  const removeDays = (id, value) => {
    availabledays.forEach((itm) => {
      const { day, triggerby, available } = itm;
      if (day === value && triggerby === id && available === false) {
        dispatch({ type: "REMOVE_DAY", payload: { id, value } });
        makeavailable(value);
      }
    });
  };

  const bookingStarttime = (id, value1, value2) => {
    dispatch({ type: "ADD_START_TIME", payload: { id, value1, value2 } });
  };
  const bookingEndtime = (id, value) => {
    dispatch({ type: "END_START_TIME", payload: { id, value } });
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    dispatch({ type: "ADD_RANGE" });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const reset = availabledays.map((itm) => {
      if (itm.triggerby === index) {
        return { ...itm, triggerby: "", available: true };
      }
      return itm;
    });
    setAvailabledays([...reset]);
    dispatch({ type: "REMOVE_RANGE", payload: index });
  };

  // handle click event of the Add button
  const handleAddRangeClick = () => {
    dispatch({
      type: "ADD_BLOCK",
      payload: [
        Math.floor(Math.random() * 10000),
        {
          start: new Date(),
          end: addDaysfn(new Date(), 7),
          key: "selection",
        },
      ],
    });
  };

  // handle click event of the Remove button
  const handleRemoveRangeClick = (index) => {
    dispatch({
      type: "REMOVE_BLOCK",
      payload: index,
    });
  };

  return (
    <div aria-hidden={ariaHidden} id={idx} className="mt-5 relative">
      {isloading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-black-50">
          <div className="loader" />
        </div>
      )}
      <label htmlFor="timezone">
        TimeZone
        <Select
          disabled={buttonAction === "Edit"}
          id="timezone"
          value={state.timezone}
          onChange={changeTimeZone}
          name="timezone"
          className=" flex items-center justify-between shadow-sm appearance-none mt-3 border border-gray-800 rounded w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <SelectItem value="GMT +1: Central European Time">
            GMT +1: Central European Time
          </SelectItem>
          <SelectItem value="GMT : Greenwich Meridain Time">
            GMT : Greenwich Meridain Time
          </SelectItem>
        </Select>
        {/* <select
          id="timezone"
          value={state.timezone}
          onChange={changeTimeZone}
          name="timezone"
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="GMT +1: Central European Time">
            GMT +1: Central European Time
          </option>
          <option value="GMT : Greenwich Meridain Time">
            GMT : Greenwich Meridain Time
          </option>
        </select> */}
      </label>
      <div className="mt-5">
        <p className="text-gray-400 text-sm mb-3">Recurring time ranges</p>
        {state.range.map((list, index) => {
          return (
            <React.Fragment key={list.rangeid}>
              <div className="flex items-center justify-between mb-5 relative">
                {state.range.length > 1 && (
                  <button
                    type="button"
                    disabled={buttonAction === "Edit"}
                    onClick={() => handleRemoveClick(list.rangeid)}
                    className="absolute -right-10 cursor-pointer flex items-center justify-center border-gray-800"
                  >
                    <img className="" src={cancel} alt="trash icon" />
                  </button>
                )}
                <DaysRange
                  selectedid={list.rangeid}
                  selected={list.days}
                  addDays={addDays}
                  removeDays={removeDays}
                  buttonAction={buttonAction}
                />
                <TimeRange
                  selectedid={list.rangeid}
                  selected={list.time_range}
                  bookingStarttime={bookingStarttime}
                  bookingEndtime={bookingEndtime}
                  buttonAction={buttonAction}
                  defaultval="Time"
                />
              </div>
              {state.range.length - 1 === index &&
                state.range.length < 4 &&
                availabledays.filter((itm) => itm.available === false).length <
                  7 && (
                  <button
                    type="button"
                    disabled={buttonAction === "Edit"}
                    onClick={handleAddClick}
                    className="text-purple-100 text-sm mt-4 cursor-pointer"
                  >
                    Add another recurring time range
                  </button>
                )}
            </React.Fragment>
          );
        })}
      </div>
      <hr className="border border-gray-800 w-full my-6" />
      <div className="">
        <p className="text-gray-400 text-sm mb-3">Blocked dates</p>
        <div>
          {state.blocked_dates.map((days, index) => {
            const [blockid, block] = days;

            return (
              <React.Fragment key={blockid}>
                <div className="relative">
                  {state.blocked_dates.length > 1 && (
                    <button
                      type="button"
                      disabled={buttonAction === "Edit"}
                      onClick={() => handleRemoveRangeClick(blockid)}
                      className="  cursor-pointer"
                    >
                      <img
                        className="absolute -right-10 top-1/2"
                        src={cancel}
                        alt="trash icon"
                      />
                    </button>
                  )}

                  <DateRangePicker
                    onChange={(item) =>
                      dispatch({
                        type: "UPDATE_BLOCK",
                        payload: { id: blockid, value: [item.selection] },
                      })
                    }
                    showSelectionPreview
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={[block]}
                    direction="horizontal"
                  />

                  <input
                    type="date"
                    placeholder="Monday, 01 April 2022 — Saturday, 22 May 2022"
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {state.blocked_dates.length - 1 === index &&
                  state.blocked_dates.length < 4 && (
                    <button
                      type="button"
                      disabled={buttonAction === "Edit"}
                      onClick={handleAddRangeClick}
                      className="text-purple-100 text-sm mt-4 cursor-pointer"
                    >
                      Add another blocked date range
                    </button>
                  )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={clickHandler}
          className="text-sm font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5"
        >
          {buttonAction}
        </button>
      </div>
    </div>
  );
}

export default AvailabilityTab;
