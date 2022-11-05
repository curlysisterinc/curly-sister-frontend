import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { AuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";
import useGetAllAdmins from "hooks/data/admin/useGetAllAdmins";
import { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import useGetUserProfile from "hooks/data/admin/useGetUserProfile";
import { filterOutEmptyObject } from "utils";
import useSearchUser from "hooks/data/utility/useSearchUser";
import { useInView } from "react-intersection-observer";
import { queryClient } from "App";
import AdminRow from "./adminRow";
import InviteAdminModal from "./inviteAdminModal";
import trashIcon from "../../../../../assets/images/trash.svg";
import admin from "../../../../../api/admin";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import DeleteContentModal from "./deleteContentModal";
import { AdminTable } from "./adminTableHeader";
import StylistSearch from "../stylists/stylistSearch";

function AdminTab({ active }) {
  const navigate = useNavigate();
  const [adminDataList, setAdminDataList] = useState([]);
  const [openInviteAdminModal, setOpenInviteAdminModal] = useState(false);
  const [callToAction, setCallToAction] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [toggleActions, setToggleActions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchParam, setSearchParam] = useState({});
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [totalStylistCount, setTotalStylistCount] = useState(null);
  const [filteredArr, setFilteredArr] = useState([]);
  // const [stylistList, setStylistList] = React.useState([]);

  const searchRef = useRef({});

  const {
    data: adminData,
    isLoading,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetAllAdmins();

  const { isLoading: isUserprofileLoading, data: userProfileData } =
    useGetUserProfile();

  const {
    data: adminSearchData,
    isFetching: isSearchFetching,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasSearchNextPage,
    error: searchError,
  } = useSearchUser({ query: searchParam, role: "admin" });

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
    if (adminData && !isSearchMode) {
      const data = queryClient.getQueryData(["admins"]);
      const currentData = data.pages
        .map((item) => item.data.data.admins)
        .flatMap((a) => a);
      setFilteredArr(currentData);
      setAdminDataList(currentData);
      setTotalStylistCount(data.pages[0].data.totalCount);
    }
  }, [adminData, !isSearchMode]);

  useEffect(() => {
    if (adminSearchData && isSearchMode) {
      const data = queryClient.getQueryData(["userSearch", searchParam]);

      const currentData = data.pages
        .map((item) => item.data.users)
        .flatMap((a) => a);
      setFilteredArr(currentData);
      setAdminDataList(currentData);
      // setTotalStylistCount(data.pages[0].data.totalSearchCount);
    }
  }, [adminSearchData, isSearchMode]);

  const onMasterCheck = (e) => {
    if (e.target.checked) {
      setCallToAction(true);
      setSelectedId(adminDataList.map((item) => item._id));
    } else {
      setCallToAction(false);
      setSelectedId([]);
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
    <div className="h-screen-170px">
      <div className="flex items-center justify-between">
        <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
          Admins
          <span className="text-gray-300 ml-2 text-sm">
            {adminDataList.length}
          </span>
        </div>
        {callToAction ? (
          <button
            type="button"
            onClick={() => setToggleActions(!toggleActions)}
            className="cursor-pointer bg-white relative text-gray-400 border border-gray-250 h-10 font-BeatriceSemiBold text-sm flex justify-between items-center  rounded-full p-3"
          >
            Actions
            <img
              className={clsx(toggleActions && "transform rotate-180", "ml-6")}
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
          <div className="relative  flex items-center justify-start flex-1 flex-wrap md:justify-end space-x-4">
            <StylistSearch
              handleSearchAddress={handleSearchAddress}
              setIsSearchMode={setIsSearchMode}
              isSearchLoading={isSearchFetching}
              placeholder="Search Admin"
            />
            <button
              type="button"
              onClick={() => setOpenInviteAdminModal(true)}
              className="bg-purple-100 text-white text-sm py-2 px-4 rounded-full "
            >
              Invite admin
            </button>
          </div>
        )}
      </div>
      {adminData && userProfileData && (
        <AdminTable
          profile={userProfileData.data.data}
          empty={adminDataList?.length === 0 && "No Admin data available"}
        >
          <AdminRow
            setCallToAction={setCallToAction}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            getAdmin={adminDataList}
            setGetAdmin={setAdminDataList}
            profile={userProfileData.data.data}
          />
        </AdminTable>
      )}

      {(isLoading || isUserprofileLoading) && <Loadersmall />}
      {error && <ErrorDisplayComponent refetch={refetch} />}
      {openInviteAdminModal && (
        <InviteAdminModal handleClose={() => setOpenInviteAdminModal(false)} />
      )}
      {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
    </div>
  );
}

export default AdminTab;
