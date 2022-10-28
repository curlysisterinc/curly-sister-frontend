/* global google */ // To disable any eslint 'google not defined' errors
import { Loadersmall } from "components/loader-component/loader";
import useGetCurrentLocation from "hooks/useGetCurrentLocation";
import debounce from "lodash.debounce";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

function StylistSearch({
  handleSearchAddress,
  setIsSearchMode,
  isSearchLoading,
}) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setIsSearchMode(true);
    handleSearchAddress({
      business_name: e.target.value,
    });
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleInputChange, 300);
  }, []);

  return (
    <div className="relative h-12">
      <input
        placeholder="Search business name?"
        className="border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3"
        id="searchInput"
        // value={searchValue}
        onChange={debouncedResults}
      />
      <div className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2 w-10 h-10  rounded-full">
        {isSearchLoading ? (
          <Loadersmall color="#8E8695" />
        ) : (
          <RiSearchLine color="#8E8695" size={20} />
        )}
      </div>
    </div>
  );
}

export default StylistSearch;
