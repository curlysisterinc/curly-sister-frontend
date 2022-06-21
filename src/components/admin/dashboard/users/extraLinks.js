/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import React from "react";
import trashIcon from "../../../../assets/images/trash.svg";

function ExtraLinks(props) {
  const links = [
    { link: "website", id: 1 },
    { link: "facebook", id: 2 },
    { link: "instagram", id: 3 },
  ];
  const [selected, setSelected] = React.useState("website");
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    if (!selected) return;
    setValue(event.target.value);
    props.onChange({ name: selected, value: event.target.value });
  };
  return (
    <div className=" relative">
      <label className="block text-black text-sm font-bold" htmlFor="link">
        <div className="relative flex h-10 mt-5 border border-gray-800 focus-within:border-indigo-500 rounded-lg overflow-hidden">
          <div className="border-r absolute border-gray-800 h-full top-0 inset-y-0 left-0 flex items-center">
            <select
              id="link"
              name="link"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500  h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-700 sm:text-sm rounded"
            >
              {links.map((option) => (
                <option value={option.link}>{option.link}</option>
              ))}
            </select>
          </div>
          <input
            value={value}
            className="shadow-sm pl-36 placeholder-text-sm appearance-none border-0  w-full h-full px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter link here"
            onChange={handleChange}
          />
          {props.count.length !== 1 && (
            <div
              onClick={() => props.onDelete(props.val.id, selected)}
              className="absolute right-0 border-l border-gray-800 px-2 h-full cursor-pointer flex items-center justify-center"
            >
              <img className="" src={trashIcon} alt="trash icon" />
            </div>
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
    //     onClick={() => props.onDelete(props.val.id, selected)}
    //     src={trashIcon}
    //     alt=""
    //   />
    // </div>
  );
}

export default ExtraLinks;
