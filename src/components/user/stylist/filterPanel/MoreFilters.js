/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import CheckBoxProton from "./CheckboxProton";

function MoreFilters({ certifications, tags, handleOnCheckboxChange }) {
  const [toggleMoreFilters, setToggleMoreFilters] = useState(false);

  return (
    <div className="relative h-full">
      <div
        onClick={() => setToggleMoreFilters(!toggleMoreFilters)}
        className="cursor-pointer ml-auto h-10 flex items-center justify-center  border border-gray-250 bg-white rounded-full px-4 text-sm text-gray-400"
      >
        More filters
      </div>
      {toggleMoreFilters ? (
        <div className="bg-white w-auto rounded-lg p-5 shadow-md absolute top-12 right-0 z-20">
          <div className="flex items-start flex-nowrap space-x-4 justify-between">
            <div>
              <h3>Certifications</h3>
              {certifications?.map((cert) => (
                <CheckBoxProton
                  key={cert.id}
                  data={cert}
                  handleOnChange={handleOnCheckboxChange}
                />
              ))}
            </div>
            <div>
              <h3 className="whitespace-nowrap">Hair type</h3>
              {tags?.map((cert) => (
                <CheckBoxProton
                  key={cert.id}
                  data={cert}
                  handleOnChange={handleOnCheckboxChange}
                />
              ))}
            </div>
            <div>
              <h3>Preferences</h3>
              {tags?.map((cert) => (
                <CheckBoxProton
                  key={cert.id}
                  data={cert}
                  handleOnChange={handleOnCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <p>Clear filters</p>
            <button type="button" onClick={() => setToggleMoreFilters(false)}>
              Apply filters
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MoreFilters;
