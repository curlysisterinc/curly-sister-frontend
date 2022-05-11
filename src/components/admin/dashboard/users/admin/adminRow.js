/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { AuthRoutes } from "../../../../../constants";
import grayIndicator from "../../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../../assets/images/green-indicator.svg";
import kebabIcon from "../../../../../assets/images/kebab.svg";
import trashIcon from "../../../../../assets/images/trash.svg";
import activateIcon from "../../../../../assets/images/activate.svg";

function AdminRow({ stylistsList, setStylistsList, query }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();
  // const [openDropdown, setOpenDropdown] = useState(false);
  const onItemCheck = (e, data) => {
    const { checked } = e.target;
    setStylistsList(
      stylistsList.map((user) => {
        if (user.id === data.id) {
          user.selected = checked;
        }
        return user;
      })
    );
  };

  const toggleDropdownStyle = (index) => {
    const mylist = [...stylistsList];
    if (mylist[index].id === activeDropdown) {
      return "block";
    } else return "hidden";
  };

  const handleDropdownOpen = (index) => {
    const newList = [...stylistsList];
    setActiveDropdown(newList[index].id);

    if (newList[index].id === activeDropdown) {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      {stylistsList.map((stylist, index) => {
        return (
          <tr key={stylist.id} className="bg-white border-b border-gray-600">
            <th scope="row">
              <input
                type="checkbox"
                checked={stylist.selected}
                className="ml-3"
                id={stylist.id}
                onChange={(e) => onItemCheck(e, stylist)}
              />
            </th>
            <td
              className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer"
              onClick={() => navigate(AuthRoutes.addStylist)}
            >
              <img
                className="h-10 w-10"
                src={stylist.avatar}
                alt="profile pix"
              />
              <div className="ml-2">
                <p className="text-sm text-gray-400 mb-1">{stylist.name}</p>
                <p className="text-xs text-gray-200 ">{stylist.email}</p>
              </div>
            </td>
            <td className="text-sm text-gray-400 capitalize  px-6 py-4 whitespace-nowrap">
              {stylist.role}
            </td>
            <td className="text-sm text-gray-400 capitalize  px-6 py-4 whitespace-nowrap">
              <div
                className={clsx(
                  stylist.date === "Pending invite"
                    ? "border border-gray-100 bg-gray-50 rounded-full flex px-2 justify-center items-center py-2"
                    : "border-0 py-4 px-6",
                  "text-sm text-gray-400     whitespace-nowrap"
                )}
              >
                {stylist.date}
              </div>
            </td>
            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
              {stylist.status === "active" ? (
                <img src={greenIndicator} alt="" />
              ) : (
                <img src={grayIndicator} alt="" />
              )}
            </td>
            <td className="px-2 py-y relative cursor-pointer ">
              <div
                className="hover:bg-gray-50 rounded-full h-8 w-8 flex justify-center items-center"
                onClick={() => handleDropdownOpen(index)}
              >
                <img src={kebabIcon} alt="kebab icon" />
              </div>

              <div
                className={clsx(
                  toggleDropdownStyle(index),
                  "absolute bg-white rounded-lg shadow-lg w-40 right-10 overflow-hidden text-sm text-gray-400"
                )}
              >
                {stylist.status === "active" ? (
                  <>
                    <div className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 ">
                      <img className="mr-3" src={activateIcon} alt="key icon" />
                      Deactivate
                    </div>
                    <div className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500">
                      <img className="mr-3" src={trashIcon} alt="key icon" />
                      Delete
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2">
                      <img className="mr-3" src={activateIcon} alt="key icon" />
                      Activate
                    </div>
                    <div className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500">
                      <img className="mr-3" src={trashIcon} alt="key icon" />
                      Delete
                    </div>
                  </>
                )}
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default AdminRow;
