/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "react-select/creatable";

function Multiselect({ options, placeholder }) {
  // handle certficate multiselect
  const [certificateValue, setCertificateValue] = useState();
  const handleMultiSelectCertificate = (e) => {
    setCertificateValue(Array.isArray(e) ? e.map((x) => x.label) : []);
  };
  return (
    <Select
      onChange={handleMultiSelectCertificate}
      isMulti
      placeholder={placeholder}
      options={options}
      isSearchable
      autoFocus
    />
  );
}

export default Multiselect;
