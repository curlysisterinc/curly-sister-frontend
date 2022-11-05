/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-var */
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
import rightArrow from "../../../../../assets/images/right-arrow.svg";
import * as dayjs from "dayjs";
import spencerAvatar from "../../../../../assets/images/product-recommendation.png";
import admin from "../../../../../api/admin";
import IndividualDropDown from "./individualDropDown";

function IndividualsRow({
  individualList,
  setCallToAction,
  selectedId,
  setSelectedId,
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();

  const handleCheck = (e, id) => {
    if (e.target.checked) {
      setCallToAction(true);
      setSelectedId((prev) => [...prev, id]);
    } else {
      setCallToAction(false);
      setSelectedId((prev) => prev.filter((item) => item !== id));
    }
  };

  const toggleDropdownStyle = (index) => {
    const mylist = [...individualList];
    if (mylist[index]._id === activeDropdown) {
      return "block";
    } else return "hidden";
  };

  const handleDropdownOpen = (index) => {
    const newList = [...individualList];
    setActiveDropdown(newList[index]._id);

    if (newList[index]._id === activeDropdown) {
      setActiveDropdown(null);
    }
  };
  const handleDeleteUser = (id) => {
    const data = {
      userId: id,
    };
    admin
      .DeleteIndividual(data)
      .then((response) => {
        console.log(response.data, "delete user");
      })
      .catch((error) => {
        console.log(error, "error delete user");
      });
  };
  const handleDeactivateUser = (id) => {
    admin.SuspendOrActivateUser({ status: "false", userId: id });
  };

  const displayUsersName = (user) => {
    return `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
  };
  return (
    <>
      {individualList.map((individual, index) => {
        return (
          <tr
            key={individual._id}
            className="bg-white border-b border-gray-600"
          >
            <th scope="row">
              <input
                type="checkbox"
                value={individual._id}
                id={individual._id}
                checked={selectedId.includes(individual._id)}
                className="ml-3"
                onChange={(e) => handleCheck(e, individual._id)}
              />
            </th>
            <td
              className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer"
              onClick={() => navigate(AuthRoutes.addindividual)}
            >
              <img
                className="h-10 w-10"
                src={spencerAvatar}
                alt="profile pix"
              />
              <div className="ml-2">
                <p className="text-sm text-gray-400 mb-1">
                  {displayUsersName(individual)}
                </p>
                <p className="text-xs text-gray-200 ">{individual.email}</p>
              </div>
            </td>
            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
              {dayjs(individual.createdAt).format("DD MMM YYYY")}
            </td>
            <td
              onClick={() => navigate(AuthRoutes.bookings)}
              className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap cursor-pointer"
            >
              <div className="flex items-center ">
                {individual.bookings}
                <img className="ml-2 h-3" src={rightArrow} alt="" />
              </div>
            </td>
            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
              {individual.status === "active" ? (
                <img src={greenIndicator} alt="" />
              ) : (
                <img src={grayIndicator} alt="" />
              )}
            </td>
            <td className="px-2 py-y relative cursor-pointer ">
              <IndividualDropDown
                status={individual.active}
                deteleAction={() => null}
                publishAction={() => null}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default IndividualsRow;
