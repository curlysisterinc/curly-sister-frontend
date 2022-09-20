/* eslint-disable no-param-reassign */
/* eslint-disable new-cap */
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

import Loader from "components/loader-component/loader";
import { useInView } from "react-intersection-observer";
import { queryClient } from "App";
import FilterPanel from "./filterPanel";
import StylistList from "./StylistList";

function Stylist() {
  const positionData = useGetCurrentLocation();
  const searchRef = useRef({});
  const [ref2, inView2] = useInView();

  const [coord, setCoord] = useState({ lat: "", lng: "" });
  const [searchParam, setSearchParam] = useState({});

  const [filteredArr, setFilteredArr] = useState([]);
  const [stylistList, setStylistList] = React.useState([]);
  const [isMapFixed, setIsMapFixed] = React.useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [totalStylistCount, setTotalStylistCount] = useState(null);

  const {
    data: stylistData,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error,
  } = useGetAllStylists();

  const {
    data: stylistSearchData,
    isFetching: isSearchFetching,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasSearchNextPage,
    error: searchError,
  } = useSearchStylist({ query: searchParam });

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

  // const handleOnCheckboxChange = (id, value) => {
  //   const newArr = certifications;
  //   const getCheckedItems = newArr.map((item) =>
  //     item.id === id ? { ...item, checked: !item.checked } : item
  //   );
  //   setCertifications(getCheckedItems);
  // };

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
      const currentData = data.pages
        .map((item) => item.data.stylist)
        .flatMap((a) => a);
      setFilteredArr(currentData);
      setStylistList(currentData);
      setTotalStylistCount(data.pages[0].data.totalStylistCount);
    }
  }, [stylistData, !isSearchMode]);

  useEffect(() => {
    if (stylistSearchData && isSearchMode) {
      const data = queryClient.getQueryData(["stylistsSearch", searchParam]);
      const currentData = data.pages
        .map((item) => item.data.stylist)
        .flatMap((a) => a);

      setFilteredArr(currentData);
      setStylistList(currentData);
      setTotalStylistCount(data.pages[0].data.totalSearchCount);
      const stylistWithCords = currentData.find((item) => item.longitude);
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
    if (!Object.keys(searchParam).length) {
      setIsSearchMode(false);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [searchParam]);

  const filterOutEmptyObject = (obj) => {
    Object.keys(obj).map((item) => {
      if (!obj[item] || (Array.isArray(obj[item]) && !obj[item].length)) {
        delete obj[item];
      }
      return null;
    });
  };

  const setDataToRef = (data) => {
    if (searchRef?.current?.value) {
      const newData = { ...searchRef.current.value, ...data };
      filterOutEmptyObject(newData);
      searchRef.current.value = { ...newData };
    } else {
      filterOutEmptyObject(data);
      searchRef.current.value = { ...data };
    }
  };

  const handleSearchAddress = (data) => {
    setDataToRef(data);
    setSearchParam(searchRef.current.value);
  };

  return (
    <div className="bg-white px-5 lg:px-10 pt-32px w-full min-h-screen mt-50 md:mt-0">
      {isFetching && <Loader />}
      {stylistData && (
        <>
          <div ref={ref2}>
            <FilterPanel
              handleSearchAddress={handleSearchAddress}
              setIsSearchMode={setIsSearchMode}
              isSearchLoading={isSearchFetching}
              getLocation={getLocation}
            />
            <hr className="w-full border border-gray-600" />
          </div>
          <StylistList
            list={stylistList}
            fetchNextPage={!isSearchMode ? fetchNextPage : fetchNextSearchPage}
            hasNextPage={hasNextPage}
            hasSearchNextPage={hasSearchNextPage}
            selectedPlace={{ lat: coord.lat, lng: coord.lng }}
            positionData={positionData}
            isSearchMode={isSearchMode}
            totalStylistCount={totalStylistCount}
            isMapFixed={isMapFixed}
          />
        </>
      )}
      {(error || searchError) && <p>Error </p>}
    </div>
  );
}

export default Stylist;
