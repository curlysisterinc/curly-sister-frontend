/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Select, SelectItem } from "../../../customSelect";
import trashIcon from "../../../../assets/images/trash.svg";

// function ExtraLinks(props) {
function ExtraLinks({
  buttonAction,
  globalInput,
  setGlobalInput,
  idx,
  opt,
  count,
  setCount,
  links,
  setLinks,
}) {
  const [selected, setSelected] = React.useState(opt);
  // const [inputValue, setInputValue] = React.useState("");

  const handleDelete = () => {
    const temp = count.filter((itm) => itm.id !== idx);
    setCount([...temp]);
  };

  const handleSelect = (event) => {
    const temp = count.map((itm) => {
      if (itm.id !== idx) {
        return itm;
      }
      return { ...itm, key: event };
    });
    setCount([...temp]);
    setSelected(event);

    setLinks([...links.filter((option) => option.link !== opt)]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGlobalInput((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className=" relative">
      <label className="block text-black text-sm font-bold" htmlFor="link">
        <div className="relative flex h-10 mt-5 border border-gray-800 focus-within:border-indigo-500 rounded-lg overflow-hidden">
          <div className="border-r absolute border-gray-800 h-full top-0 inset-y-0 left-0 flex items-center">
            <Select
              disabled={buttonAction === "Edit"}
              id="link"
              name="link"
              value={selected}
              onChange={handleSelect}
              className="focus:ring-indigo-500 focus:border-indigo-500  h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-700 sm:text-sm rounded flex items-center justify-between font-normal"
            >
              {links
                // .filter((option) => option.link !== opt)
                .map((option) => (
                  <SelectItem key={option.link} value={option.link}>
                    {option.link}
                  </SelectItem>
                ))}
            </Select>
          </div>
          <input
            disabled={buttonAction === "Edit"}
            value={globalInput[selected]}
            name={selected}
            className="shadow-sm pl-36 text-sm font-normal appearance-none border-0  w-full h-full px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter link here"
            onChange={handleChange}
          />
          {count.length !== 1 && (
            <button
              type="button"
              // name={selected}
              disabled={buttonAction === "Edit"}
              onClick={handleDelete}
              className="absolute right-0 border-l border-gray-800 px-2 h-full cursor-pointer flex items-center justify-center"
            >
              <img className="" src={trashIcon} alt="trash icon" />
            </button>
          )}
        </div>
      </label>
    </div>
    // <div>
    //   <select value={selected} onChange={(e) => setSelected(e.target.value)}>
    //     {links.map((option) => (
    //       <option value={option.link}>{option.link}</option>
    //     ))}
    //   </select>
    //   <input value={value} placeholder="Enter link" onChange={handleChange} />
    //   <img
    //     onClick={() => onDelete(val.id, selected)}
    //     src={trashIcon}
    //     alt=""
    //   />
    // </div>

    /* <select
                  disabled={buttonAction === "Edit"}
                  id="link"
                  name="link"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500  h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-700 sm:text-sm rounded"
                >
                  {links.map((option) => (
                    <option key={option.link} value={option.link}>
                      {option.link}
                    </option>
                  ))}
                </select> */
  );
}

export default ExtraLinks;
