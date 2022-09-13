/* eslint-disable no-shadow */
import React from "react";
import "./style.css";

function CategoryDropdown({ options, selectOption, value }) {
  return (
    <select
      onChange={selectOption}
      value={value}
      className=" w-52 border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 text-gray-400 text-sm h-12 px-4 "
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

export default CategoryDropdown;
