import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import clsx from "clsx";
import Moment from "moment";
import { useAuthContext } from "redux/auth";
import useSuspendOrActivateAdmin from "hooks/data/admin/useSuspendOrActivateAdmin";
import useDeleteAdmin from "hooks/data/admin/useDeleteAdmin";
import useGetUserProfile from "hooks/data/admin/useGetUserProfile";
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
  profile,
}) {
  const {
    state: { _id, role: userRole },
  } = useAuthContext();
  const [currentId, setCurrentId] = useState("");
  console.log({ profile });
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

  const displayUsersName = (user) => {
    return `${user?.firstName ?? ""} ${user?.lastName ?? ""} ${
      user?._id === _id ? "(You)" : ""
    }`;
  };

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
                    {displayUsersName(ad)}
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
            {selectRole(userRole) === "Super Admin" && (
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
              </td>
            )}
          </tr>
        );
      })}
    </>
  );
}

export default AdminRow;
