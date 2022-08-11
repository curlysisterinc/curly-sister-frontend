import React from "react";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";

function content({ setTypeValue, setHiddenTabs }) {
  return (
    <DropDownMenuContent className="absolute bg-white rounded-xl  shadow w-44 ">
      <DropDownItem>
        <button
          type="button"
          onClick={() => {
            setTypeValue((prev) => ({
              ...prev,
              category_type: "walk-in only",
            }));
            setHiddenTabs(false);
          }}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
        >
          Walk-in Only
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => {
            setTypeValue((prev) => ({
              ...prev,
              category_type: "curly sister stylist",
            }));
            setHiddenTabs(true);
          }}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          Curly sister stylist
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          onClick={() => {
            setTypeValue((prev) => ({
              ...prev,
              category_type: "master stylist",
            }));
            setHiddenTabs(true);
          }}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          Master stylist
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default content;
