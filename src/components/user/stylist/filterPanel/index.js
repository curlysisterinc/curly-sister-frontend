import React, { useState } from "react";
import useGetServices from "hooks/data/admin/useGetServices";
import CategoryDropdown from "./CategoryOptions";
import SearchBar from "./Search";
import ToggleBookedService from "./ToggleBookedService";
import SessionDropdown from "./Session";
import MoreFilters from "./MoreFilters";
import ServiceList from "./ServiceList";

export const sessionList = [
  {
    id: 1,
    value: "both",
    label: "Both",
  },
  {
    id: 2,
    value: "in-person",
    label: "In-person",
  },
  {
    id: 3,
    value: "virtual",
    label: "Virtual",
  },
];

function FilterPanel({
  handleSearchAddress,
  getLocation,
  setIsSearchMode,
  isSearchLoading,
}) {
  const [isServiceAvailable, setIsServiceAvailable] = useState(false);

  const toggleServiceAvailability = () => {
    setIsServiceAvailable((available) => !available);
  };

  return (
    <div className="pb-32px">
      <div className="flex flex-col md:flex-row justify-between flex-wrap">
        <SearchBar
          handleSearchAddress={handleSearchAddress}
          setIsSearchMode={setIsSearchMode}
          isSearchLoading={isSearchLoading}
          getLocation={getLocation}
        />

        <div className="col-span-3 w-220 flex-shrink-0 text-gray-400">
          <CategoryDropdown
            handleSearchAddress={handleSearchAddress}
            setIsSearchMode={setIsSearchMode}
          />
        </div>
      </div>
      <div className="flex justify-between items-start md:items-center mt-4 h-fit md:h-10 flex-col md:flex-row flex-wrap">
        <div className="flex md:space-x-4 h-full flex-col md:flex-row items-start mb-2">
          <ToggleBookedService
            toggleServiceAvailability={toggleServiceAvailability}
            isServiceAvailable={isServiceAvailable}
            handleSearchAddress={handleSearchAddress}
          />

          <div className="flex flex-wrap mb-5">
            {isServiceAvailable && (
              <ServiceList
                handleSearchAddress={handleSearchAddress}
                setIsSearchMode={setIsSearchMode}
              />
            )}
            <SessionDropdown options={sessionList} />
          </div>
        </div>
        <div className="lg:w-120 relative w-full ">
          <MoreFilters />
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
