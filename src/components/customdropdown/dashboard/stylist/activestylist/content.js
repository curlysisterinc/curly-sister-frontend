import React from "react";
import DropDownItem from "../../../primitive/DropDownItem";
import DropDownMenuContent from "../../../primitive/DropDownMenuContent";

function content({ setBool }) {
  const clickhandler = (e) => {
    const { name } = e.target;
    if (name === "active") {
      setBool((prev) => ({ ...prev, active: true }));
    }
    if (name === "in Active") {
      setBool((prev) => ({ ...prev, active: false }));
    }
  };
  return (
    <DropDownMenuContent className="absolute bg-white rounded-xl  shadow w-32 ">
      <DropDownItem>
        <button
          type="button"
          name="active"
          onClick={clickhandler}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
        >
          Active
        </button>
      </DropDownItem>
      <DropDownItem>
        <button
          type="button"
          name="in Active"
          onClick={clickhandler}
          className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer "
        >
          In Active
        </button>
      </DropDownItem>
    </DropDownMenuContent>
  );
}

export default content;
