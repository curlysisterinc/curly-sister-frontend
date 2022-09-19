import React, { useState, useEffect } from "react";
import useGetAllCertifications from "hooks/data/admin/useGetAllCertifications";
import { Loadersmall } from "components/loader-component/loader";
import FilterItem from "./FilterItem";

function CertificationFilter() {
  const { data, isLoading, error, refetch } = useGetAllCertifications();

  const [filteredCertifications, setFilteredCertifications] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    if (data) {
      setFilteredCertifications(data.data.data);
      setCertifications(data.data.data);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [data]);

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
      <div className="overflow-scroll h-full-20px">
        {isLoading && <Loadersmall />}
        {data &&
          filteredCertifications?.map((cert) => {
            return (
              <FilterItem
                key={cert.id}
                data={cert}
                // handleOnChange={handleOnCheckboxChange}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CertificationFilter;
