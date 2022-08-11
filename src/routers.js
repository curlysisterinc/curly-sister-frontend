/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import HomeComponent from "components/home";
import React, { lazy, Suspense } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/admin";
import HomeComponent from "./components/home";
import AboutComponent from "./components/about/about";
import { NonAuthRoutes, AuthRoutes } from "./constants";
import LoginComponent from "./components/login/login";
import SignupComponent from "./components/signup/signup";
import ForgotPasswordComponent from "./components/forgotPassword/forgotPassword";
import TermsAndPrivacy from "./components/termsAndPrivacy/termsAndPrivacy";
import ResetPasswordComponent from "./components/resetPassword/resetPassword";
import AdminDashbaord from "./components/admin/dashboard";
import AddStylist from "./components/admin/dashboard/users/addStylists/addStylist";
import IndividualsBookings from "./components/admin/dashboard/users/individuals/bookings/bookings";
import NewArticle from "./components/admin/dashboard/content/article/newArticle";
import NewVideo from "./components/admin/dashboard/content/video/addVideo";
// import IsLoggedInLearnComponent from "./components/user/learn/learn";
import LearnComponent from "./components/user/learn/learn";
import VideoContent from "./components/user/learn/videoContent";
import ArticleContent from "./components/user/learn/articleContent";
import CommunityContent from "./components/user/learn/communityContent";
import VideoTab from "./components/user/learn/videoTab";
import ArticleTab from "./components/user/learn/articleTab";
import CommunityTab from "./components/user/learn/communityTab";
// import LearnMoreArticleTab from "./components/user/learn/articleTab";
// import LearnMoreTabComponent from "./components/learn/videoTab";
// import LearnMoreCommunityTab from "./components/learn/communityTab";
import UsersTab from "./components/admin/dashboard/users/users";
import AdminTab from "./components/admin/dashboard/users/admin/admin";
import IndividualTab from "./components/admin/dashboard/users/individuals/individuals";
import ContentTab from "./components/admin/dashboard/content/contentTable";
import DataTab from "./components/admin/dashboard/data/data";
import EditVideo from "./components/admin/dashboard/content/video/updateVideo";
import EditArticle from "./components/admin/dashboard/content/article/editArticle";
import Stylist from "./components/user/stylist/stylist";
import StylistProfile from "./components/user/stylist/profile/stylistProfile";
import BookedStylistProfile from "./components/user/stylist/bookedStylist";
import ConfirmBooking from "./components/user/stylist/confirmBooking";
import SuccessfullBooking from "./components/user/stylist/successfulBooking";
import AppLayout from "./components/layout";
// import OverviewTab from "./components/admin/dashboard/overview/overview";
import StylistTab from "./components/admin/dashboard/users/stylists/stylists";
import AllTab from "./components/user/learn/allTab";

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

import authHandler from "./authHandler";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LQ4MZBHdUN0GiBt1CZsfNAPvWydnkEX1xL5ZiUXSsC2ErjI9LOQwT4K48YOQbJtcp8vXJX0TT5aP7XAXNmXSt2j00BlrHqanQ"
);

function Routers() {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <Elements stripe={stripePromise}>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID
          }}
        >
          <div className="dark:bg-slate-800">
            <Routes>
              <Route path={NonAuthRoutes.login} element={<LoginComponent />} />
              <Route
                path={NonAuthRoutes.signup}
                element={<SignupComponent />}
              />
              <Route
                path={NonAuthRoutes.forgotPassword}
                element={<ForgotPasswordComponent />}
              />
              <Route
                path={NonAuthRoutes.resetPassword}
                element={<ResetPasswordComponent />}
              />
              <Route element={<AppLayout />}>
                <Route path={NonAuthRoutes.home} element={<HomeComponent />} />
                <Route
                  path={NonAuthRoutes.about}
                  element={<AboutComponent />}
                />
                <Route
                  path={NonAuthRoutes.termsAndPrivacy}
                  element={<TermsAndPrivacy />}
                />
                <Route path={NonAuthRoutes.stylists} element={<Stylist />} />
                <Route path={NonAuthRoutes.learn} element={<LearnComponent />}>
                  <Route path={NonAuthRoutes.learnAll} element={<AllTab />} />
                  <Route path={NonAuthRoutes.videos} element={<VideoTab />} />
                  <Route
                    path={NonAuthRoutes.articles}
                    element={<ArticleTab />}
                  />
                  <Route
                    path={NonAuthRoutes.communities}
                    element={<CommunityTab />}
                  />
                </Route>
                <Route
                  path={NonAuthRoutes.videoContent}
                  element={<VideoContent />}
                />
                <Route
                  path={NonAuthRoutes.articleContent}
                  element={<ArticleContent />}
                />{" "}
                <Route
                  path={NonAuthRoutes.communityContent}
                  element={<CommunityContent />}
                />
                {/* auth routes */}
                <Route element={<AdminLayout />}>
                  <Route
                    path={AuthRoutes.stylistProfile}
                    element={<StylistProfile />}
                  />
                  <Route
                    path={AuthRoutes.bookedStylistProfile}
                    element={<BookedStylistProfile />}
                  />
                  <Route
                    path={AuthRoutes.confirmBooking}
                    element={<ConfirmBooking />}
                  />
                  <Route
                    path={AuthRoutes.successfullBooking}
                    element={<SuccessfullBooking />}
                  />

                  {/* dashboad contnent */}
                  <Route
                    path={AuthRoutes.dashboard}
                    element={<AdminDashbaord />}
                  >
                    {/* <Route
                    path={AuthRoutes.dashboardOverview}
                    element={<OverviewTab />}
                  /> */}
                    <Route path={AuthRoutes.users} element={<UsersTab />}>
                      <Route
                        path={AuthRoutes.stylists}
                        element={<StylistTab />}
                      />
                      <Route path={AuthRoutes.admin} element={<AdminTab />} />
                      <Route
                        path={AuthRoutes.individual}
                        element={<IndividualTab />}
                      />
                    </Route>
                    <Route path={AuthRoutes.content} element={<ContentTab />} />
                    <Route path={AuthRoutes.data} element={<DataTab />} />
                  </Route>
                  <Route
                    path={AuthRoutes.addStylist}
                    element={<AddStylist />}
                  />

                  <Route
                    path={AuthRoutes.bookings}
                    element={<IndividualsBookings />}
                  />
                  <Route
                    path={AuthRoutes.addArticle}
                    element={<NewArticle />}
                  />
                  <Route path={AuthRoutes.addVideo} element={<NewVideo />} />

                  <Route
                    path={AuthRoutes.editVideoById}
                    element={<EditVideo />}
                  />
                  <Route
                    path={AuthRoutes.editArticleById}
                    element={<EditArticle />}
                  />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </div>
        </PayPalScriptProvider>
      </Elements>
    </Suspense>
  );
}

export default Routers;
