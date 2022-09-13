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
  searchValue,
  setSearchValue,
}) {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between flex-wrap">
        <div className="relative w-4/5 md:w-3/4 flex-1 md:mr-4 mb-2 md:mb-0">
          <SearchBar
            handleSearchAddress={handleSearchAddress}
            setIsSearchMode={setIsSearchMode}
            isSearchLoading={isSearchLoading}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <button
            type="button"
            onClick={handleClick}
            className="col-span-3 cursor-pointer flex items-center space-x-2 border rounded-full placeholder:text-sm placeholder:text-gray-300 px-4 bg-white border-gray-600 text-gray-400 text-sm"
          >
            Use current location
          </button>
        </div>
        <div className="col-span-3 w-220 flex-shrink-0 text-gray-400">
          <CategoryDropdown
            options={categoryList}
            selectOption={handleSelectCategory}
            value={categories}
          />
        </div>
      </div>
      <div className="flex justify-between items-start md:items-center mt-4 h-fit md:h-10 flex-col md:flex-row flex-wrap">
        <div className="flex md:space-x-4 h-full flex-col md:flex-row items-start mb-2">
          <ToggleBookedService
            selectToggle={selectToggle}
            selectBookableStylist={selectBookableStylist}
          />

          <div className="flex flex-wrap mb-5">
            <ServiceType getServices={getServices} />
            <SessionDropdown
              options={sessionList}
              selectOption={handleSelectCategory}
              value={categories}
            />
          </div>
        </div>
        <div className="h-10">
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
