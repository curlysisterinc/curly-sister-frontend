/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../constants";
import SideBarComponent from "../sidebar/sidebar";
import AllTab from "./allTab";
import authHandler from "../../authHandler";
import VideoTab from "./videoTab";
import ArticleTab from "./articleTab";
import CommunityTab from "./communityTab";

function LearnComponent({ activeTab }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userDetails = authHandler.getUser("users");

  // useEffect(() => {
  //   if (userDetails) {
  //     setIsLoggedIn(true);
  //     console.log(userDetails);
  //   }
  // }, [userDetails, isLoggedIn]);
  // const [activeTab, setActiveTab] = useState("all");

  return (
    <div>
      <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
        <SideBarComponent active="learn" isLoggedIn />

        <div className="ml-80 bg-white px-10 pt-14 w-full">
          <div>
            <div className="flex mx-auto items-center space-x-6 justify-center">
              <div
                onClick={() => navigate(AuthRoutes.learn)}
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
                onClick={() => navigate(AuthRoutes.videos)}
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
                onClick={() => navigate(AuthRoutes.articles)}
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
                onClick={() => navigate(AuthRoutes.communities)}
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

export default LearnComponent;
