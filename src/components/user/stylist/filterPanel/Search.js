import { Loadersmall } from "components/loader-component/loader";
import debounce from "lodash.debounce";
import React, { useState, useEffect, useMemo } from "react";
import { RiSearchLine } from "react-icons/ri";
import Script from "react-load-script";

function SearchBar({ handleSearchAddress, setIsSearchMode, isSearchLoading }) {
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length > 2) {
      handleSearchAddress(e.target.value);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleInputChange, 300);
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "" || searchValue.length <= 2) {
      setIsSearchMode(false);
    } else {
      setIsSearchMode(true);
    }
  }, [searchValue]);

  return (
    <div className="relative h-12 mb-4">
      <input
        placeholder="What city do you live in?"
        className="border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3"
        id="searchInput"
        // value={searchValue}
        onChange={debouncedResults}
      />
      <div className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-orange-200 rounded-full">
        {isSearchLoading ? (
          <Loadersmall />
        ) : (
          <RiSearchLine color="white" size={20} />
        )}
      </div>
    </div>
  );
}

export default SearchBar;
