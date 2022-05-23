/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import clsx from "clsx";
import searchIcon from "../../../../../assets/images/search-normal-2.svg";
import IndividualsRow from "./individualRow";
import { individualsData } from "../data";
import DeleteContentModal from "./deleteContentModal";
import trashIcon from "../../../../../assets/images/trash.svg";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";

function InvidiualsTab() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(individualsData);
  const [masterChecked, setMasterChecked] = useState(false);
  const [checkItem, setCheckItem] = useState([]);
  const [toggleActions, setToggleActions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const onMasterCheck = (e) => {
    const tempList = list;
    tempList.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked);
    setList(tempList);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
          Stylists
          <span className="text-gray-300 ml-2 text-sm">11,439</span>
        </div>
        <div className="">
          {/* filters */}
          {masterChecked || checkItem.length ? (
            <div
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
                  <div
                    onClick={openDeleteModal}
                    className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
                  >
                    <img className="mr-2" src={trashIcon} alt="" />
                    Delete
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="">
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* table */}
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
                        checked={masterChecked}
                        id="mastercheck"
                        onChange={(e) => onMasterCheck(e)}
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
                      scope="col"
                      className="text-sm font-medium text-gray-400 px-6 py-4"
                    />
                  </tr>
                </thead>
                <tbody className="">
                  <IndividualsRow
                    stylistsList={list}
                    query={query}
                    setList={setList}
                    checkItem={checkItem}
                    setCheckItem={setCheckItem}
                  />
                </tbody>
              </table>
              <div className="my-10" />
            </div>
          </div>
        </div>
      </div>
      {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
    </div>
  );
}

export default InvidiualsTab;
