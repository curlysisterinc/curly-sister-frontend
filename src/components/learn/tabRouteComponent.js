/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { NonAuthRoutes } from "../../constants";

function TabRouteComponent({ active }) {
  const navigate = useNavigate();
  return (
    <div className="flex mx-auto items-center space-x-6 justify-center">
      <div
        onClick={() => navigate(NonAuthRoutes.learn)}
        className={clsx(
          active === "learn"
            ? "border-purple-100 text-purple-100"
            : "text-gray-300",
          "pb-1  text-sm cursor-pointer"
        )}
      >
        All
      </div>
      <div
        onClick={() => navigate(NonAuthRoutes.videos)}
        className={clsx(
          active === "videos"
            ? "border-purple-100 text-purple-100"
            : "text-gray-300",
          "pb-1  text-sm cursor-pointer"
        )}
      >
        Videos
      </div>
      <div
        onClick={() => navigate(NonAuthRoutes.articles)}
        className={clsx(
          active === "articles"
            ? "border-purple-100 text-purple-100"
            : "text-gray-300",
          "pb-1  text-sm cursor-pointer"
        )}
      >
        Articles
      </div>
      <div
        onClick={() => navigate(NonAuthRoutes.communities)}
        className={clsx(
          active === "communities"
            ? "border-purple-100 text-purple-100"
            : "text-gray-300",
          "pb-1  text-sm cursor-pointer"
        )}
      >
        Community
      </div>
    </div>
  );
}

export default TabRouteComponent;
