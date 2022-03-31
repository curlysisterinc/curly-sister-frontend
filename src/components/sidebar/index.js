/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authHandler from "../../authHandler";
import { NonAuthRoutes } from "../../constants";
import { logoutUser } from "../../redux/auth/authSlice";
import brandLogo from "../../assets/images/brand-logo.svg";

function SideBarComponent({ active, isLoggedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    navigate(NonAuthRoutes.login);
    dispatch(logoutUser());
    authHandler.deleteUser();
  };
  return (
    <div className="w-72 bg-gray-50 p-8 h-screen fixed border-r border-gray-100 shadow">
      <img src={brandLogo} alt="brand logo" />
      {!isLoggedIn ? (
        <div className="mt-10 text-gray-400 text-xl font-semibold">
          <Link to="/">
            <p
              className={active === "home" ? " mb-4 text-purple-100" : " mb-4 "}
            >
              Home
            </p>
          </Link>
          <Link to="/stylists">
            <p
              className={
                active === "about" ? " mb-4 text-purple-100" : " mb-4 "
              }
            >
              Stylists
            </p>
          </Link>
          <Link to="/learn">
            <p
              className={
                active === "learn" ? " mb-4 text-purple-100" : " mb-4 "
              }
            >
              Learn
            </p>
          </Link>
          <Link to="/inbox">
            <p
              className={
                active === "about" ? " mb-4 text-purple-100" : " mb-4 "
              }
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
      ) : (
        <div className="mt-10 text-gray-400 text-xl font-semibold">
          <Link to="/home">
            <p
              className={active === "home" ? " mb-4 text-purple-100" : " mb-4 "}
            >
              Home
            </p>
          </Link>
          <Link to="/stylists">
            <p
              className={
                active === "stylists" ? " mb-4 text-purple-100" : " mb-4 "
              }
            >
              Stylists
            </p>
          </Link>
          <Link to="/learn">
            <p
              className={
                active === "learn" ? " mb-4 text-purple-100" : " mb-4 "
              }
            >
              Learn
            </p>
          </Link>
          <Link to="/inbox">
            <p
              className={
                active === "inbox" ? " mb-4 text-purple-100" : " mb-4 "
              }
            >
              Inbox
            </p>
          </Link>
          <Link to="/profile">
            <p
              className={
                active === "profile" ? " mb-4 text-purple-100" : " mb-4 "
              }
            >
              Profile
            </p>
          </Link>
          <div onClick={onLogout}>
            <p
              className={
                active === "profile" ? " mb-4 text-purple-100" : " mb-4 "
              }
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBarComponent;
