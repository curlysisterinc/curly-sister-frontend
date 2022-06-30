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
import moment from "moment";
import spencerAvatar from "../../../../../assets/images/spencer.svg";
import admin from "../../../../../api/admin";

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
    console.log(data, "payload user");
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

  // .filter((filteredindividual) => {
  //   if (query === "") {
  //     return filteredindividual;
  //   } else if (
  //     filteredindividual.name.toLowerCase().includes(query.toLowerCase())
  //   ) {
  //     return filteredindividual;
  //   }
  // })
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
                <p className="text-sm text-gray-400 mb-1">Adun Tope</p>
                <p className="text-xs text-gray-200 ">{individual.email}</p>
              </div>
            </td>
            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
              {moment(individual.createdAt).format("DD MM YYYY")}
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
                {individual.status === "active" ? (
                  <>
                    <div
                      onClick={() => handleDeactivateUser(individual._id)}
                      className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
                    >
                      <img className="mr-3" src={activateIcon} alt="key icon" />
                      Deactivate
                    </div>
                    <div
                      onClick={() => handleDeleteUser(individual._id)}
                      className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500"
                    >
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
                    <div
                      onClick={() => handleDeleteUser(individual._id)}
                      className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500"
                    >
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

export default IndividualsRow;
