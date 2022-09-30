import { NonAuthRoutes } from "constants";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import authHandler from "../../authHandler";

function AdminLayout() {
  const {
    state: { isSignedIn, role },
  } = useAuthContext();

  if (!isSignedIn) {
    return <Navigate replace to={NonAuthRoutes.login} />;
  }
  if (
    !role.toLowerCase().includes("admin") &&
    window.location.href.includes("dashboard")
  ) {
    return <Navigate replace to={NonAuthRoutes.home} />;
  }
  return <Outlet />;
}

export default AdminLayout;
