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
import { AdminTable } from "./adminTableHeader";
import useGetAllAdmins from "hooks/data/admin/useGetAllAdmins";

function AdminTab({ active }) {
  const navigate = useNavigate();
  const [getAdmin, setGetAdmin] = useState([]);
  const [openInviteAdminModal, setOpenInviteAdminModal] = useState(false);
  const [callToAction, setCallToAction] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [toggleActions, setToggleActions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, loading, error } = useGetAllAdmins();
  const admins = data?.data?.data;

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
    if (admins) {
      setGetAdmin(admins.filter((admin) => !admin.is_deleted));
    }
  }, [admins]);

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
      <AdminTable>
        <AdminRow
          setCallToAction={setCallToAction}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          getAdmin={getAdmin}
          setGetAdmin={setGetAdmin}
        />
      </AdminTable>
      {openInviteAdminModal && (
        <InviteAdminModal handleClose={() => setOpenInviteAdminModal(false)} />
      )}
      {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
    </div>
  );
}

export default AdminTab;
