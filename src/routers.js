/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/home/home";
import AboutComponent from "./components/about/about";
import { NonAuthRoutes, AuthRoutes } from "./constants";
import LoginComponent from "./components/login/login";
import SignupComponent from "./components/signup/signup";
import ForgotPasswordComponent from "./components/forgotPassword/forgotPassword";
import TermsAndPrivacy from "./components/termsAndPrivacy/termsAndPrivacy";
import ResetPasswordComponent from "./components/resetPassword/resetPassword";
import UserHome from "./components/userHome/userHome";
import AdminDashbaord from "./components/admin/dashboard";
import AddStylist from "./components/admin/dashboard/users/addStylist";
import IndividualsBookings from "./components/admin/dashboard/users/individuals/bookings/bookings";
import NewArticle from "./components/admin/dashboard/content/article/newArticle";
import NewVideo from "./components/admin/dashboard/content/video/addVideo";

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
          <Route path={AuthRoutes.dashboard} element={<AdminDashbaord />} />
          <Route path={AuthRoutes.addStylist} element={<AddStylist />} />
          <Route path={AuthRoutes.bookings} element={<IndividualsBookings />} />
          <Route path={AuthRoutes.addArticle} element={<NewArticle />} />
          <Route path={AuthRoutes.addVideo} element={<NewVideo />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Routers;
