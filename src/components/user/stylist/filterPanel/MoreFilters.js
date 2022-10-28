/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useQueries } from "@tanstack/react-query";
import admin from "api/admin";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useGetAllCertifications from "hooks/data/admin/useGetAllCertifications";
import useGetAllTags from "hooks/data/admin/useGetAllTags";
import FilterItem from "./FilterItem";
import CertificationFilter from "./CertificationFilter";
import TagsFilter from "./TagsFilter";

function MoreFilters({ handleSearchAddress, setIsSearchMode }) {
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [filteredCertifications, setFilteredCertifications] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [mode, setMode] = useState(null);

  const {
    data: tagData,
    isLoading: isTagsLoading,
    error: tagError,
    refetch: tagRefetch,
  } = useGetAllTags();

  const {
    data: certificationsData,
    isLoading: isCertificationsLoading,
    error: certificationsRrror,
    refetch: certificationsRefetch,
  } = useGetAllCertifications();

  useEffect(() => {
    if (mode === "RESET") {
      const newCertifications = certifications.map((item) => {
        return { ...item, isSelected: false };
      });
      const newTags = tags.map((item) => {
        return { ...item, isSelected: false };
      });
      setTags(newTags);
      setFilteredTags(newTags);
      setCertifications(newCertifications);
      setFilteredCertifications(newCertifications);
      setIsSearchMode(false);
      setIsMoreFiltersOpen(false);
    }
  }, [mode]);

  useEffect(() => {
    const ac = new AbortController();
    if (certificationsData) {
      const newData = certificationsData.data.data.map((item) => {
        return { ...item, isSelected: false };
      });
      setFilteredCertifications(newData);
      setCertifications(newData);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [certificationsData]);

  const handleSelectedCertificate = (item) => {
    setMode("DATA");
    setSelectedCertificates(item);
  };
  const handleSelectedTags = (item) => {
    setMode("DATA");
    setSelectedTags(item);
  };

  useEffect(() => {
    const ac = new AbortController();
    if (tagData) {
      setFilteredTags(tagData.data.data);
      setTags(tagData.data.data);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [tagData]);

  const handleSubmitTagAndCert = () => {
    setIsSearchMode(true);
    setIsMoreFiltersOpen(false);
    handleSearchAddress({
      tags: selectedTags.join(),
      certifications: selectedCertificates.join(),
    });
  };

  const clearFilter = () => {
    setSelectedCertificates([]);
    setSelectedTags([]);
    setMode("RESET");
  };

  const hasAtLeastOneSelectedService = useMemo(() => {
    return selectedCertificates.length + selectedTags.length > 0;
  }, [selectedCertificates, selectedTags]);

  return (
    <div className="max-w-fit w-140 h-full">
      <div
        onClick={() => setIsMoreFiltersOpen(!isMoreFiltersOpen)}
        className={`cursor-pointer ml-auto h-12 flex items-center justify-center border bg-white rounded-full  px-4 text-sm text-gray-400 relative ${
          hasAtLeastOneSelectedService
            ? "border-purple-100 bg-gray-550"
            : "border-gray-250 bg-white"
        }`}
      >
        <p>More filters</p>
        {!!hasAtLeastOneSelectedService && (
          <p
            className="absolute -top-3 right-0 text-xs rounded-full  border-gray-550 text-white
bg-purple-500 border w-5 h-5 flex items-start justify-center"
          >
            {selectedCertificates.length + selectedTags.length}
          </p>
        )}
      </div>
      {isMoreFiltersOpen ? (
        <div className="bg-white   rounded-2xl p-5 shadow-s07 absolute top-12 right-0 z-500  w-full   py-5 px-2.5 lg:px-4 max-w-500 lg:w-500 left-0 lg:left-auto h-screen-420px ">
          <div className="flex items-start flex-nowrap space-x-4 justify-between h-full-62px">
            <CertificationFilter
              handleSelectedCertificate={handleSelectedCertificate}
              setFilteredCertifications={setFilteredCertifications}
              certifications={certifications}
              filteredCertifications={filteredCertifications}
              setCertifications={setCertifications}
              isCertificationsLoading={isCertificationsLoading}
              certificationsData={certificationsData}
              selectedCertificates={selectedCertificates}
            />
            <TagsFilter
              handleSelectedTags={handleSelectedTags}
              setFilteredTags={setFilteredTags}
              tags={tags}
              filteredTags={filteredTags}
              setTags={setTags}
              isTagsLoading={isTagsLoading}
              tagData={tagData}
              selectedTags={selectedTags}
            />
          </div>
          <div className="flex justify-end mt-5">
            <button
              onClick={clearFilter}
              className="text-sm mr-6"
              type="button"
            >
              Clear filters
            </button>
            <button
              type="button"
              onClick={handleSubmitTagAndCert}
              className="font-semibold text-sm text-white px-18 py-2 bg-gray-350 rounded-3xl"
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
