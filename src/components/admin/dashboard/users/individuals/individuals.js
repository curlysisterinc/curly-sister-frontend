import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { AuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";
import useGetAllIndividuals from "hooks/data/admin/useGetAllIndividuals";
import { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import useGetUserProfile from "hooks/data/admin/useGetUserProfile";
import useSearchUser from "hooks/data/utility/useSearchUser";
import { useInView } from "react-intersection-observer";
import { queryClient } from "App";
import { filterOutEmptyObject } from "utils";
import searchIcon from "../../../../../assets/images/search-normal-2.svg";
import IndividualsRow from "./individualRow";
import DeleteContentModal from "./deleteContentModal";
import trashIcon from "../../../../../assets/images/trash.svg";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import StylistSearch from "../stylists/stylistSearch";

function InvidiualsTab({ active }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const [toggleActions, setToggleActions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [allIndividuals, setAllIndividuals] = useState([]);
  const [callToAction, setCallToAction] = useState(false);
  const [searchParam, setSearchParam] = useState({});
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [totalStylistCount, setTotalStylistCount] = useState(null);
  const [filteredArr, setFilteredArr] = useState([]);

  const searchRef = useRef({});

  const {
    data: userData,
    isLoading,
    error: err,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetAllIndividuals();
  // const individuals = data?.data?.data;

  const { isLoading: isUserprofileLoading, data: userProfileData } =
    useGetUserProfile();

  const {
    data: userSearchData,
    isFetching: isSearchFetching,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasSearchNextPage,
    error: searchError,
  } = useSearchUser({ query: searchParam, role: "user" });

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
    if (userData && !isSearchMode) {
      const data = queryClient.getQueryData(["individuals"]);
      const currentData = data.pages
        .map((item) => item.data.data.users)
        .flatMap((a) => a);
      setFilteredArr(currentData);
      setAllIndividuals(currentData);
      setTotalStylistCount(data.pages[0].data.totalCount);
    }
  }, [userData, !isSearchMode]);

  useEffect(() => {
    if (userSearchData && isSearchMode) {
      const data = queryClient.getQueryData(["userSearch", searchParam]);
      const currentData = data.pages
        .map((item) => item.data.users)
        .flatMap((a) => a);
      setFilteredArr(currentData);
      setAllIndividuals(currentData);
    }
  }, [userSearchData, isSearchMode]);

  const onMasterCheck = (e) => {
    if (e.target.checked) {
      setSelectedId(allIndividuals.map((individual) => individual._id));
      setCallToAction(true);
    } else {
      setSelectedId([]);
      setCallToAction(false);
    }
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleSearchAddress = (search) => {
    setDataToRef({
      query: search,
    });
    setIsSearchMode(true);
    setSearchParam(searchRef.current.value);
  };

  const setDataToRef = (searchValue) => {
    if (searchRef?.current?.value) {
      const newData = { ...searchRef.current.value, ...searchValue };
      filterOutEmptyObject(newData);
      searchRef.current.value = { ...newData };
    } else {
      filterOutEmptyObject(searchValue);
      searchRef.current.value = { ...searchValue };
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

  const isPaginationLoading =
    (!isSearchMode && hasNextPage) || (isSearchMode && hasSearchNextPage);
  return (
    <div className="h-screen-300px">
      <div className="flex items-end justify-between">
        <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
          Individuals
          <span className="text-gray-300 ml-2 text-sm">
            {allIndividuals.length}
          </span>
        </div>
        <div className="">
          {/* filters */}
          {callToAction ? (
            <button
              type="button"
              onClick={() => setToggleActions(!toggleActions)}
              className="cursor-pointer bg-white relative text-gray-400 border border-gray-250 h-10 font-BeatriceSemiBold text-sm flex justify-between items-center  rounded-full p-3"
            >
              Actions
              <img
                className={clsx(
                  toggleActions && "transform rotate-180",
                  "ml-6"
                )}
                src={dropdownIcon}
                alt=""
              />
              {toggleActions && (
                <div className="absolute bg-white rounded-xl top-10 shadow w-full right-0">
                  <button
                    type="button"
                    onClick={openDeleteModal}
                    className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
                  >
                    <img className="mr-2" src={trashIcon} alt="" />
                    Delete
                  </button>
                </div>
              )}
            </button>
          ) : (
            <div className="">
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                  <div className="mr-2 w-140 border border-gray-800  rounded-full px-3 h-10 flex justify-center items-center">
                    More filters
                  </div>

                  <StylistSearch
                    handleSearchAddress={handleSearchAddress}
                    setIsSearchMode={setIsSearchMode}
                    isSearchLoading={isSearchFetching}
                    placeholder="Search Users"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* table */}
      {allIndividuals && (
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
                          id="mastercheck"
                          onChange={onMasterCheck}
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
                        Date joined
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-400 px-6 py-4"
                      >
                        bookings
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

                  <tbody className="">
                    <IndividualsRow
                      individualList={allIndividuals}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                      setCallToAction={setCallToAction}
                    />
                  </tbody>
                </table>
                <div className="my-10" />
              </div>
            </div>
          </div>
        </div>
      )}
      {(isLoading || isUserprofileLoading) && <Loadersmall />}
      {err && <ErrorDisplayComponent refetch={refetch} />}
      {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
    </div>
  );
}

export default InvidiualsTab;
