/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */

import React, { useEffect, useMemo, useReducer, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays as addDaysfn } from "date-fns";
import { useLocation, useParams } from "react-router-dom";
import useGetStylistById from "hooks/data/admin/useGetStylistById";
import useGetAvailabilityById from "hooks/data/admin/useGetAvailabilityById";
import { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import useCreateAvailability from "hooks/data/admin/useCreateAvailability";
import useUpdateAvailability from "hooks/data/admin/useUpdateAvailability";
import useUpdateStylist from "hooks/data/admin/useUpdateStylist";
import cancel from "../../../../../assets/images/cancel.svg";
// import { Loadersmall } from "../../../../loader";
import TimeRange from "./availablity/timeRange";
import DaysRange from "./availablity/daysRange";
import admin from "../../../../../api/admin";
import { Select, SelectItem } from "../../../../customSelect";
import OrangeBtn from "../../../../customButton/orangeBtn";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
import reducer, { initialState } from "./availablity";
import timeZone from "../../../../../assets/timezone.json";
import SelectOptions from "../../../../selectOptions";
import DatePickerWithStartAndEndDate from "../../../../datePickerWithStartAndEndDate";

function AvailabilityTab({ ariaHidden, idx, setActiveTab }) {
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
  const [availabilityId, setAvailabilityId] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { state: locationState } = useLocation();
  const { id: stylistId } = useParams();
  const stylist = stylistId;

  const {
    isLoading: isStylistLoading,
    data: stylistData,
    isError: stylistError,
    refetch: stylistRefetch,
  } = useGetStylistById(stylistId);

  const {
    isLoading: isAvailabilityLoading,
    data: availabilityData,
    isError: availabilityError,
    refetch: availabilityRefetch,
  } = useGetAvailabilityById(availabilityId);

  const {
    data: createAvailabilityData,
    isLoading: createAvailabilityLoading,
    error: createAvailabilityError,
    mutate: createAvailability,
  } = useCreateAvailability();

  const {
    data: updateAvailabilityData,
    isLoading: updateAvailabilityLoading,
    error: updateAvailabilityError,
    mutate: updateAvailability,
  } = useUpdateAvailability();

  const {
    isLoading: isUpdateStylistLoading,
    data: updateStylistData,
    error: updateStylistError,
    mutate: updateStylist,
  } = useUpdateStylist();

  // useChangeBtnTitle("availablity", setButtonAction, dispatch);

  useEffect(() => {
    const ac = new AbortController();
    if (stylistData) {
      const { availability } = stylistData.data.stylist;
      let newAvailabilityId;
      if (Array.isArray(availability) && availability.length > 0) {
        newAvailabilityId = availability[availability.length - 1];
      }
      if (typeof availability === "string") {
        newAvailabilityId = availability;
      }

      if (typeof newAvailabilityId === "string") {
        setAvailabilityId(newAvailabilityId);
      }
      // if (availability.length > 0) {
      //   dispatch({ type: "CLEAR_INITIAL_BLOCK" });
      //   dispatch({ type: "CLEAR_INITIAL_RANGE" });
      //   availability.forEach(({ blocked_dates, range }) => {
      //     blocked_dates.forEach(({ endDate, startDate }) => {
      //       dispatch({
      //         type: "ADD_BLOCK",
      //         payload: [
      //           Math.floor(Math.random() * 10000),
      //           {
      //             start: new Date(startDate),
      //             end: new Date(endDate),
      //             key: "selection",
      //           },
      //         ],
      //       });
      //     });
      //     range.forEach(({ days, time_range }) => {
      //       dispatch({
      //         type: "ADD_OLD_RANGE",
      //         payload: { olddays: days, oldtimes: time_range },
      //       });
      //     });
      //   });
      // }
    }
    return function cleanup() {
      ac.abort();
    };
  }, [stylistData]);

  useEffect(() => {
    const ac = new AbortController();
    if (availabilityData) {
      const availability = availabilityData.data.data;

      const { blocked_dates, range, time_zone } = availability;

      dispatch({ type: "CLEAR_INITIAL_BLOCK" });
      dispatch({ type: "CLEAR_INITIAL_RANGE" });
      // availability.forEach(({ blocked_dates, range }) => {

      dispatch({ type: "CHANGE_TIMEZONE", payload: time_zone });

      blocked_dates.forEach(({ from, to }) => {
        dispatch({
          type: "ADD_BLOCK",
          payload: [
            Math.floor(Math.random() * 10000),
            {
              from: new Date(from),
              to: new Date(to),
              endDate: new Date(to),
              startDate: new Date(from),
              key: "selection",
            },
          ],
        });
      });
      const newDays = [];
      range.forEach(({ days, time_range }) => {
        newDays.push(...days);
        dispatch({
          type: "ADD_OLD_RANGE",
          payload: { olddays: days, oldtimes: time_range },
        });
      });
    }
    return function cleanup() {
      ac.abort();
    };
  }, [availabilityData]);

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
      timezone,
      range: tempRange,
      blocked_dates: tempBlockeDates,
    } = state;
    const range = tempRange.map(({ days, time_range }) => {
      return { days, time_range };
    });
    const blocked_dates = tempBlockeDates.map((date) => {
      const { from, to } = date[1];
      return { from, to };
    });

    const data = {
      stylistId,
      time_zone: timezone,
      range,
      blocked_dates,
      days: availabledays,
    };

    if (availabilityId) {
      updateAvailability({ ...data, availabilityId });
    } else {
      createAvailability(data);
    }
  };

  const clickHandler = () => {
    handleCreateStylist();
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
    dispatch({ type: "CHANGE_TIMEZONE", payload: e.target.value });
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
          from: null,
          to: null,
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

  const handleOnChange = (id, event) => {
    const newEvent = {
      ...event,
      from: event.startDate,
      to: event.endDate,
    };
    dispatch({
      type: "UPDATE_BLOCK",
      payload: { id, value: newEvent },
    });
  };

  const disableBtn = () => {
    const {
      timezone,
      range: tempRange,
      blocked_dates: tempBlockeDates,
    } = state;

    const noDate = tempRange.some((item) => item.days.length === 0);
    const noTimeRange = tempRange.some((item) =>
      Object.values(item.time_range).some((a) => a === "")
    );
    const isDisabled =
      tempBlockeDates.length > 0 &&
      tempBlockeDates
        .map((item) => Object.values(item[1]).some((a) => !a))
        .some((date) => date);

    if (noDate || noTimeRange || isDisabled) {
      return true;
    }
    if (timezone === "") {
      return true;
    }

    return false;
  };

  return (
    <>
      {stylistData?.data?.stylist?.availability.length > 0 &&
        isAvailabilityLoading && <Loadersmall />}

      {availabilityError && (
        <ErrorDisplayComponent refetch={availabilityRefetch} />
      )}
      {(availabilityData ||
        stylistData?.data?.stylist?.availability.length === 0) && (
        <div aria-hidden={ariaHidden} id={idx} className="mt-5 relative">
          <label htmlFor="timeZone">
            <p className="mb-1.5 text-sm font-BeatriceRegular"> TimeZone</p>
            <SelectOptions
              placeholder="Select Timezone"
              collection={timeZone}
              onChange={changeTimeZone}
              name="timeZone"
              // selectedValue="label"
              optionvalue="label"
              optionlabelvalue="label"
              value={state.timezone}
            />
          </label>
          <div className="mt-5">
            <p className="text-gray-400 text-sm mb-3">Recurring time ranges</p>
            {state.range.map((list, index) => {
              return (
                <React.Fragment key={list.rangeid}>
                  <div className="flex items-center justify-between mb-8 relative flex-wrap">
                    <DaysRange
                      selectedid={list.rangeid}
                      selected={list.days}
                      addDays={addDays}
                      removeDays={removeDays}
                      buttonAction={buttonAction}
                      availabledays={availabledays}
                    />
                    <div className="flex items-center">
                      <TimeRange
                        selectedid={list.rangeid}
                        selected={list.time_range}
                        bookingStarttime={bookingStarttime}
                        bookingEndtime={bookingEndtime}
                        buttonAction={buttonAction}
                        defaultval="Time"
                      />
                      {state.range.length > 1 && (
                        <button
                          type="button"
                          disabled={buttonAction === "Edit"}
                          onClick={() => handleRemoveClick(list.rangeid)}
                          className=" ml-2 cursor-pointer flex items-center justify-center border-gray-800"
                        >
                          <img className="" src={cancel} alt="trash icon" />
                        </button>
                      )}
                    </div>
                  </div>
                  {state.range.length - 1 === index &&
                    state.range.length < 4 &&
                    availabledays.filter((itm) => itm.available === false)
                      .length < 7 && (
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
          <hr className="border border-gray-600 w-full my-6" />
          <div className="">
            <p className="text-gray-400 text-sm mb-3">Blocked dates</p>
            <div>
              {state.blocked_dates.map((days, index) => {
                const [blockid, block] = days;

                return (
                  <React.Fragment key={blockid}>
                    <div className="relative mt-4 flex items-center w-full">
                      <div className="flex-1 mr-4">
                        <DatePickerWithStartAndEndDate
                          calenderDate={block}
                          // setCalenderDate={(e) => handleOnChange(e)}
                          isCalenderOpen
                          setCalenderDate={(e) => handleOnChange(blockid, e)}
                          minDate={new Date()}
                          // calenderDate={cohortDuration}
                        />
                      </div>
                      <button
                        type="button"
                        disabled={buttonAction === "Edit"}
                        onClick={() => handleRemoveRangeClick(blockid)}
                        className="cursor-pointer  -right-10 top-4 border-0"
                      >
                        <img
                          // className=""
                          src={cancel}
                          alt="trash icon"
                        />
                      </button>
                    </div>
                  </React.Fragment>
                );
              })}
              {state.blocked_dates.length < 4 && (
                <button
                  type="button"
                  disabled={buttonAction === "Edit"}
                  onClick={handleAddRangeClick}
                  className="text-purple-100 text-sm mt-4 cursor-pointer "
                >
                  {state.blocked_dates.length
                    ? "Add another blocked date range"
                    : "Add blocked date range"}
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-end mb-20">
            <OrangeBtn
              buttonAction="Save"
              disabled={disableBtn()}
              onClick={clickHandler}
              isloading={createAvailabilityLoading || updateAvailabilityLoading}
            />
            {/* <button
          type="button"
          onClick={clickHandler}
          className="text-sm disabled:opacity-50 font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5 flex items-center gap-x-2"
        >
          {buttonAction}
          {isloading && <Loadersmall />}
        </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default AvailabilityTab;
