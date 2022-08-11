/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import HomeComponent from "components/home";
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoaderComponent from "./components/loader-component";
import { NonAuthRoutes, AuthRoutes } from "./constants";

// const HomeComponent = lazy(() => import("./components/home/home"));
const AboutComponent = lazy(() => import("./components/about"));
const LoginComponent = lazy(() => import("./components/login"));
const SignupComponent = lazy(() => import("./components/signup"));
const ForgotPasswordComponent = lazy(() =>
  import("./components/forgotPassword")
);
const TermsAndPrivacy = lazy(() => import("./components/termsAndPrivacy"));
const ResetPasswordComponent = lazy(() => import("./components/resetPassword"));
const UserHome = lazy(() => import("./components/userHome"));
const AdminDashbaord = lazy(() => import("./components/admin"));
const AddStylist = lazy(() =>
  import("./components/admin/dashboard/users/addStylist")
);

const PageNotFound = lazy(() => import("pages/404"));

function Routers() {
  return (
    <div className="dark:bg-slate-800">
      <Suspense fallback={<LoaderComponent />}>
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
          <Route exact path={AuthRoutes.home} element={<UserHome />} />
          <Route
            exact
            path={AuthRoutes.dashboard}
            element={<AdminDashbaord />}
          />
          <Route exact path={AuthRoutes.addStylist} element={<AddStylist />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Routers;
