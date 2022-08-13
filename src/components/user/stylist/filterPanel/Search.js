import React, { useState, useRef, useEffect, useCallback } from "react";
import { RiSearchLine } from "react-icons/ri";
import Script from "react-load-script";

function SearchBar({ handleScriptLoad }) {
  return (
    <div className="relative h-12 mb-4">
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&libraries=places`}
        onLoad={handleScriptLoad}
      />
      <input
        // value={value}
        // handleChange={handleChange}
        placeholder="What city do you live in?"
        className="border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3"
        id="searchInput"
      />
      <div className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-orange-200 rounded-full">
        <RiSearchLine color="white" size={20} />
      </div>
    </div>
  );
}

export default SearchBar;
