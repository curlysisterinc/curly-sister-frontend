import React from "react";

function FilterItem({ data, handleOnChange }) {
  const { name, _id: id, checked } = data;
  return (
    <div className="flex mb-3 items-center cursor-pointer">
      <input
        className="appearance-none h-5 w-5 border-1.5 border-gray-350 rounded-md bg-white checked:bg-gray-350 accent-gray-350 border-transparent focus:ring-0 focus:outline-none outline-none transition duration-200  bg-no-repeat bg-center bg-contain  mr-3 cursor-pointer text-gray-350 text-sm"
        type="checkbox"
        checked={checked}
        id={id}
        name={id}
        onChange={() => handleOnChange(id)}
      />
      <label className="inline-block text-gray-350 text-sm" htmlFor={id}>
        {name}
      </label>
    </div>
  );
}

export default FilterItem;
