import React, { useState } from "react";
import SelectOptions from "components/selectOptions";
import { Select, SelectItem } from "../../../../../customSelect";
import dash from "../../../../../../assets/images/dash.svg";
import { timeArr } from "../../data";

const selectclassname =
  "flex items-center justify-between shadow-sm appearance-none border border-gray-800 rounded w-32 py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline";

function TimeRange({
  selected,
  selectedid,
  bookingEndtime,
  bookingStarttime,
  buttonAction,
  defaultval,
}) {
  const [firstIndex, setFirstIndex] = useState(0);

  const { from, to } = selected;

  const onSelectchangeone = (e) => {
    const index = timeArr.findIndex((itm) => itm.value === e.target.value);
    setFirstIndex(index);
    const defaultTime2 = timeArr[index + 1].value;
    bookingStarttime(selectedid, e.target.value, defaultTime2);
  };

  const onSelectchangetwo = (e) => {
    bookingEndtime(selectedid, e.target.value);
  };

  return (
    <div className="flex items-center">
      <SelectOptions
        placeholder="Start time"
        collection={timeArr.slice(0, -1)}
        onChange={onSelectchangeone}
        name="from"
        // selectedValue="value"
        optionvalue="value"
        optionlabelvalue="label"
        value={from}
      />

      <img className="mx-2" src={dash} alt="" />

      <SelectOptions
        placeholder="End time"
        collection={timeArr.slice(firstIndex + 1)}
        onChange={onSelectchangetwo}
        name="from"
        // selectedValue="value"
        optionvalue="value"
        optionlabelvalue="label"
        value={to}
      />
    </div>
  );
}

export default TimeRange;
