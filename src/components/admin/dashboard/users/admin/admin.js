/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import AdminRow from "./adminRow";
import { adminData } from "../data";
import InviteAdminModal from "./inviteAdminModal";

function AdminTab() {
  const [stylistsList, setStylistsList] = useState(adminData);
  const [masterChecked, setMasterChecked] = useState(false);
  const [openInviteAdminModal, setOpenInviteAdminModal] = useState(false);
  const onMasterCheck = (e) => {
    const tempList = adminData;
    tempList.map((admin) => (admin.selected = e.target.checked));
    setMasterChecked(e.target.checked);
    setStylistsList(tempList);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
          Admins
          <span className="text-gray-300 ml-2 text-sm">{adminData.length}</span>
        </div>
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
                      Role
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
                    stylistsList={stylistsList}
                    setStylistsList={setStylistsList}
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
    </div>
  );
}

export default AdminTab;
