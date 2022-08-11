/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from "react";
import AdminRow from "./adminRow";
import clsx from "clsx";
import InviteAdminModal from "./inviteAdminModal";
import { AuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";
import trashIcon from "../../../../../assets/images/trash.svg";
import admin from "../../../../../api/admin";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import DeleteContentModal from "./deleteContentModal";

function AdminTab({ active }) {
  const navigate = useNavigate();
  const [getAdmin, setGetAdmin] = useState([]);
  const [openInviteAdminModal, setOpenInviteAdminModal] = useState(false);
  const [callToAction, setCallToAction] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [toggleActions, setToggleActions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const onMasterCheck = (e) => {
    if (e.target.checked) {
      setCallToAction(true);
      setSelectedId(getAdmin.map((admin) => admin._id));
    } else {
      setCallToAction(false);
      setSelectedId([]);
    }
  };
  useEffect(() => {
    admin
      .GetAllAdmin()
      .then((response) => {
        console.log(response.data);
        setGetAdmin(response.data.data.filter((admin) => !admin.is_deleted));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
          Admins
          <span className="text-gray-300 ml-2 text-sm">{getAdmin.length}</span>
        </div>
        {callToAction ? (
          <div
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
            {/* filters */}
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

      {/* table */}
      <div className="flex flex-col mt-4">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="min-h-screen">
              <table className="min-w-full text-left border border-gray-600 ">
                <thead className="bg-gray-50">
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
                      Role
                    </th>
                    <th
                      scope="col"
                      className=" text-sm font-medium text-gray-400 px-6 py-4"
                    >
                      Date joined
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
                  <AdminRow
                    setCallToAction={setCallToAction}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    getAdmin={getAdmin}
                    setGetAdmin={setGetAdmin}
                  />
                </tbody>
              </table>
              <div className="my-10" />
            </div>
          </div>
        </div>
      </div>
      {openInviteAdminModal && (
        <InviteAdminModal handleClose={() => setOpenInviteAdminModal(false)} />
      )}
      {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
    </div>
  );
}

export default AdminTab;
