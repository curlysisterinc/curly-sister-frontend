import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/images/brand-logo.png";
import curlyGirls from "../../assets/images/curly-girl-group.png";

function AuthSideBarComponent({ signin }) {
  return (
    <div
      className=" bg-orange-150 lg:p-8 lg:h-screen lg:fixed
    lg:w-60 xl:w-80 x md:h-screen p-5 lg:px-12  md:fixed flex flex-col justify-between fixed z-200   w-full
    "
    >
      <div className="text-gray-400 text-xl font-semibold">
        <Link to="/">
          <img className="h-20" src={brandLogo} alt="brand logo" />
        </Link>
        <div className="mt-5">
          <h3 className="text-lg lg:text-2xl font-bold text-black">
            Welcome {signin}, Curly Sister is always here for you.
          </h3>
          <img
            className="mt-10 h-84 hidden lg:flex"
            src={curlyGirls}
            alt="curly girls pix"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthSideBarComponent;
