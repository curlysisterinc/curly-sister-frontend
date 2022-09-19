import React, { useState, useEffect } from "react";
import useGetAllTags from "hooks/data/admin/useGetAllTags";
import { Loadersmall } from "components/loader-component/loader";
import FilterItem from "./FilterItem";

function TagsFilter() {
  const { data, isLoading, error, refetch } = useGetAllTags();

  const [filteredTags, setFilteredTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    if (data) {
      setFilteredTags(data.data.data);
      setTags(data.data.data);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [data]);

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
  return (
    <div className="flex-grow-0 w-1/2 h-full">
      <div className="pb-2.5">
        <h3 className="text-gray-300 text-sm">Preferences</h3>
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
      <div className="overflow-scroll h-full-20px">
        {isLoading && <Loadersmall />}

        {filteredTags?.map((cert) => {
          return (
            <FilterItem
              key={cert.id}
              data={cert}
              // handleOnChange={handleOnCheckboxChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TagsFilter;
