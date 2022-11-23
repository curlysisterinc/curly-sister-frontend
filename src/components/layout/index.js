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
import FooterComponent from "components/footer";
import useVerifyUsersAccount from "hooks/useVerifyUsersAccount";
import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../sidebar";

function AppLayout() {
  const verifyUsersAccount = useVerifyUsersAccount();

  return (
    <div
      className=" w-full flex flex-col md:flex-row m-auto border-r border-gray-50"
      id="appLayout"
    >
      <SideNav />
      <div className="md:ml-60 xl:ml-80 w-full content" id="content">
        {verifyUsersAccount.display()}
        {/* <div className="max-w-screen-2xl m-auto h-full"> */}
        <Outlet />
        {/* </div> */}
        {/* <FooterComponent /> */}
      </div>
    </div>
  );
}

export default AppLayout;
