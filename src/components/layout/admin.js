import { NonAuthRoutes } from "constants";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authHandler from "../../authHandler";

function AdminLayout() {
  const isLoggedIn = authHandler.getUser();

  if (!isLoggedIn) {
    return <Navigate replace to={NonAuthRoutes.login} />;
  }
  if (
    !isLoggedIn.active.role.toLowerCase().includes("admin") &&
    window.location.href.includes("dashboard")
  ) {
    return <Navigate replace to={NonAuthRoutes.home} />;
  }
  return <Outlet />;
}

export default AdminLayout;
