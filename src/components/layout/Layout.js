// eslint-disable-next-line import/no-unresolved
import SideBarComponent from "components/sidebar";
import React from "react";

export function Layout({ children }) {
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent />
      {children}
    </div>
  );
}
