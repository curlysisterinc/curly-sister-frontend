import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/images/brand-logo.svg";

function SideBarComponent({ active }) {
  return (
    <div className="w-72 bg-gray-50 p-8 h-screen fixed border-r border-gray-100 shadow">
      <img src={brandLogo} alt="brand logo" />
      <div className="mt-10 text-gray-400 text-xl font-semibold">
        <Link to="/">
          <p className={active === "home" ? " mb-4 text-purple-100" : " mb-4 "}>
            Home
          </p>
        </Link>
        <Link to="/stylists">
          <p
            className={active === "about" ? " mb-4 text-purple-100" : " mb-4 "}
          >
            Stylists
          </p>
        </Link>
        <Link to="/learn">
          <p
            className={active === "learn" ? " mb-4 text-purple-100" : " mb-4 "}
          >
            Learn
          </p>
        </Link>
        <Link to="/inbox">
          <p
            className={active === "about" ? " mb-4 text-purple-100" : " mb-4 "}
          >
            About
          </p>
        </Link>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-10 rounded-full border border-gray-400 w-full py-3 text-gray-400 font-semibold flex justify-center items-center"
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="mt-4 rounded-full border border-orange-200 bg-orange-200  w-full py-3 text-white font-semibold flex justify-center items-center"
        >
          Join now
        </button>
      </div>
    </div>
  );
}

export default SideBarComponent;
