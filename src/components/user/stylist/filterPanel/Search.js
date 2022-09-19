/* global google */ // To disable any eslint 'google not defined' errors
import { Loadersmall } from "components/loader-component/loader";
import useGetCurrentLocation from "hooks/useGetCurrentLocation";
import debounce from "lodash.debounce";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

function SearchBar({
  handleSearchAddress,
  setIsSearchMode,
  isSearchLoading,
  getLocation,
}) {
  const positionData = useGetCurrentLocation();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  React.useEffect(() => {
    if (location?.state?.city) {
      addLocationToSearchBarAndSearchStylistInThatLocation(location.state.city);
    }
  }, [location, document.getElementById("searchInput")]);

  const addLocationToSearchBarAndSearchStylistInThatLocation = (
    chosenLocation
  ) => {
    if (document.getElementById("searchInput")) {
      setIsSearchMode(true);
      document.getElementById("searchInput").value = chosenLocation;
      handleSearchAddress({ address: chosenLocation });
      setSearchValue(chosenLocation);
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setIsSearchMode(true);
    handleSearchAddress({ address: e.target.value });
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleInputChange, 300);
  }, []);

  const handleClick = () => {
    getLocation();
    const geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({
        location: {
          lat: positionData?.position.lat,
          lng: positionData?.position.lng,
        },
      })
      .then((response) => {
        const place = response.results.find((item) =>
          item.types.includes("administrative_area_level_1")
        );
        const specificPlace = place.address_components.find((item) =>
          item.types.includes("administrative_area_level_1")
        ).long_name;
        addLocationToSearchBarAndSearchStylistInThatLocation(specificPlace);
      })
      .catch((e) => window.alert(`Geocoder failed due to: ${e}`));
  };

  return (
    <div className="relative w-4/5 md:w-3/4 flex-1 md:mr-4 mb-2 md:mb-0">
      <div className="relative h-12 mb-2 md:mb-4">
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
      <button
        type="button"
        onClick={handleClick}
        className="col-span-3 cursor-pointer flex items-center space-x-2 border rounded-full placeholder:text-sm placeholder:text-gray-300 px-4 bg-white border-gray-600 text-gray-400 text-sm"
      >
        Use current location
      </button>
    </div>
  );
}

export default SearchBar;
