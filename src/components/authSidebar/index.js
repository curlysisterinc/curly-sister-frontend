import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/images/brand-logo.png";
import curlyGirls from "../../assets/images/curly-girl-group.png";

function AuthSideBarComponent({ signin }) {
  return (
    <div className="w-full lg:w-96 bg-orange-150 p-5 lg:p-8 lg:h-screen lg:fixed shadow">
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
