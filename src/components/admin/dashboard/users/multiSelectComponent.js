/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { certificationsList } from "./data";
import cancel from "../../../../assets/images/cancel.svg";

function MultiselectComponent({ placeholder, index, data }) {
  const [plainArray, setPlainArray] = useState([
    { key: "Certification 1", cat: "Group 1" },
    { key: "Certification 2", cat: "Group 1" },
    { key: "Certification 3", cat: "Group 1" },
    { key: "Certification 4", cat: "Group 2" },
    { key: "Certification 5", cat: "Group 2" },
    { key: "Certification 6", cat: "Group 2" },
    { key: "Certification 7", cat: "Group 2" },
  ]);

  const [selectedValues, setSelectedValues] = useState([
    { key: "Certification 1", cat: "Group 1" },
    { key: "Certification 2", cat: "Group 1" },
  ]);

  const style = {
    chips: {
      background: "rgba(89, 11, 169, 1)",
      "border-radius": "100px",
    },
    searchBox: {
      border: "1px solid rgba(213, 210, 215, 1)",
      "border-radius": "8px",
      width: "100%",
    },
    multiselectContainer: {
      color: "rgba(89, 11, 169, 1)",
    },
  };
  return (
    <Multiselect
      options={data?.map((item, index) => ({ key: item.name, cat: index }))}
      displayValue="key"
      selectedValues={data
        ?.slice(0, 2)
        ?.map((item, index) => ({ key: item.name, cat: index }))}
      placeholder={placeholder}
      style={style}
      closeIcon={cancel}
      id="css_custom"
    />
  );
}

export default MultiselectComponent;
