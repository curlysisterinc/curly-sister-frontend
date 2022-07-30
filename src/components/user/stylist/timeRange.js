import React from "react";
import "./calender.css";

function TimeInvtervals({ title, value, selected, changeHandler }) {
  return (
    <div className="timeinterval">
      <label
        htmlFor={`time-${title}`}
        className={`block text-sm border rounded-full cursor-pointer hover:text-white ${
          selected === value
            ? "text-white bg-purple-100"
            : "text-purple-100  bg-purple-50"
        } border-purple-100   hover:bg-purple-100 text-center  px-4 py-1.5`}
      >
        <span>{title}</span>
      </label>
      <input
        className="hidden"
        onChange={(e) => changeHandler(e.target.value)}
        value={value}
        type="radio"
        name="time"
        id={`time-${title}`}
      />
    </div>
  );
}

export default TimeInvtervals;
