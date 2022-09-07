import React, { useState, useEffect } from "react";
import admin from "api/admin";
import { useQuery } from "@tanstack/react-query";
import useGetAllStylists from "hooks/data/admin/useGetAllStylists";
import Loader, { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { useInView } from "react-intersection-observer";
import { queryClient } from "App";
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

  const {
    data: stylistData,
    isLoading,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetAllStylists();

  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  React.useEffect(() => {
    if (stylistData) {
      const data = queryClient.getQueryData(["stylists"]);
      const currentData = data.pages
        .map((item) => item.data.stylist)
        .flatMap((a) => a);

      setStylists(currentData);
    }
  }, [stylistData]);

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
  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
          Stylists
          <span className="text-gray-300 ml-2 text-sm">{stylists?.length}</span>
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
                className={`${
                  (toggleActions && "transform rotate-180", "ml-6")
                })`}
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
                {/* stylist type */}
                <TypesContent
                  typeValue={typeValue}
                  setTypeValue={setTypeValue}
                />
                <div className="mr-2 w-140 border border-gray-800  rounded-full px-3 h-10 flex justify-center items-center">
                  More filters
                </div>
                <div className="mr-2 relative text-gray-600 focus-within:text-gray-400">
                  <span className="absolute inset-y-0 right-2 flex items-center pl-2">
                    <button
                      type="submit"
                      className="p-1 focus:outline-none focus:shadow-outline"
                    >
                      <img src={searchIcon} alt="" />
                    </button>
                  </span>
                  <input
                    type="text"
                    value={query}
                    name="query"
                    onChange={(e) => setQuery(e.target.value)}
                    className="py-2 w-140 text-sm text-gray-400 bg-white rounded-full pl-3 focus:outline-none focus:bg-white focus:text-gray-400"
                    placeholder="Search..."
                    autoComplete="off"
                  />
                </div>
                <NewStylist />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* table */}
      {stylistData && (
        <div className="flex flex-col mt-4">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left border border-gray-600 ">
                  <thead className=" bg-gray-50">
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

                  <tbody className="">
                    <StylistRow
                      query={query}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                      setCallToAction={setCallToAction}
                      stylistsList={stylists}
                      // setGetStylist={setGetStylist}
                    />
                  </tbody>
                </table>
                <div className="my-10" />
                {hasNextPage && (
                  <div className="loading" ref={ref}>
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
          {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
        </div>
      )}
      {isLoading && <Loadersmall />}
      {error && <ErrorDisplayComponent refetch={refetch} />}
    </div>
  );
}

export default StylistTab;
