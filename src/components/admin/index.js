/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { AuthRoutes } from "constants";
import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

function AdminDashbaord() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === AuthRoutes.dashboard) {
      navigate(AuthRoutes.dashboardOverview);
    }
  }, [pathname]);

  const dashboardNavlink = [
    {
      title: "Overview",
      path: AuthRoutes.dashboardOverview,
    },
    {
      title: "Users",
      path: AuthRoutes.users,
    },
    {
      title: "Content",
      path: AuthRoutes.content,
    },
    {
      title: "Data",
      path: AuthRoutes.data,
    },
  ];

  return (
    <div className="ml-80 bg-white px-10 py-14 w-full">
      <div className="flex justify-center items-center w-1/2 mx-auto mb-6">
        {dashboardNavlink.map((link) => (
          <NavLink
            key={link.title}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-2 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer"
            }
            to={link.path}
          >
            {link.title}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default AdminDashbaord;
