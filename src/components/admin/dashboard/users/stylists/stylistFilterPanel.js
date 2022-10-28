import React, { useState } from "react";
import useGetServices from "hooks/data/admin/useGetServices";
import SearchBar from "components/user/stylist/filterPanel/Search";
import CategoryDropdown from "components/user/stylist/filterPanel/CategoryOptions";
import ToggleBookedService from "components/user/stylist/filterPanel/ToggleBookedService";
import ServiceList from "components/user/stylist/filterPanel/ServiceList";
import MoreFilters from "components/user/stylist/filterPanel/MoreFilters";
import NewStylist from "components/customdropdown/dashboard/stylist/newstylist";
import StylistSearch from "./stylistSearch";

function StylistFilterPanel({
  handleSearchAddress,
  getLocation,
  setIsSearchMode,
  isSearchLoading,
  totalStylistCount,
  stylists,
}) {
  const [isServiceAvailable, setIsServiceAvailable] = useState(false);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleServiceAvailability = () => {
    setIsServiceAvailable((available) => !available);
  };

  return (
    <div className="flex  justify-between flex-wrap flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
      <div className="flex items-center justify-between pr-10">
        <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
          Stylists
          <span className="text-gray-300 ml-2 text-sm">
            {totalStylistCount &&
              `${stylists.length} ${
                stylists.length > 1 ? "stylists" : "stylist"
              }  out of ${totalStylistCount}`}
          </span>
        </div>
      </div>

      <div className="relative  flex items-center justify-start flex-1 flex-wrap md:justify-end space-x-4">
        <CategoryDropdown
          handleSearchAddress={handleSearchAddress}
          setIsSearchMode={setIsSearchMode}
        />
        <MoreFilters
          handleSearchAddress={handleSearchAddress}
          setIsSearchMode={setIsSearchMode}
        />

        <StylistSearch
          handleSearchAddress={handleSearchAddress}
          setIsSearchMode={setIsSearchMode}
          isSearchLoading={isSearchLoading}
        />
        <NewStylist />
      </div>
    </div>
  );
}

export default StylistFilterPanel;
