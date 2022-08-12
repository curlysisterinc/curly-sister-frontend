import React, { useState, useRef } from "react";
import { RiSearchLine } from "react-icons/ri";
import Script from "react-load-script";

function SearchBar({ value, handleChange }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

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
    /* global google */ // To disable any eslint 'google not defined' errors
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
    <div className="relative col-span-9 h-12">
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&libraries=places`}
        onLoad={handleScriptLoad}
      />
      <input
        value={value}
        handleChange={handleChange}
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
