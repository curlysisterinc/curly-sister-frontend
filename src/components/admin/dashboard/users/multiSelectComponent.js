/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { certificationsList } from "./data";
import cancel from "../../../../assets/images/cancel.svg";

function MultiselectComponent({
  placeholder,
  values,
  onSelect,
  data,
  disable,
  onRemove,
}) {
  const style = {
    chips: {
      background: "rgba(89, 11, 169, 1)",
      borderRadius: "100px",
    },
    searchBox: {
      border: "1px solid rgba(213, 210, 215, 1)",
      borderRadius: "8px",
      width: "100%",
      padding: "8px",
      fontSize: "12px",
    },
    multiselectContainer: {
      color: "rgba(89, 11, 169, 1)",
    },
    inputField: {
      // To change input field position or margin
      fontSize: "14px",
      borderRadius: "8px",
      width: "fit-content",
      borderColor: "rgba(89, 11, 169, 1)",
    },
  };

  return (
    <Multiselect
      disable={disable}
      selectedValues={values}
      onSelect={onSelect}
      onRemove={onRemove}
      options={data}
      displayValue="name"
      placeholder={placeholder}
      style={style}
      closeIcon={cancel}
      id="css_custom"
    />
  );
}

export default MultiselectComponent;
