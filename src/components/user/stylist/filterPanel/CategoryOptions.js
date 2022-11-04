/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import "./style.css";

export const categoryList = [
  {
    id: 1,
    value: "",
    label: "All stylist",
  },
  {
    id: 2,
    value: "walk-in",
    label: "Walk-in only",
  },
  {
    id: 3,
    value: "curly sister",
    label: "Curly sister stylist",
  },
  {
    id: 4,
    value: "master",
    label: "Master stylist",
  },
];

function CategoryDropdown({ handleSearchAddress, setIsSearchMode }) {
  const [categories, setCategories] = useState("");

  const selectOption = (e) => {
    setCategories(e.target.value);
    setIsSearchMode(true);
    handleSearchAddress({ category_type: e.target.value });
  };

  return (
    <select
      onChange={selectOption}
      value={categories}
      className=" w-52 border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 text-gray-400 text-sm h-12 px-4 "
    >
      {categoryList.map(({ value, id, label }) => {
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
