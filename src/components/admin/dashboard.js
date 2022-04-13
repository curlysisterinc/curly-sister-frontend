/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import SideBarComponent from "../sidebar/sidebar";
// eslint-disable-next-line import/no-cycle
import UsersTab from "./dashboard/users/users";

function AdminDashbaord() {
  const [openTab, setOpenTab] = useState("overview");
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        {/* tabs */}
        <div className="flex justify-center items-center w-1/2 mx-auto mb-6">
          <div
            onClick={() => setOpenTab("overview")}
            className={
              openTab === "overview"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer "
            }
          >
            Overview
          </div>
          <div
            onClick={() => setOpenTab("users")}
            className={
              openTab === "users"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer"
            }
          >
            Users
          </div>{" "}
          <div
            onClick={() => setOpenTab("content")}
            className={
              openTab === "content"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5 cursor-pointer"
            }
          >
            Content
          </div>
          <div
            onClick={() => setOpenTab("data")}
            className={
              openTab === "data"
                ? "text-sm font-BeatriceRegular text-purple-100 border-purple-100 border-b-4  pb-3 mx-5 cursor-pointer"
                : "text-sm font-BeatriceRegular text-gray-300  pb-3 mx-5  cursor-pointer"
            }
          >
            Data
          </div>
        </div>
        {/* content */}
        {openTab === "overview" && <div>overview</div>}
        {openTab === "users" && <UsersTab />}
        {openTab === "content" && <div>content</div>}
        {openTab === "data" && <div>data</div>}
      </div>
    </div>
  );
}

export default AdminDashbaord;
