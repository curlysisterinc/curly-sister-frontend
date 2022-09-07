import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import useGetAllStylists from "hooks/data/admin/useGetAllStylists";
import useSearchStylist from "hooks/data/utility/useSearchStylist";
import useGetCurrentLocation from "hooks/useGetCurrentLocation";

import admin from "api/admin";
import Loader from "components/loader-component/loader";
import { useInView } from "react-intersection-observer";
import { queryClient } from "App";
import debounce from "lodash.debounce";
import FilterPanel from "./filterPanel";
import StylistList from "./StylistList";

function Stylist() {
  const positionData = useGetCurrentLocation();
  const {
    status,
    data: stylistData,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    refetch,
  } = useGetAllStylists();

  const {
    data: stylistSearchData,
    isLoading: isSearchLoading,
    error: isSearchError,
    mutate: searchStylist,
    reset: resetSearchResult,
  } = useSearchStylist();

  const [ref2, inView2] = useInView();

  const [selectBookableStylist, setSelectBookableStylist] = useState(false);
  const [categories, setCategories] = useState("all-stylist");
  const [coord, setCoord] = useState({ lat: "", lng: "" });
  const [searchAddress, setSearchAddress] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [getServices, setGetServices] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [stylistList, setStylistList] = React.useState([]);
  const [isMapFixed, setIsMapFixed] = React.useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSelectToggle = () => {
    // console.log("handleSelectToggle", selectBookableStylist);
    setSelectBookableStylist(!selectBookableStylist);
  };

  const handleSelectCategory = (e) => {
    setCategories(e.target.value);
  };

  const handleOnCheckboxChange = (id, value) => {
    const newArr = certifications;
    const getCheckedItems = newArr.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCertifications(getCheckedItems);
  };

  React.useEffect(() => {
    if (inView2) {
      setIsMapFixed(false);
    } else {
      setIsMapFixed(true);
    }
  }, [inView2]);

  React.useEffect(() => {
    if (stylistData && !isSearchMode) {
      const data = queryClient.getQueryData(["stylists"]);
      if (stylistSearchData) resetSearchResult();
      const currentData = data.pages
        .map((item) => item.data.stylist)
        .flatMap((a) => a);
      setFilteredArr(currentData);
      setStylistList(currentData);
    }
  }, [stylistData, !isSearchMode]);

  useEffect(() => {
    if (stylistSearchData && isSearchMode) {
      setFilteredArr(stylistSearchData.data.stylist);
      setStylistList(stylistSearchData.data.stylist);
      const stylistWithCords = stylistSearchData.data.stylist.find(
        (item) => item.longitude
      );
      if (stylistWithCords) {
        setCoord({
          ...coord,
          lat: Number(stylistWithCords.latitude),
          lng: Number(stylistWithCords.longitude),
        });
      }
    }
  }, [stylistSearchData, isSearchMode]);

  React.useEffect(() => {
    const ac = new AbortController();
    const fetchData = () => {
      admin.GetServices().then((response) => {
        setGetServices(response.data.data);
      });
    };
    fetchData();
    return function cleanup() {
      ac.abort();
    };
  }, []);

  // React.useEffect(() => {
  //   applyFilter();
  // }, [selectBookableStylist, categories]);

  // Store autocomplete object in a ref.
  // This is done because refs do not trigger a re-render when changed.
  const autocompleteRef = useRef(null);

  const getLocation = useCallback(() => {
    setCoord({
      ...coord,
      lat: positionData?.position.lat,
      lng: positionData?.position.lng,
    });
  }, [positionData]);

  useEffect(() => {
    if (positionData.status === "data") {
      getLocation();
    }
  }, [positionData.status]);

  const handlePlaceSelect = () => {
    const places = autocompleteRef.current.getPlaces();

    if (places.length === 0) {
      return;
    }

    const place = places[0];
    const geo = place.geometry.location;
    const address = place.address_components;

    const componentMap = {};

    address.map((item) => {
      const { types } = item;
      if (types.includes("country")) {
        componentMap.country = item.long_name;
      }
      if (types.includes("administrative_area_level_1")) {
        componentMap.state = item.long_name;
      }
      if (types.includes("administrative_area_level_2")) {
        componentMap.city = item.long_name;
      }
      return null;
    });

    searchStylist({
      address: document.getElementById("searchInput").value,
    });

    setCoord({
      ...coord,
      lat: geo.lat(),
      lng: geo.lng(),
    });
  };

  // const handleScriptLoad = (map, maps) => {
  //   // Initialize Google Autocomplete
  //   /* global google */ // To disable any eslint 'google not defined' errors
  //   autocompleteRef.current = new google.maps.places.SearchBox(
  //     document.getElementById("searchInput")
  //   );

  //   autocompleteRef.current.addListener("places_changed", handlePlaceSelect);
  // };

  const handleClick = () => {
    getLocation();
    document.getElementById("searchInput").value = "";
  };

  const handleSearchAddress = (address) => {
    searchStylist({
      address,
    });
  };

  const SearchAddress = useCallback(
    (address) => {
      return handleSearchAddress(address);
    },
    [handleSearchAddress]
  );

  return (
    <div className="bg-white px-10 pt-8 w-full min-h-screen mt-50 md:mt-0">
      {isFetching && <Loader />}
      {stylistData && (
        <>
          <div ref={ref2}>
            <FilterPanel
              selectToggle={handleSelectToggle}
              selectBookableStylist={selectBookableStylist}
              certifications={certifications}
              handleOnCheckboxChange={handleOnCheckboxChange}
              categories={categories}
              handleSelectCategory={handleSelectCategory}
              getServices={getServices}
              handleClick={handleClick}
              handleSearchAddress={SearchAddress}
              setIsSearchMode={setIsSearchMode}
              isSearchLoading={isSearchLoading}
            />
            <hr className="w-full border border-gray-600 mt-8" />
          </div>
          <StylistList
            list={stylistList}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            selectedPlace={{ lat: coord.lat, lng: coord.lng }}
            positionData={positionData}
            isSearchMode={isSearchMode}
            // handleScriptLoad={handleScriptLoad}
            isMapFixed={isMapFixed}
          />
        </>
      )}
      {error && <p>Error </p>}
    </div>
  );
}

export default Stylist;
