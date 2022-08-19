import React, { useEffect, useRef } from "react";
import { Loadersmall } from "components/loader-component/loader";
import useUpdateStylist from "hooks/data/admin/useUpdateStylist";
import { useParams } from "react-router-dom";
import DropDown from "../../../primitive";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import Content from "./content";

function StylistCategory({
  setTypeValue,
  typeValue,
  setHiddenTabs,
  detailActionBtn,
}) {
  const { isLoading, data, error, mutate } = useUpdateStylist();
  const { id } = useParams();

  const handleSelectItem = (value) => {
    const previousValue = typeValue;

    if (previousValue === value) {
      return value;
    }

    setTypeValue((prev) => ({
      ...prev,
      category_type: value,
    }));
    mutate({ category_type: value, id });
    return null;
  };

  return (
    <DropDown
      content={
        <Content
          handleSelectItem={handleSelectItem}
          setHiddenTabs={setHiddenTabs}
        />
      }
      disabled={detailActionBtn === "Edit"}
    >
      <button
        type="button"
        className="cursor-pointer mr-2 bg-white w-48 relative font-normal text-gray-400 h-10 font-BeatriceSemiBold text-sm capitalize flex justify-between items-center border border-solid border-gray-800  rounded-full py-[0.625rem] px-4"
      >
        {typeValue}
        {isLoading ? (
          <Loadersmall />
        ) : (
          <img src={dropdownIcon} alt="drop down icon" />
        )}
      </button>
    </DropDown>
  );
}

export default StylistCategory;
