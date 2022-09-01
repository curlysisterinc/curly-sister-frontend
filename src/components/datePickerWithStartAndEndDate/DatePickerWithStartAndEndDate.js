/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as CalenderIcon } from "./assets/calender.svg";
import { ReactComponent as ArrowRightIcon } from "./assets/arrow-right.svg";

export function DatePickerWithStartAndEndDate(props) {
  const {
    label,
    calenderDate,
    minDate,
    // handleToggleCalender,
    labelColor,
    placeholder,
    setCalenderDate,
  } = props;
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const handleToggleCalender = () => setIsCalenderOpen(!isCalenderOpen);

  const onCalenderInputChange = (dates) => {
    const [start, end] = dates;

    setCalenderDate({
      ...calenderDate,
      startDate: start,
      endDate: end,
    });
    end && handleToggleCalender();
  };

  const handleClearField = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // setter to get state value from child
    setCalenderDate({
      ...calenderDate,
      startDate: null,
      endDate: null,
    });
  };

  const handleDateFormatting = (chosenDate) => {
    if (chosenDate) {
      const today = new Date(chosenDate).toDateString().split(" ");
      const [day, month, dateNum] = today;
      return `${day}, ${month} ${dateNum}`;
    }
    return null;
  };

  const { startDate, endDate } = calenderDate;

  return (
    <div isCalenderOpen={isCalenderOpen} labelColor={labelColor}>
      <button
        type="button"
        className="relative border border-gray-800 rounded-xl h-46 py-0 px-4 text-gray-400 w-full mt-1 text-left flex items-center cursor-pointer outline-none bg-white text-sm focus:shadow-sinput"
        id={label}
        name="button"
        onClick={handleToggleCalender}
      >
        {!startDate ? (
          <p className="text-sm text-gray-400">
            {placeholder || "Select open and close dates"}
          </p>
        ) : (
          <>
            <span>{handleDateFormatting(startDate)}</span>
            <ArrowRightIcon className="mx-6 my-0" />
            <span>{handleDateFormatting(endDate)}</span>
          </>
        )}
        <CalenderIcon className="absolute right-2.5 h-5 w-5 top-3" />
      </button>
      <div
        className={`absolute
       ${isCalenderOpen ? "z-10" : "z-0"}
       ${isCalenderOpen ? "opacity-100" : "opacity-0"}
      ${isCalenderOpen ? "-translate-y-2" : "-translate-y-5"}
      ${
        !isCalenderOpen
          ? "transition transform ease-in-out 0.1 delay-300 duration-75"
          : "transition transform ease duration-75"
      };
      ${isCalenderOpen ? "visible" : "invisible"}`}
      >
        <DatePicker
          selected={startDate}
          onChange={onCalenderInputChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          minDate={minDate}
        />
      </div>
    </div>
  );
}
