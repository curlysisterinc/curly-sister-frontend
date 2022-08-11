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
import { NonAuthRoutes } from "constants";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authHandler from "../../authHandler";

function AdminLayout() {
  const isLoggedIn = authHandler.getUser();

  if (!isLoggedIn) {
    return <Navigate replace to={NonAuthRoutes.login} />;
  }
  return <Outlet />;
}

export default AdminLayout;
