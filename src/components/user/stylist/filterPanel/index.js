import React from "react";
import CategoryDropdown from "./CategoryOptions";
import SearchBar from "./Search";
import ToggleBookedService from "./ToggleBookedService";
import SessionDropdown from "./Session";
import MoreFilters from "./MoreFilters";
import ServiceType from "./ServiceType";

export const categoryList = [
  {
    id: 1,
    value: "all-stylist",
    label: "All stylist",
  },
  {
    id: 2,
    value: "walk-in only",
    label: "Walk-in only stylist",
  },
  {
    id: 3,
    value: "curly sister stylist",
    label: "Curly sister stylist",
  },
  {
    id: 4,
    value: "master",
    label: "Master stylist",
  },
];

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
  selectToggle,
  selectBookableStylist,
  certifications,
  tags,
  handleOnCheckboxChange,
  handleSelectCategory,
  categories,
  getServices,
  handleSearchAddress,
  handleClick,
  setIsSearchMode,
  isSearchLoading,
}) {
  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div className="relative w-3/4 flex-1 mr-4">
          <SearchBar
            handleSearchAddress={handleSearchAddress}
            setIsSearchMode={setIsSearchMode}
            isSearchLoading={isSearchLoading}
          />
          <button
            type="button"
            onClick={handleClick}
            className="col-span-3 cursor-pointer flex items-center space-x-2 border rounded-full placeholder:text-sm placeholder:text-gray-300 px-4 bg-white border-gray-600"
          >
            Use current location
          </button>
        </div>
        <div className="col-span-3 w-220 flex-shrink-0">
          <CategoryDropdown
            options={categoryList}
            selectOption={handleSelectCategory}
            value={categories}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4 ">
          <ToggleBookedService
            selectToggle={selectToggle}
            selectBookableStylist={selectBookableStylist}
          />

          <SessionDropdown
            options={sessionList}
            selectOption={handleSelectCategory}
            value={categories}
          />
          <ServiceType getServices={getServices} />
        </div>
        <div className="">
          <MoreFilters
            certifications={certifications}
            tags={tags}
            handleOnCheckboxChange={handleOnCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
