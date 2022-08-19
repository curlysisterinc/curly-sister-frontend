import React from "react";
import { Loadersmall } from "components/loader-component/loader";
import { useParams } from "react-router-dom";
import useUpdateStylist from "hooks/data/admin/useUpdateStylist";
import DropDown from "../../../primitive";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import Content from "./content";

function ActiveStylist({ bool, setBool, detailActionBtn }) {
  const { isLoading, data, error, mutate } = useUpdateStylist();
  const { id } = useParams();

  const handleSelectItem = (e) => {
    const { name } = e.target;
    const value = name === "active";
    setBool((prev) => ({ ...prev, active: value }));
    mutate({ active: value, id });
    // if (name === "active") {
    //   setBool((prev) => ({ ...prev, active: true }));
    // }
    // if (name === "in Active") {
    //   setBool((prev) => ({ ...prev, active: false }));
    // }
  };
  // const handleSelectItem = (value) => {
  //   const previousValue = bool;

  //   if (previousValue === value) {
  //     return value;
  //   }

  //   setBool((prev) => ({
  //     ...prev,
  //     category_type: value,
  //   }));
  //   mutate({ category_type: value, id });
  //   return null;
  // };

  return (
    <DropDown
      disabled={detailActionBtn === "Edit"}
      content={<Content handleSelectItem={handleSelectItem} />}
    >
      <button
        type="button"
        className="cursor-pointer mr-2 bg-white w-32 relative font-normal text-gray-400 h-10 font-BeatriceSemiBold text-sm capitalize flex justify-between items-center border border-solid border-gray-800  rounded-full p-3"
      >
        {bool ? "active" : "in Active"}
        {isLoading ? (
          <Loadersmall />
        ) : (
          <img src={dropdownIcon} alt="drop down icon" />
        )}
      </button>
    </DropDown>
  );
}

export default ActiveStylist;
