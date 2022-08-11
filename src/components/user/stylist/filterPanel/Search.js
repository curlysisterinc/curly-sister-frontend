import React from "react";
import { RiSearchLine } from "react-icons/ri";

function SearchBar({ value, handleChange }) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="relative col-span-9 h-12">
        <input
          value={value}
          handleChange={handleChange}
          placeholder="What city do you live in?"
          className="border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3"
        />
        <div className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-orange-200 rounded-full">
          <RiSearchLine color="white" size={20} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
