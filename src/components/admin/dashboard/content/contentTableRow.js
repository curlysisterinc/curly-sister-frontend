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
import { AuthRoutes } from "../../../../constants";
import grayIndicator from "../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../assets/images/green-indicator.svg";
import kebabIcon from "../../../../assets/images/kebab.svg";
import trashIcon from "../../../../assets/images/trash.svg";
import activateIcon from "../../../../assets/images/activate.svg";
import editIcon from "../../../../assets/images/edit.svg";
import publishIcon from "../../../../assets/images/publish.svg";

function ContentRow({
  contentsList,
  setContentsList,
  query,
  checkItem,
  setCheckItem,
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();

  const handleCheck = (event) => {
    var updatedList = [...checkItem];
    if (event.target.checked) {
      updatedList = [...checkItem, event.target.value];
    } else {
      updatedList.splice(checkItem.indexOf(event.target.value), 1);
    }
    setCheckItem(updatedList);
  };
  const toggleDropdownStyle = (index) => {
    const mylist = [...contentsList];
    if (mylist[index].id === activeDropdown) {
      return "block";
    } else return "hidden";
  };

  const handleDropdownOpen = (index) => {
    const newList = [...contentsList];
    setActiveDropdown(newList[index].id);

    if (newList[index].id === activeDropdown) {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      {contentsList
        .filter((filteredContents) => {
          if (query === "") {
            return filteredContents;
          } else if (
            filteredContents.name.toLowerCase().includes(query.toLowerCase())
          ) {
            return filteredContents;
          }
        })
        .map((content, index) => {
          return (
            <tr key={content.id} className="bg-white border-b border-gray-600">
              <th scope="row">
                <input
                  type="checkbox"
                  value={content.name}
                  className="ml-3"
                  id={content.id}
                  onChange={handleCheck}
                />
              </th>
              <td
                className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer"
                onClick={() => navigate(AuthRoutes.addcontent)}
              >
                <img className="" src={content.avatar} alt="profile pix" />
                <div className="ml-2">
                  <p className="text-sm text-gray-400 mb-1">{content.name}</p>
                  <p className="text-xs text-gray-200 ">{content.about}</p>
                </div>
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.type}
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.date}
              </td>{" "}
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.views}
              </td>{" "}
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.likes}
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.saves}
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.status === "published" ? (
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
                  {content.status === "published" ? (
                    <>
                      <div
                        className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
                        onClick={() => navigate(AuthRoutes.addArticle)}
                      >
                        <img className="mr-3" src={editIcon} alt="" />
                        Edit
                      </div>
                      <div className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 ">
                        <img
                          className="mr-3"
                          src={publishIcon}
                          alt="key icon"
                        />
                        Unpublish
                      </div>
                      <div className="flex items-center hover:bg-gray-600 pl-3 py-2 text-red-500">
                        <img className="mr-3" src={trashIcon} alt="key icon" />
                        Delete
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 "
                        onClick={() => navigate(AuthRoutes.addArticle)}
                      >
                        <img className="mr-3" src={editIcon} alt="" />
                        Edit
                      </div>
                      <div className="flex items-center mb-3 hover:bg-gray-600 pl-3 py-2 ">
                        <img
                          className="mr-3"
                          src={publishIcon}
                          alt="key icon"
                        />
                        Publish
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

export default ContentRow;
