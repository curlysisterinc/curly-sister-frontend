/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authHandler from "../../authHandler";
import { NonAuthRoutes, AuthRoutes } from "../../constants";
import { logoutUser } from "../../redux/auth/authSlice";
import brandLogo from "../../assets/images/brand-logo.svg";
import allynAvatar from "../../assets/images/allyn.svg";
import dropdownIcon from "../../assets/images/dropdown.svg";

function SideBarComponent({ active, isLoggedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userDetails = authHandler.getUser("users");
  // const userFirstName = userDetails.firstName;
  // const userLastName = userDetails.lastName;
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    navigate(NonAuthRoutes.login);
    dispatch(logoutUser());
    authHandler.deleteUser();
  };
  return (
    <div className="w-80 bg-gray-50 px-12 h-screen fixed border-r border-gray-100 shadow flex flex-col justify-between">
      <div className="pt-8">
        <img src={brandLogo} alt="brand logo" />
        {!isLoggedIn ? (
          <div className="mt-10 text-gray-400 text-lg font-semibold">
            <Link to="/">
              <p
                className={
                  active === "home" ? " mb-4 text-purple-100" : " mb-4 "
                }
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
              className="text-sm mt-10 rounded-full border border-gray-400 w-full py-3 text-gray-400 font-semibold flex justify-center items-center"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-sm mt-4 rounded-full border border-orange-200 bg-orange-200  w-full py-3 text-white font-semibold flex justify-center items-center"
            >
              Join now
            </button>
          </div>
        ) : (
          <div className="mt-10 text-gray-400 text-lg font-semibold">
            <Link to="/home">
              <p
                className={
                  active === "home" ? " mb-4 text-purple-100" : " mb-4 "
                }
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
            <Link to="/dashboard">
              <p
                className={
                  active === "dashboard" ? " mb-4 text-purple-100" : " mb-4 "
                }
              >
                Dashboard
              </p>
            </Link>
          </div>
        )}
      </div>

      <div className="">
        {isLoggedIn && (
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between relative"
          >
            <img src={allynAvatar} alt="avatar" />
            <p className=" text-purple-100">Tope</p>
            <img
              className={open && "transform rotate-180"}
              src={dropdownIcon}
              alt="dropdwon icon"
            />
            {open && (
              <div className="absolute bg-white rounded-xl bottom-10 shadow w-full left-0 overflow-hidden">
                <div className="text-sm text-gray-200">
                  <div className="cursor-pointer mb-2 hover:bg-gray-600 px-5 py-2">
                    Facebook
                  </div>
                  <div className="cursor-pointer mb-2 hover:bg-gray-600 px-5 py-2">
                    Instagram
                  </div>
                  <div
                    className="cursor-pointer mb-2 hover:bg-gray-600 px-5 py-2"
                    onClick={() => navigate(AuthRoutes.termsAndPrivacy)}
                  >
                    Terms & Privacy
                  </div>
                  <div
                    className="cursor-pointer hover:bg-gray-600 px-5 py-2"
                    onClick={onLogout}
                  >
                    Log out
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBarComponent;
