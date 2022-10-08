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
import { useAuthContext } from "redux/auth";
import { logoutUser } from "../../redux/auth/authSlice";
import authHandler from "../../authHandler";
import { NonAuthRoutes, AuthRoutes } from "../../constants";
import brandLogo from "../../assets/images/brand-logo.png";
import allynAvatar from "../../assets/images/allyn.png";
import dropdownIcon from "../../assets/images/dropdown.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/close.svg";
import { ReactComponent as MenuIcon } from "../../assets/images/menu.svg";
import DropDown from "../customdropdown/primitive/DropDown";
import DropDownItem from "../customdropdown/primitive/DropDownItem";

function SideNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    dispatch,
    state: { isSignedIn, email_verified },
  } = useAuthContext();

  const [isOpen, setIsOpen] = React.useState(false);

  const user = authHandler.getUser();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const role = user?.role;
  const profile_pic = user?.profile_pic;

  const onLogout = () => {
    navigate(NonAuthRoutes.home);
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
  ];

  const dashboardLink = {
    title: "Dashboard",
    path: AuthRoutes.dashboard,
    permission: "loggedin",
    role: "admin",
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`md:w-60 xl:w-80  md:bg-gray-50 md:h-screen  lg:px-12  md:fixed flex flex-col justify-between fixed z-200  p-0 w-full ${
        isOpen ? "h-screen" : "h-69"
      }`}
    >
      <div className="md:pt-8  py-0 px-4 bg-white md:bg-gray-50 md:h-full relative">
        <div className="flex items-center justify-between h-69 md:h-auto  py-2 md:mb-10">
          <Link to="/">
            <img
              src={brandLogo}
              alt="brand logo"
              className="w-10 md:w-12 lg:w-24"
            />
          </Link>

          <button type="button" onClick={toggleNav} className="md:hidden">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div
          className={`h-316 md:h-auto flex justify-between flex-col ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          {pathname !== "/stylists/confirm-booking" && (
            <div className="mt-4 md:mt-0  text-gray-400 text-lg font-semibold flex flex-col items-center md:items-start">
              {navLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  onClick={toggleNav}
                  className={
                    ({ isActive }) =>
                      isActive
                        ? "mb-4 text-base md:text-lg text-purple-100"
                        : `mb-4 text-base md:text-lg ${
                            (!isSignedIn || !email_verified) &&
                            link.permission === "loggedin"
                              ? "hidden"
                              : ""
                          }
                      ${
                        isSignedIn && link.permission === "loggedout"
                          ? "hidden"
                          : ""
                      }`
                    // ${
                    //   isSignedIn &&
                    //   link.role === "admin" &&
                    //   link.permission === "loggedout"
                    //     ? "hidden"
                    //     : ""
                    // }
                  }
                >
                  {link.title}
                </NavLink>
              ))}
              {role?.toLowerCase()?.includes("admin") && email_verified && (
                <NavLink
                  key={dashboardLink.title}
                  to={dashboardLink.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "mb-4 text-purple-100" : "mb-4"
                  }
                >
                  {dashboardLink.title}
                </NavLink>
              )}
              {!isSignedIn && (
                <>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-sm mt-4 rounded-full border border-gray-400 w-full py-3 text-gray-400 font-semibold flex justify-center items-center"
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

          <div className="absolute bottom-4 left-2 right-2">
            {isSignedIn &&
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
                  contentClassName="bg-white rounded-xl  shadow w-48 overflow-hidden text-sm text-gray-200 z-20"
                  trigger={
                    <button
                      type="button"
                      className="flex items-center gap-x-4 justify-between relative cursor-pointer w-full px-4 md:px-0"
                    >
                      <div className="flex items-center gap-x-8">
                        <img
                          src={profile_pic ? profile_pic : allynAvatar}
                          alt="user avatar"
                        />
                        <p className=" text-purple-100  ">
                          {firstName} {lastName}
                        </p>
                      </div>
                      <img src={dropdownIcon} alt="dropdown-icon" />
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
      </div>
    </div>
  );
}

export default SideNav;
