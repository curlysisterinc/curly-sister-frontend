import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import clsx from "clsx";
import Moment from "moment";
import { useAuthContext } from "redux/auth";
import useSuspendOrActivateAdmin from "hooks/data/admin/useSuspendOrActivateAdmin";
import useDeleteAdmin from "hooks/data/admin/useDeleteAdmin";
import { AuthRoutes } from "../../../../../constants";
import grayIndicator from "../../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../../assets/images/green-indicator.svg";
import allynAvatar from "../../../../../assets/images/allyn.png";
import admin from "../../../../../api/admin";
import AdminDropDown from "../../../../customdropdown/dashboard/admin/adminitm";

const Role = Object.freeze({
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  USER: "User",
});

function AdminRow({
  getAdmin,
  setGetAdmin,
  setCallToAction,
  selectedId,
  setSelectedId,
}) {
  const {
    state: { _id },
  } = useAuthContext();

  const [currentId, setCurrentId] = useState("");

  const {
    isLoading: suspendOrActivateLoading,
    data,
    mutate: suspendOrActivateAdmin,
  } = useSuspendOrActivateAdmin();
  const {
    isLoading: deleteAdminLoading,
    data: deleteAdminData,
    mutate: deleteAdmin,
  } = useDeleteAdmin();

  const isLoading = deleteAdminLoading || suspendOrActivateLoading;

  const [adminValue, setAdminValue] = useState({
    status: false,
    adminId: "",
  });

  useEffect(() => {
    if (getAdmin) {
      const getAdminId = getAdmin.map((ad) => ad._id);
      setAdminValue({ ...adminValue, adminId: getAdminId });
    }
  }, [getAdmin]);

  const handleCheck = (e, id) => {
    setCurrentId(id);
    if (e.target.checked) {
      setSelectedId((prev) => [...prev, id]);
      setCallToAction(true);
    } else {
      setSelectedId((prev) => prev.filter((item) => item !== id));
      setCallToAction(false);
    }
  };

  const handleDeactivateAdmin = (id) => {
    setCurrentId(id);
    suspendOrActivateAdmin({ adminId: id, status: "false" });
  };
  const handleActivateAdmin = (id) => {
    setCurrentId(id);
    suspendOrActivateAdmin({ adminId: id, status: "true" });
  };

  const handleDeleteAdmin = (id) => {
    setCurrentId(id);
    deleteAdmin({ userId: id });
  };

  const selectRole = useCallback((role) => Role[role], []);

  return (
    <>
      {getAdmin.map((ad) => {
        return (
          <tr key={ad._id} className="bg-white border-b border-gray-600">
            <th scope="row">
              <input
                type="checkbox"
                className="ml-3"
                id={ad._id}
                checked={selectedId.includes(ad._id)}
                onChange={(e) => handleCheck(e, ad._id)}
              />
            </th>
            <td className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer">
              <div className="flex">
                <img
                  className="h-10 w-10"
                  src={allynAvatar}
                  alt="profile pix"
                />
                <div className="ml-2">
                  <p className="text-sm text-gray-400 mb-1">
                    {ad.firstName}
                    {ad.lastName}
                  </p>
                  <p className="text-xs text-gray-200 ">{ad.email}</p>
                </div>
              </div>
            </td>
            <td className="text-left text-sm text-gray-400 capitalize  py-4 whitespace-nowrap">
              {selectRole(ad.role)}
            </td>
            <td className="text-sm text-gray-400 capitalize  py-4 whitespace-nowrap">
              <div
                className={clsx(
                  ad.date === "Pending invite"
                    ? "border border-gray-100 bg-gray-50 rounded-full flex px-2 justify-center items-center py-2"
                    : "border-0 py-4 px-6",
                  "text-sm text-gray-400     whitespace-nowrap"
                )}
              >
                {Moment(ad.createdAt).format("DD MMM  YYYY")}
              </div>
            </td>
            <td className="text-left text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
              {ad.active === true ? (
                <img src={greenIndicator} alt="" />
              ) : (
                <img src={grayIndicator} alt="" />
              )}
            </td>
            <td className="px-2 py-y relative cursor-pointer ">
              {ad._id !== _id && (
                <AdminDropDown
                  status={ad.active}
                  activateAction={() =>
                    ad.active
                      ? handleDeactivateAdmin(ad._id)
                      : handleActivateAdmin(ad._id)
                  }
                  deteleAction={() => handleDeleteAdmin(ad._id)}
                  mkStylistAction={() => null}
                  mkadminAction={() => null}
                  isLoading={ad._id === currentId && isLoading}
                  currentId={currentId}
                />
              )}
              {console.log({ ad_id: ad._id, _id })}
              {/* {ad.active === true && ad._id !== _id ? (
                <AdminDropDown
                  status={ad.active}
                  activateAction={() => handleDeactivateAdmin(ad._id)}
                  deteleAction={() => handleDeleteAdmin(ad._id)}
                  mkStylistAction={() => null}
                  mkadminAction={() => null}
                />
              ) : (
                <AdminDropDown
                  status={ad.active}
                  activateAction={() => handleActivateAdmin(ad._id)}
                  deteleAction={() => handleDeleteAdmin(ad._id)}
                  mkStylistAction={() => null}
                  mkadminAction={() => null}
                />
              )} */}
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default AdminRow;
