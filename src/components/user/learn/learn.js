/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";
import { NonAuthRoutes } from "../../../constants";

function LearnComponent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === NonAuthRoutes.learn) {
      navigate(NonAuthRoutes.learnAll);
    }
  }, [pathname]);

  const leanNavlinks = [
    {
      title: "All",
      path: NonAuthRoutes.learnAll,
    },
    {
      title: "Videos",
      path: NonAuthRoutes.videos,
    },
    {
      title: "Articles",
      path: NonAuthRoutes.articles,
    },
    {
      title: "Community",
      path: NonAuthRoutes.communities,
    },
  ];

  return (
    <div className="bg-white px-10 pt-8 w-full">
      <div>
        <div className="flex mx-auto items-center space-x-6 justify-center">
          {leanNavlinks.map((link) => (
            <NavLink
              key={link.title}
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-purple-100 text-purple-100 pb-1  text-sm cursor-pointer"
                  : "text-gray-300 pb-1  text-sm cursor-pointer"
              }
              to={link.path}
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default LearnComponent;
