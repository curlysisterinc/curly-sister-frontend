/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useQueries } from "@tanstack/react-query";
import admin from "api/admin";
import React, { useCallback, useEffect, useState } from "react";
import FilterItem from "./FilterItem";
import CertificationFilter from "./CertificationFilter";
import TagsFilter from "./TagsFilter";

function MoreFilters({ handleOnCheckboxChange }) {
  const [toggleMoreFilters, setToggleMoreFilters] = useState(false);

  return (
    <div className="max-w-fit h-full">
      <div
        onClick={() => setToggleMoreFilters(!toggleMoreFilters)}
        className="cursor-pointer ml-auto h-10 flex items-center justify-center  border border-gray-250 bg-white rounded-full  px-4 text-sm text-gray-400"
      >
        More filters
      </div>
      {toggleMoreFilters ? (
        <div className="bg-white   rounded-2xl p-5 shadow-s07 absolute top-12 right-0 z-20  w-full   py-5 px-2.5 lg:px-4 max-w-500 lg:w-500 left-0 lg:left-auto h-screen-420px ">
          <div className="flex items-start flex-nowrap space-x-4 justify-between h-full-62px">
            <CertificationFilter />
            <TagsFilter />
          </div>
          <div className="flex justify-end mt-5">
            <button className="text-sm mr-6" type="button">
              Clear filters
            </button>
            <button
              type="button"
              onClick={() => setToggleMoreFilters(false)}
              className="font-semibold text-sm text-white px-18 py-8 bg-gray-350 rounded-3xl"
            >
              Apply filters
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MoreFilters;
