/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { AuthRoutes } from "../../../../constants";
import grayIndicator from "../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../assets/images/green-indicator.svg";
import kebabIcon from "../../../../assets/images/kebab.svg";
import trashIcon from "../../../../assets/images/trash.svg";
import activateIcon from "../../../../assets/images/activate.svg";

function UserRow({ list, setList }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();
  // const [openDropdown, setOpenDropdown] = useState(false);
  const onItemCheck = (e, data) => {
    const { checked } = e.target;
    setList(
      list.map((user) => {
        if (user.id === data.id) {
          user.selected = checked;
        }
        return user;
      })
    );
  };

  const handleToggle = (index) => {
    const mylist = [...list];
    if (mylist[index].selected === true) {
      return <div className="text-purple-100">checked option</div>;
    }
    return null;
  };

  const toggleDropdownStyle = (index) => {
    const mylist = [...list];
    if (mylist[index].id === activeDropdown) {
      return "block";
    } else return "hidden";
  };

  const handleDropdownOpen = (index) => {
    const newList = [...list];
    setActiveDropdown(newList[index].id);

    if (newList[index].id === activeDropdown) {
      setActiveDropdown(null);
    }
  };

  return list.map((user, index) => (
    <tr key={user.id} className="bg-white border-b border-gray-600">
      <th scope="row">
        <input
          type="checkbox"
          checked={user.selected}
          className="ml-3"
          id={user.id}
          onChange={(e) => onItemCheck(e, user)}
        />
      </th>
      <td
        className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer"
        onClick={() => navigate(AuthRoutes.addStylist)}
      >
        <img className="h-10 w-10" src={user.avatar} alt="profile pix" />
        <div className="ml-2">
          <p className="text-sm text-gray-400 mb-1">{user.name}</p>
          <p className="text-xs text-gray-200 ">{user.email}</p>
        </div>
        {handleToggle(index)}
      </td>
      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
        {user.type}
      </td>
      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
        {user.location}
      </td>
      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
        {user.status === "active" ? (
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
          {user.status === "active" ? (
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
  ));
}

export default UserRow;
