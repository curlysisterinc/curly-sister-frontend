import React, { useState } from "react";
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
    const index = timeArr.findIndex((itm) => itm.value === e);
    setFirstIndex(index);
    const defaultTime2 = timeArr[index + 1].value;

    bookingStarttime(selectedid, e, defaultTime2);
  };

  const onSelectchangetwo = (e) => {
    bookingEndtime(selectedid, e);
  };

  return (
    <div className="flex items-center">
      <Select
        id="t1"
        name="t1"
        className={selectclassname}
        onChange={onSelectchangeone}
        value={from}
        disabled={buttonAction === "Edit"}
        default={defaultval}
      >
        {timeArr.slice(0, -1).map((itm) => {
          return (
            <SelectItem key={itm.value} value={itm.value}>
              {itm.label}
            </SelectItem>
          );
        })}
      </Select>
      <img className="mx-2" src={dash} alt="" />
      <Select
        onChange={onSelectchangetwo}
        id="t2"
        name="t2"
        className={selectclassname}
        disabled={buttonAction === "Edit"}
        value={to}
        default={defaultval}
      >
        {timeArr.slice(firstIndex + 1).map((itm) => {
          return (
            <SelectItem key={itm.value} value={itm.value}>
              {itm.label}
            </SelectItem>
          );
        })}
      </Select>
    </div>
  );
}

export default TimeRange;
