/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../sidebar";

function AppLayout() {
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border-r border-gray-50">
      <SideNav />
      <Outlet />
    </div>
  );
}

export default AppLayout;