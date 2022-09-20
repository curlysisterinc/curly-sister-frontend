import React, { useState, useEffect } from "react";
import useGetAllCertifications from "hooks/data/admin/useGetAllCertifications";
import { Loadersmall } from "components/loader-component/loader";
import FilterItem from "./FilterItem";

function CertificationFilter({
  handleSelectedCertificate,
  setFilteredCertifications,
  certifications,
  filteredCertifications,
  setCertifications,
  isCertificationsLoading,
  certificationsData,
}) {
  const [inputSearch, setInputSearch] = useState("");

  const handleSearchForCertificate = (e) => {
    setInputSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredCertifications(certifications);
    } else {
      const newFilteredCert = certifications.filter((item) =>
        item.name
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      );
      setFilteredCertifications(newFilteredCert);
    }
  };

  const extractSelectedCert = (certData) => {
    const selectedCert = certData
      .filter((cert) => cert.isSelected)
      .map((item) => item._id);
    return selectedCert;
  };

  const handleOnCheckboxChange = (id) => {
    const newCerts = certifications.map((item) => {
      if (item._id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    const newFilteredCerts = filteredCertifications.map((item) => {
      if (item._id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });

    const selectedCert = extractSelectedCert(newCerts);
    handleSelectedCertificate(selectedCert);
    setCertifications(newCerts);
    setFilteredCertifications(newFilteredCerts);
  };

  return (
    <div className="flex-grow-0 w-1/2 h-full">
      <div className="pb-2.5">
        <h3 className="text-gray-300 text-sm">Certifications</h3>
        <input
          className="border border-gray-100 rounded text-sm w-full px-3 py-2"
          type="input"
          aria-label="certificate search"
          onChange={handleSearchForCertificate}
          value={inputSearch}
          placeholder="search certification"
        />
      </div>

      <div className="overflow-auto h-full-62px">
        {isCertificationsLoading && <Loadersmall />}
        {certificationsData &&
          filteredCertifications?.map((cert) => {
            return (
              <FilterItem
                key={cert._id}
                data={cert}
                checked={cert.isSelected}
                handleOnChange={handleOnCheckboxChange}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CertificationFilter;
