/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
import React from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { logoutUser } from "../../redux/auth/authSlice";
import authHandler from "../../authHandler";
import { NonAuthRoutes, AuthRoutes } from "../../constants";
import brandLogo from "../../assets/images/brand-logo.svg";
import allynAvatar from "../../assets/images/allyn.svg";
import dropdownIcon from "../../assets/images/dropdown.svg";
import DropDown from "../customdropdown/primitive/DropDown";
import DropDownItem from "../customdropdown/primitive/DropDownItem";

function SideNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const isLoggedIn = authHandler.getUser();

  const firstName = isLoggedIn?.active.firstName;
  const lastName = isLoggedIn?.active.lastName;
  const profile_pic = isLoggedIn?.active.profile_pic;

  const onLogout = () => {
    navigate(NonAuthRoutes.login);
    dispatch(logoutUser());
    authHandler.deleteUser();
  };

  const navLinks = [
    {
      title: "Home",
      path: NonAuthRoutes.home,
      permission: "both",
    },
    {
      title: "Stylists",
      path: NonAuthRoutes.stylists,
      permission: "both",
    },
    {
      title: "Learn",
      path: NonAuthRoutes.learn,
      permission: "both",
    },
    {
      title: "Inbox",
      path: "/inbox",
      permission: "loggedin",
    },
    {
      title: "About",
      path: NonAuthRoutes.about,
      permission: "loggedout",
    },
    {
      title: "Profile",
      path: "/profile",
      permission: "loggedin",
    },
    {
      title: "Dashboard",
      path: AuthRoutes.dashboard,
      permission: "loggedin",
    },
  ];

  return (
    <div className="w-80 bg-gray-50 px-12 h-screen fixed border-r border-gray-100 shadow flex flex-col justify-between">
      <div className="pt-8">
        <Link to="/">
          <img src={brandLogo} alt="brand logo" />
        </Link>

        {pathname !== "/stylists/confirm-booking" && (
          <div className="mt-10 text-gray-400 text-lg font-semibold flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "mb-4 text-purple-100"
                    : `mb-4 ${
                        !isLoggedIn && link.permission === "loggedin"
                          ? "hidden"
                          : null
                      } ${
                        isLoggedIn && link.permission === "loggedout"
                          ? "hidden"
                          : null
                      }`
                }
              >
                {link.title}
              </NavLink>
            ))}
            {!isLoggedIn && (
              <>
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
                  className="text-sm mt-4 rounded-full border border-orange-200  bg-orange-200  w-full py-3 text-white font-semibold flex justify-center items-center"
                >
                  Join now
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="">
        {isLoggedIn &&
          (pathname === "/stylists/confirm-booking" ? (
            <button
              type="button"
              className="flex space-x-2 items-center cursor-pointer pt-4  px-6"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack color="#8E8695" />
              <p className="text-sm font-AvenirLTPro-Heavy text-gray-300 uppercase">
                GO Back
              </p>
            </button>
          ) : (
            <DropDown
              contentClassName="bg-white rounded-xl  shadow w-48 overflow-hidden text-sm text-gray-200"
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-x-4 justify-between relative cursor-pointer"
                >
                  <img
                    src={profile_pic ? profile_pic : allynAvatar}
                    alt="user avatar"
                  />
                  <div className="flex items-center gap-x-8">
                    <p className=" text-purple-100">
                      {firstName} {lastName}
                    </p>

                    <img src={dropdownIcon} alt="dropdown-icon" />
                  </div>
                </button>
              }
            >
              <DropDownItem>
                <button
                  type="button"
                  className="cursor-pointer mb-2 hover:bg-gray-600 px-5 py-2 w-full text-left"
                >
                  Facebook
                </button>
              </DropDownItem>
              <DropDownItem>
                <button
                  type="button"
                  className="cursor-pointer mb-2 hover:bg-gray-600 px-5 py-2 w-full text-left"
                >
                  Instagram
                </button>
              </DropDownItem>
              <DropDownItem>
                <button
                  type="button"
                  onClick={() => navigate(NonAuthRoutes.termsAndPrivacy)}
                  className="cursor-pointer mb-2 hover:bg-gray-600 px-5 py-2 w-full text-left"
                >
                  Terms & Privacy
                </button>
              </DropDownItem>
              <DropDownItem>
                <button
                  type="button"
                  onClick={onLogout}
                  className="cursor-pointer mb-2 hover:bg-gray-600 px-5 py-2 w-full text-left"
                >
                  Log out
                </button>
              </DropDownItem>
            </DropDown>
          ))}
      </div>
    </div>
  );
}

export default SideNav;
