import React from "react";
import { weekList } from "../../data";

function DaysRange({
  selected,
  selectedid,
  addDays,
  removeDays,
  buttonAction,
  availabledays,
}) {
  const onDayCheck = (e) => {
    const { checked, value } = e.target;
    if (checked === true) {
      addDays(selectedid, value);
    }
    if (checked === false) {
      removeDays(selectedid, value);
    }
  };

  return (
    <div className="flex justify-center pb-2 flex-wrap justify-start">
      {weekList.map((dayofweek) => {
        return (
          <div key={`${selectedid}-${dayofweek.id}`} className="mr-6">
            <label
              className="flex flex-col justify-center items-center text-gray-800"
              htmlFor={`${selectedid}-${dayofweek.id}`}
            >
              <input
                // disabled={buttonAction === "Edit"}
                // disabled
                className="form-check-input appearance-none h-5 w-5 rounded-md border border-gray-300 bg-white text-purple-100 checked:border-purple-100 disabled:text-red-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain  cursor-pointer"
                type="checkbox"
                id={`${selectedid}-${dayofweek.id}`}
                checked={selected?.includes(dayofweek.day)}
                onChange={onDayCheck}
                value={dayofweek.day}
              />
              <p className="text-sm text-gray-400 mt-4">{dayofweek.day}</p>
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default DaysRange;
