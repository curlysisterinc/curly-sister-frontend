/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useState } from "react";
// import styled from "styled-components";
import { ReactComponent as ArrowDownIcon } from "./assets/arrow-down.svg";

/**
 *
@property {string} selectedValue-   The selected value of the select input, its initial value i an empty string and then is controlled by the onChange function, it is normally gotten by selecting an item from the predefined collection

@property {function} onChange -  function that helps in selecting of options from the passed collection

@property {function} collection[] -  the options array

 @property {string} name - identifier for the select

 @property {string} optionvalue - the value of each options, should be a key in one from the collection value if it is an array of objects or the item itself if it is just a array of strings

@property {string} optionlabelvalue - The label of the options, this is what is rendered, should be a key in one from the collection value  if it is an array of objects or the item itself if it is just a array of strings

 @property {string} [placeholder] - place holder for the select input, usually the firstly item in the list

 @property {boolean} [disabled] - if the input is disabled or not;
* */
export function SelectOptions(props) {
  const {
    value,
    onChange,
    collection,
    name,
    optionvalue,
    optionlabelvalue,
    placeholder,
    disabled,
  } = props;

  return (
    <div className="w-full h-46 relative">
      <select
        className="w-full h-full rounded-xl py-0 pr-6 pl-2 bg-white appearance-none outline-none block focus:shadow-sinput focus:border-0 border-gray-800 text-gray-400 text-sm"
        id={name}
        value={value}
        disabled={disabled}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {collection &&
          collection.length > 0 &&
          collection.map((item, index) => {
            return (
              <option
                key={
                  typeof item === "string" ? item : item[optionvalue] + index
                }
                data-item={item[optionvalue] || item}
                value={typeof item === "string" ? item : item[optionvalue]}
              >
                {typeof item === "string" ? item : item[optionlabelvalue]}
              </option>
            );
          })}
      </select>
      {/* <ArrowDownIcon className="absolute top-5 right-1" /> */}
    </div>
  );
}
