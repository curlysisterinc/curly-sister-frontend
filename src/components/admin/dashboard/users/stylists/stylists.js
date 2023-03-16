/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from "react";
import admin from "api/admin";
import { useQuery } from "@tanstack/react-query";
import useGetAllStylists from "hooks/data/admin/useGetAllStylists";
import Loader, { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { useInView } from "react-intersection-observer";
import { queryClient } from "App";
import MoreFilters from "components/user/stylist/filterPanel/MoreFilters";
import useSearchStylist from "hooks/data/utility/useSearchStylist";
import { filterOutEmptyObject } from "utils";
import StylistFilterPanel from "./stylistFilterPanel";
import searchIcon from "../../../../../assets/images/search-normal-2.svg";
import StylistRow from "./stylistRow";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import TypesContent from "../../../../customdropdown/dashboard/types";
import NewStylist from "../../../../customdropdown/dashboard/stylist/newstylist";
import trashIcon from "../../../../../assets/images/trash.svg";
import DeleteContentModal from "../../content/deleteContentModal";

function StylistTab() {
  const [typeValue, setTypeValue] = useState("All types");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [callToAction, setCallToAction] = useState(false);
  const [toggleActions, setToggleActions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [totalStylistCount, setTotalStylistCount] = useState(null);
  const [searchParam, setSearchParam] = useState({});
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [filteredArr, setFilteredArr] = useState([]);
  const [stylistList, setStylistList] = React.useState([]);
  const [coord, setCoord] = useState({ lat: "", lng: "" });

  const searchRef = useRef({});

  const {
    data: stylistSearchData,
    isFetching: isSearchFetching,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasSearchNextPage,
    error: searchError,
  } = useSearchStylist({ query: searchParam });

  const {
    data: stylistData,
    isLoading,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetAllStylists();

  const [ref2, inView] = useInView();

  React.useEffect(() => {
    const fetchNextDatePage = !isSearchMode
      ? fetchNextPage
      : fetchNextSearchPage;

    if (inView) {
      fetchNextDatePage();
    }
  }, [inView, isSearchMode]);

  React.useEffect(() => {
    if (stylistData && !isSearchMode) {
      const data = queryClient.getQueryData(["stylists"]);
      if (data?.pages) {
        const currentData =
          data?.pages.map((item) => item.data.stylist).flatMap((a) => a) ?? [];
        setFilteredArr(currentData);
        setStylistList(currentData);
        setTotalStylistCount(data.pages[0].data.totalCount);
      }
    }
  }, [stylistData, !isSearchMode]);

  useEffect(() => {
    if (stylistSearchData && isSearchMode) {
      const data = queryClient.getQueryData(["stylistsSearch", searchParam]);
      if (data?.pages) {
        const currentData =
          data?.pages.map((item) => item.data.stylist).flatMap((a) => a) ?? [];

        setFilteredArr(currentData);
        setStylistList(currentData);
        // setTotalStylistCount(data.pages[0].data.totalSearchCount);
        const stylistWithCords = currentData.find((item) => item.longitude);
        if (stylistWithCords) {
          setCoord({
            ...coord,
            lat: Number(stylistWithCords.latitude),
            lng: Number(stylistWithCords.longitude),
          });
        }
      }
    }
  }, [stylistSearchData, isSearchMode]);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const checkAll = (e) => {
    if (e.target.checked) {
      setCallToAction(true);

      setSelectedId(stylists.map((stylist) => stylist._id));
    } else {
      setCallToAction(false);

      setSelectedId([]);
    }
  };

  React.useEffect(() => {
    const ac = new AbortController();
    if (!Object.keys(searchParam).length) {
      setIsSearchMode(false);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [searchParam]);

  const handleSearchAddress = (data) => {
    setDataToRef({
      business_name: data,
    });
    setIsSearchMode(true);
    setSearchParam(searchRef.current.value);
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

  const isPaginationLoading =
    (!isSearchMode && hasNextPage) || (isSearchMode && hasSearchNextPage);

  return (
    <div className="h-screen-300px mt-10">
      <StylistFilterPanel
        handleSearchAddress={handleSearchAddress}
        setIsSearchMode={setIsSearchMode}
        isSearchLoading={isSearchFetching}
        totalStylistCount={totalStylistCount}
        stylists={stylistList}
        // getLocation={getLocation}
      />
      {stylistData && (
        <div>
          <div className="flex flex-col mt-4">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="max-h-screen-300px overflow-auto shadow-s01 border border-gray-600 rounded-2xl">
                  <table className="min-w-full text-left rounded-2xl pb-40">
                    <thead className="bg-gray-50 uppercase text-sm text-gray-300 sticky z-50 -top-px">
                      <tr>
                        <th scope="col ">
                          <input
                            type="checkbox"
                            className="ml-3"
                            id="checkallstylist"
                            onChange={checkAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-400 px-6 py-4"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-400 px-6 py-4"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-400 px-6 py-4"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-400 px-6 py-4"
                        >
                          Status
                        </th>
                        <th
                          aria-label="extra action"
                          scope="col"
                          className="text-sm font-medium text-gray-400 px-6 py-4"
                        />
                      </tr>
                    </thead>

                    {stylistList.length > 0 && (
                      <tbody className="">
                        <StylistRow
                          query={query}
                          selectedId={selectedId}
                          setSelectedId={setSelectedId}
                          setCallToAction={setCallToAction}
                          stylistsList={stylistList}
                          // setGetStylist={setGetStylist}
                        />
                      </tbody>
                    )}
                  </table>
                  {stylistList.length === 0 && (
                    <div className="text-lg text-center mt-8">
                      No stylist available
                    </div>
                  )}
                  <div className="my-10" />
                  {isPaginationLoading && (
                    <div className="loading" ref={ref2}>
                      <Loader />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {deleteModal && (
              <DeleteContentModal handleClose={closeDeleteModal} />
            )}
          </div>
        </div>
      )}
      <div className="w-full items-center justify-center flex">
        {!isPaginationLoading && (isLoading || isFetching) && <Loadersmall />}
      </div>
      {(error || searchError) && <ErrorDisplayComponent refetch={refetch} />}
    </div>
  );
}

export default StylistTab;
