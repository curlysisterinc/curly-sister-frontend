/* global google */ // To disable any eslint 'google not defined' errors
import { Loadersmall } from "components/loader-component/loader";
import useGetCurrentLocation from "hooks/useGetCurrentLocation";
import debounce from "lodash.debounce";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import Script from "react-load-script";

function SearchBar({
  handleSearchAddress,
  setIsSearchMode,
  isSearchLoading,
  getLocation,
}) {
  const positionData = useGetCurrentLocation();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const searchInput = useRef(null);

  React.useEffect(() => {
    if (location?.state?.city) {
      addLocationToSearchBarAndSearchStylistInThatLocation(location.state.city);
    }
    if (document.getElementById("searchInput").value === "") {
      setIsSearchMode(false);
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

  const handleInputChange = (value) => {
    setSearchValue(value);
    setIsSearchMode(true);
    handleSearchAddress({ address: value });
  };
  const handleChangeSearchInput = (e) => {
    if (e.target.value === "") {
      setSearchValue("");
      setQuery("");
      setIsSearchMode(false);
    } else {
      setSearchValue(e.target.value);
    }
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
        addLocationToSearchBarAndSearchStylistInThatLocation(
          response.results[0].formatted_address
        );
      })
      .catch((e) => window.alert(`Geocoder failed due to: ${e}`));
  };

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (query) {
      handleInputChange(query);
    }
  }, [query]);

  // Store autocomplete object in a ref.
  // This is done because refs do not trigger a re-render when changed.
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = autocompleteRef.current.getPlace();
    const address = addressObject.address_components;
    // Check if address is valid
    if (address) {
      setCity(address[0].long_name);
      setQuery(addressObject.formatted_address);
    }
  };

  const handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ["(cities)"],
    };

    // Initialize Google Autocomplete
    autocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById("searchInput"),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);

    // Fire Event when a suggested name is selected
    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  return (
    <div className="relative w-4/5 md:w-3/4 flex-1 md:mr-4 mb-2 md:mb-0">
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&libraries=places`}
        onLoad={handleScriptLoad}
      />
      <div className="relative h-12 mb-2 md:mb-4">
        <input
          placeholder="What city do you live in?"
          className="border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3"
          id="searchInput"
          value={searchValue}
          onChange={handleChangeSearchInput}
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
