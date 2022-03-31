/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/home";
import AboutComponent from "./components/about";

import { NonAuthRoutes, AuthRoutes } from "./constants";
import LoginComponent from "./components/login";
import SignupComponent from "./components/signup";
import ForgotPasswordComponent from "./components/forgotPassword";
import TermsAndPrivacy from "./components/termsAndPrivacy";
import ResetPasswordComponent from "./components/resetPassword";
import UserHome from "./components/userHome";

function Routers() {
  return (
    <div className="dark:bg-slate-800">
      <Suspense
        fallback={
          <div className="flex justify-center mt-60">
            {/* <LoadingIcon className="btn-loading" /> */}
            loading...
          </div>
        }
      >
        <Routes>
          <Route exact path={NonAuthRoutes.home} element={<HomeComponent />} />
          <Route
            exact
            path={NonAuthRoutes.about}
            element={<AboutComponent />}
          />
          <Route
            exact
            path={NonAuthRoutes.login}
            element={<LoginComponent />}
          />
          <Route
            exact
            path={NonAuthRoutes.signup}
            element={<SignupComponent />}
          />
          <Route
            exact
            path={NonAuthRoutes.forgotPassword}
            element={<ForgotPasswordComponent />}
          />
          <Route
            exact
            path={NonAuthRoutes.resetPassword}
            element={<ResetPasswordComponent />}
          />
          <Route
            exact
            path={NonAuthRoutes.termsAndPrivacy}
            element={<TermsAndPrivacy />}
          />
          <Route path={AuthRoutes.home} element={<UserHome />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Routers;
