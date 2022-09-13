/* eslint-disable no-shadow */
import React from "react";

function SessionDropdown({ options, selectOption, value }) {
  return (
    <select
      onChange={selectOption}
      value={value}
      className="w-32 border outline-none focus:outline-none border-gray-250 bg-white rounded-full text-sm  placeholder:text-sm placeholder:text-gray-300 h-full px-4 text-gray-400"
    >
      {options.map(({ value, id, label }) => {
        return (
          <option key={id} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

export default SessionDropdown;
