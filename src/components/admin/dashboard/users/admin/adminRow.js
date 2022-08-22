import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import clsx from "clsx";
import Moment from "moment";
import { AuthRoutes } from "../../../../../constants";
import grayIndicator from "../../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../../assets/images/green-indicator.svg";
import allynAvatar from "../../../../../assets/images/allyn.png";
import admin from "../../../../../api/admin";
import AdminDropDown from "../../../../customdropdown/dashboard/admin/adminitm";

function AdminRow({
  getAdmin,
  setGetAdmin,
  setCallToAction,
  selectedId,
  setSelectedId,
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [adminValue, setAdminValue] = useState({
    status: false,
    adminId: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (getAdmin) {
      const getAdminId = getAdmin.map((ad) => ad._id);
      setAdminValue({ ...adminValue, adminId: getAdminId });
    }
  }, [getAdmin]);
  // const [openDropdown, setOpenDropdown] = useState(false);
  const handleCheck = (e, id) => {
    if (e.target.checked) {
      setSelectedId((prev) => [...prev, id]);
      setCallToAction(true);
    } else {
      setSelectedId((prev) => prev.filter((item) => item !== id));
      setCallToAction(false);
    }
  };

  const handleDeactivateAdmin = (id) => {
    admin
      .SuspendOrActivateAdmin({ adminId: id, status: "false" })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleActivateAdmin = (id) => {
    admin
      .SuspendOrActivateAdmin({ adminId: id, status: "true" })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteAdmin = (id) => {
    // const name = e.target.getAttribute("name");
    admin
      .DeleteAdmin({ userId: id })
      .then((response) => {
        setGetAdmin(getAdmin.filter((ad) => ad._id !== id));
      })
      .catch((error) => {
        console.log(error, "error delete admin");
      });
  };
  return (
    <>
      {getAdmin.map((ad) => {
        return (
          <tr key={admin._id} className="bg-white border-b border-gray-600">
            <th scope="row">
              <input
                type="checkbox"
                className="ml-3"
                id={admin._id}
                checked={selectedId.includes(admin._id)}
                onChange={(e) => handleCheck(e, admin._id)}
              />
            </th>
            <td className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer">
              <Link to={AuthRoutes.addadmin}>
                <img
                  className="h-10 w-10"
                  src={allynAvatar}
                  alt="profile pix"
                />
                <div className="ml-2">
                  <p className="text-sm text-gray-400 mb-1">
                    {admin.firstName}
                    {admin.lastName}
                  </p>
                  <p className="text-xs text-gray-200 ">{admin.email}</p>
                </div>
              </Link>
            </td>
            <td className="text-left text-sm text-gray-400 capitalize  py-4 whitespace-nowrap">
              {admin.role}
            </td>
            <td className="text-sm text-gray-400 capitalize  py-4 whitespace-nowrap">
              <div
                className={clsx(
                  admin.date === "Pending invite"
                    ? "border border-gray-100 bg-gray-50 rounded-full flex px-2 justify-center items-center py-2"
                    : "border-0 py-4 px-6",
                  "text-sm text-gray-400     whitespace-nowrap"
                )}
              >
                {Moment(admin.createdAt).format("MMM Do YY")}
              </div>
            </td>
            <td className="text-left text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
              {admin.active === true ? (
                <img src={greenIndicator} alt="" />
              ) : (
                <img src={grayIndicator} alt="" />
              )}
            </td>
            <td className="px-2 py-y relative cursor-pointer ">
              {admin.active === true ? (
                <AdminDropDown
                  status={admin.active}
                  activateAction={handleDeactivateAdmin(admin._id)}
                  deteleAction={handleDeleteAdmin(admin._id)}
                  mkStylistAction={() => null}
                  mkadminAction={() => null}
                />
              ) : (
                <AdminDropDown
                  status={admin.active}
                  activateAction={handleActivateAdmin(admin._id)}
                  deteleAction={handleDeleteAdmin(admin._id)}
                  mkStylistAction={() => null}
                  mkadminAction={() => null}
                />
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default AdminRow;
