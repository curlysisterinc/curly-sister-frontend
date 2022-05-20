/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { NonAuthRoutes } from "../../constants";
import SideBarComponent from "../sidebar/sidebar";
import AllTab from "./allTab";

function IsLoggedInLearnComponent({ activeTab }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
        <SideBarComponent active="learn" />
        <div className="ml-80 bg-white px-10 pt-14 w-full">
          <div>
            <div className="flex mx-auto items-center space-x-6 justify-center">
              <div
                onClick={() => navigate(NonAuthRoutes.learn)}
                className={clsx(
                  activeTab === "all"
                    ? "border-b-4 border-purple-100 text-purple-100"
                    : "text-gray-300",
                  "pb-1  text-sm cursor-pointer"
                )}
              >
                All
              </div>
              <div
                onClick={() => navigate(NonAuthRoutes.videos)}
                className={clsx(
                  activeTab === "videos"
                    ? "border-b-4 border-purple-100 text-purple-100"
                    : "text-gray-300",
                  "pb-1  text-sm cursor-pointer"
                )}
              >
                Videos
              </div>
              <div
                onClick={() => navigate(NonAuthRoutes.articles)}
                className={clsx(
                  activeTab === "articles"
                    ? "border-b-4 border-purple-100 text-purple-100"
                    : "text-gray-300",
                  "pb-1  text-sm cursor-pointer"
                )}
              >
                Articles
              </div>
              <div
                onClick={() => navigate(NonAuthRoutes.communities)}
                className={clsx(
                  activeTab === "communities"
                    ? "border-b-4 border-purple-100 text-purple-100"
                    : "text-gray-300",
                  "pb-1  text-sm cursor-pointer"
                )}
              >
                Community
              </div>
            </div>
          </div>
          <AllTab />
          {/* {activeTab === "videos" && <VideoTab />}
          {activeTab === "articles" && <ArticleTab />}
          {activeTab === "communities" && <CommunityTab />} */}
        </div>
      </div>
    </div>
  );
}

export default IsLoggedInLearnComponent;
