/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "components/image";
import StylistDropDown from "../../../../customdropdown/dashboard/stylist/stylistitm";
import { AuthRoutes } from "../../../../../constants";
import grayIndicator from "../../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../../assets/images/green-indicator.svg";
import Avatar from "../../../../../assets/images/product-recommendation.png";

function StylistRow({
  stylistsList,
  query,
  selectedId,
  setSelectedId,
  setCallToAction,
}) {
  const navigate = useNavigate();
  const onCheck = (e, id) => {
    if (e.target.checked) {
      setCallToAction(true);
      setSelectedId((prev) => [...prev, id]);
    } else {
      setCallToAction(false);
      setSelectedId((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    // eslint-disable-next-line
    <>
      {stylistsList.map((stylist, index) => {
        return (
          <tr
            key={stylist._id}
            className="bg-white border-b border-gray-600 cursor-pointer "
            onClick={() => {
              navigate(`/dashboard/users/edit-stylist/${stylist._id}`);
            }}
          >
            <th scope="row">
              <input
                type="checkbox"
                checked={selectedId.includes(stylist._id)}
                className="ml-3"
                id={stylist._id}
                onChange={(e) => onCheck(e, stylist._id)}
              />
            </th>
            <td className="px-6 py-4 whitespace-nowrap flex items-center ">
              <div className="w-12">
                <Image
                  src={stylist.photo ? stylist.photo : Avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
              <div className="ml-2">
                <p className="text-sm text-gray-400 mb-1">
                  {stylist.business_name}
                </p>
                <p className="text-xs text-gray-200 ">{stylist.email}</p>
              </div>
            </td>

            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap first-letter:uppercase">
              {stylist?.category_type ||
                (stylist?.services.length
                  ? "curly sister stylist"
                  : "walk-in only (default)")}
            </td>
            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
              {stylist?.location || stylist?.country}
            </td>
            <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
              {stylist.active === true ? (
                <img src={greenIndicator} alt="" />
              ) : (
                <img src={grayIndicator} alt="" />
              )}
            </td>
            <td className="px-2 py-y relative cursor-pointer ">
              <StylistDropDown
                status={stylist.active}
                // deteleAction={() => null}
                publishAction={() => null}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default StylistRow;
