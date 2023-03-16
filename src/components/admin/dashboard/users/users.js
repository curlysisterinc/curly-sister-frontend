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
import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthRoutes } from "constants";

function UsersTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === AuthRoutes.users) {
      navigate(AuthRoutes.stylists);
    }
  }, [pathname]);

  const userNavlinks = [
    {
      title: "Stylists",
      path: AuthRoutes.stylists,
    },
    {
      title: "Admins",
      path: AuthRoutes.admin,
    },
    {
      title: "Individuals",
      path: AuthRoutes.individual,
    },
  ];

  return (
    <>
      <div className="flex w-1/2 mx-auto justify-center">
        {userNavlinks.map((link) => (
          <NavLink
            key={link.title}
            className={({ isActive }) =>
              isActive
                ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mx-3"
                : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mx-3"
            }
            to={link.path}
          >
            {link.title}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default UsersTab;
