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
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stylistTypes, users } from "./data";

// import stylists from "../api/stylists";
import AdminTab from "./admin/admin";
import StylistTab from "./stylists/stylists";
import InvidiualsTab from "./individuals/individuals";

function UsersTab() {
  const [activeTab, setActiveTab] = useState("stylists");

  // useEffect(() => {
  //   const ac = new AbortController();
  //   document.title = "CurlySisters • Stylists";

  //   stylists.GetAllStylists().then((response) => {
  //     if (response.status === 200) {
  //       console.log(response.data.stylist, "res");
  //       setAllStylists(response.data.stylist);
  //     }
  //   });

  //   return function cleanup() {
  //     ac.abort();
  //   };
  // }, []);

  return (
    <div>
      {/* tabs */}
      <div className="flex w-1/2 mx-auto justify-center mb-5">
        <button
          type="button"
          onClick={() => setActiveTab("stylists")}
          className={
            activeTab === "stylists"
              ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mr-3"
              : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mr-3"
          }
        >
          Stylists
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("admins")}
          className={
            activeTab === "admins"
              ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mx-3"
              : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mx-3"
          }
        >
          Admins
        </button>{" "}
        <button
          type="button"
          onClick={() => setActiveTab("individuals")}
          className={
            activeTab === "individuals"
              ? "border border-purple-100 rounded-full px-5 py-2 bg-white text-purple-100 mx-3"
              : "border border-gray-250 rounded-full px-5 py-2 bg-white text-gray-250 mx-3"
          }
        >
          Individuals
        </button>
      </div>
      {activeTab === "stylists" ? <StylistTab /> : null}
      {activeTab === "admins" ? <AdminTab /> : null}
      {activeTab === "individuals" ? <InvidiualsTab /> : null}
    </div>
  );
}

export default UsersTab;
