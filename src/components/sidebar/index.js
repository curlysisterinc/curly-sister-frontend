/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthContext } from "../../redux/auth";
import authHandler from "../../authHandler";
import { NonAuthRoutes, AuthRoutes } from "../../constants";
import { logoutUser } from "../../redux/auth/authSlice";
import brandLogo from "../../assets/images/brand-logo.png";
import allynAvatar from "../../assets/images/allyn.svg";
import dropdownIcon from "../../assets/images/dropdown.svg";

const navigationLinks = [
  {
    link: "/",
    linkName: "Home",
  },
  {
    link: "/stylists",
    linkName: "Stylists",
  },
  {
    link: "/learn",
    linkName: "Learn",
  },
  {
    link: "/about",
    linkName: "About",
  },
  {
    link: "/inbox",
    linkName: "Inbox",
    isAuthPage: true,
  },
  {
    link: "/profile",
    linkName: "Profile",
    isAuthPage: true,
  },
  {
    link: "/dashboard",
    linkName: "Dashboard",
    isAuthPage: true,
  },
];

function SideBarComponent() {
  const {
    state: { isSignedIn },
  } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const path = window.location.pathname;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    navigate(NonAuthRoutes.login);
    dispatch(logoutUser());
    authHandler.deleteUser();
  };

  useEffect(() => {
    const ac = new AbortController();
    if (isSignedIn) {
      const userDetails = authHandler.getUser("users");
      const userFirstName = userDetails?.active?.firstName;
      const userLastName = userDetails?.active?.lastName;
      setFirstName(userFirstName);
      setLastName(userLastName);
    }

    return function cleanup() {
      ac.abort();
    };
  }, []);

  const getActiveClass = ({ navlink }) => {
    const { link, linkName, isAuthPage } = navlink;
    const defaultStyle = "mb-4 block w-fit";
    if (path === link) {
      return `text-purple-100 ${defaultStyle}`;
    }
    if (isAuthPage && !isSignedIn) {
      return "hidden";
    }

    return defaultStyle;
  };

  return (
    <div className="w-80 bg-gray-50 px-12 h-screen fixed border-r border-gray-100 shadow flex flex-col justify-between">
      <div className="pt-8">
        {/* //TODO: link the sidebar image to the home page */}
        <img src={brandLogo} alt="brand logo" />

        <div className="mt-10 text-gray-400 text-lg font-semibold">
          {navigationLinks.map((navlink) => {
            const { link, linkName, isAuthPage } = navlink;
            return (
              <NavLink
                to={link}
                key={link}
                className={getActiveClass({ navlink })}
              >
                {linkName}
              </NavLink>
            );
          })}
        </div>
        {!isSignedIn && (
          <>
            {" "}
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
          </>
        )}
      </div>

      <div className="">
        {isSignedIn && (
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between relative cursor-pointer"
          >
            <img src={allynAvatar} alt="avatar" />
            <p className=" text-purple-100">
              {firstName} {lastName}
            </p>
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
