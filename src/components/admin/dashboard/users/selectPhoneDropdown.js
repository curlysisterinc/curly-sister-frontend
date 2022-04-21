/* eslint-disable react/no-array-index-key */
import React from "react";
import clsx from "clsx";

function SelectPhoneDropdown({
  value,
  placeholder,
  name,
  handleChange,
  phoneNumberCountries,
  clsName,
}) {
  const youli = (option) => {
    return (
      <div>
        <span>{option.dialingCode}</span>
        <img src={option.flag} alt={option.isoAlpha2Code} />
      </div>
    );
  };
  return (
    <label
      className="inline-block text-black text-sm font-bold mt-5 col"
      htmlFor="number"
    >
      <select
        value={value}
        name={name}
        onChange={handleChange}
        label={placeholder}
        className={clsx(
          clsName,
          "focus:ring-indigo-500 focus:border-indigo-500  h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-700 sm:text-sm rounded"
        )}
      >
        {phoneNumberCountries.map((option, i) => (
          <option key={i} value={option.id}>
            {youli(option)}
            {/* <div>
              <span>{option.dialingCode}</span>
              <img src={option.flag} alt={option.isoAlpha2Code} />
            </div> */}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectPhoneDropdown;
