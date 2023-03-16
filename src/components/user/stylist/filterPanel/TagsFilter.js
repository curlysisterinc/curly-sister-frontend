import React, { useState, useEffect } from "react";
import useGetAllTags from "hooks/data/admin/useGetAllTags";
import { Loadersmall } from "components/loader-component/loader";
import FilterItem from "./FilterItem";

function TagsFilter({
  handleSelectedTags,
  setFilteredTags,
  tags,
  filteredTags,
  setTags,
  isTagsLoading,
  tagData,
  selectedTags,
}) {
  const [inputSearch, setInputSearch] = useState("");

  const handleSearchForTag = (e) => {
    setInputSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredTags(tags);
    } else {
      const newFilteredTag = tags.filter((item) =>
        item.name
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      );
      setFilteredTags(newFilteredTag);
    }
  };

  const extractSelectedTag = (selectedTagData) => {
    const selectedTag = selectedTagData
      .filter((tag) => tag.isSelected)
      .map((item) => item._id);
    return selectedTag;
  };

  const handleOnCheckboxChange = (id) => {
    const newTags = tags.map((item) => {
      if (item._id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    const newFilteredTags = filteredTags.map((item) => {
      if (item._id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });

    const selectedTag = extractSelectedTag(newTags);
    handleSelectedTags(selectedTag);
    setTags(newTags);
    setFilteredTags(newFilteredTags);
  };

  return (
    <div className="flex-grow-0 w-1/2 h-full">
      <div className="pb-2.5">
        <h3 className="text-gray-300 text-sm flex">
          Preferences
          {!!selectedTags.length && (
            <p
              className="relative -top-3 right-0 text-xs rounded-full  border-gray-550 text-white
bg-purple-500 border w-5 h-5 flex items-start justify-center"
            >
              {selectedTags.length}
            </p>
          )}
        </h3>
        <input
          className="border border-gray-100 rounded text-sm w-full
           px-3 py-2"
          type="input"
          aria-label="tag search"
          onChange={handleSearchForTag}
          value={inputSearch}
          placeholder="search tag"
        />
      </div>
      <div className="overflow-auto h-full-62px">
        {isTagsLoading && <Loadersmall />}

        {tagData &&
          filteredTags?.map((tag) => {
            return (
              <FilterItem
                key={tag.id}
                data={tag}
                checked={tag.isSelected}
                handleOnChange={handleOnCheckboxChange}
              />
            );
          })}
      </div>
    </div>
  );
}

export default TagsFilter;
