import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { AuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";
import useGetAllIndividuals from "hooks/data/admin/useGetAllIndividuals";
import { Loadersmall } from "components/loader-component/loader";
import searchIcon from "../../../../../assets/images/search-normal-2.svg";
import IndividualsRow from "./individualRow";
import DeleteContentModal from "./deleteContentModal";
import trashIcon from "../../../../../assets/images/trash.svg";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";

function InvidiualsTab({ active }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const [toggleActions, setToggleActions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [allIndividuals, setAllIndividuals] = useState([]);
  const [callToAction, setCallToAction] = useState(false);

  const { data, isLoading, error: err } = useGetAllIndividuals();
  const individuals = data?.data?.data;

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

  useEffect(() => {
    if (individuals) {
      setAllIndividuals(individuals.users.filter((user) => !user.is_deleted));
    }
  }, [individuals]);
  return (
    <div>
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
            <div className="min-h-screen">
              <table className="min-w-full text-left border border-gray-600 ">
                <thead className=" bg-gray-50">
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading && <Loadersmall />}
                </tbody>
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
      {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
    </div>
  );
}

export default InvidiualsTab;
