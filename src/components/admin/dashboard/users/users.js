/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable-next-line jsx-a11y/control-has-associated-label */
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stylistTypes, users } from "./data";
import StylistTab from "./stylists/stylists";
import SideBarComponent from "../../../sidebar/sidebar";
import { AuthRoutes } from "constants";

function UsersTab({ active }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        {/* tabs */}
        <div className="flex justify-center items-center w-1/2 mx-auto mb-6">
          <div
            onClick={() => navigate(AuthRoutes.dashboard)}
            className={
              active === "overview"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer "
            }
          >
            Overview
          </div>
          <div
            onClick={() => navigate(AuthRoutes.users)}
            className="text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
          >
            Users
          </div>{" "}
          <div
            onClick={() => navigate(AuthRoutes.content)}
            className={
              active === "content"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer"
            }
          >
            Content
          </div>
          <div
            onClick={() => navigate(AuthRoutes.data)}
            className={
              active === "data"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5  cursor-pointer"
            }
          >
            Data
          </div>
        </div>
        <div className="flex w-1/2 mx-auto justify-center mb-5">
          <button
            type="button"
            onClick={() => navigate(AuthRoutes.stylists)}
            className="border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mr-3"
          >
            Stylists
          </button>
          <button
            type="button"
            onClick={() => navigate(AuthRoutes.admin)}
            className={
              active === "admins"
                ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mx-3"
                : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mx-3"
            }
          >
            Admins
          </button>{" "}
          <button
            type="button"
            onClick={() => navigate(AuthRoutes.individual)}
            className={
              active === "individuals"
                ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mx-3"
                : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mx-3"
            }
          >
            Individuals
          </button>
        </div>
        <StylistTab />
      </div>
    </div>
  );
}

export default UsersTab;
