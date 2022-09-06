/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { lazy, Suspense, useLayoutEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminLayout from "./components/layout/admin";
import { NonAuthRoutes, AuthRoutes } from "./constants";

import authHandler from "./authHandler";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import LoaderComponent from "components/loader-component";
// import AddStylist from "components/admin/dashboard/users/addStylists/addStylist";

const IndividualsBookings = lazy(() =>
  import("./components/admin/dashboard/users/individuals/bookings/bookings")
);
const NewArticle = lazy(() =>
  import("./components/admin/dashboard/content/article/newArticle")
);
const NewVideo = lazy(() =>
  import("./components/admin/dashboard/content/video/addVideo")
);
const LearnComponent = lazy(() => import("./components/user/learn/learn"));
const VideoContent = lazy(() => import("./components/user/learn/videoContent"));
const ArticleContent = lazy(() =>
  import("./components/user/learn/articleContent")
);
const CommunityContent = lazy(() =>
  import("./components/user/learn/communityContent")
);
const VideoTab = lazy(() => import("./components/user/learn/videoTab"));
const ArticleTab = lazy(() => import("./components/user/learn/articleTab"));
const CommunityTab = lazy(() => import("./components/user/learn/communityTab"));
// const LearnMoreTabComponent = lazy(() => import("./components/learn/videoTab"));
// const LearnMoreCommunityTab = lazy(() =>
//   import("./components/learn/communityTab")
// );
const UsersTab = lazy(() => import("./components/admin/dashboard/users/users"));
const AdminTab = lazy(() =>
  import("./components/admin/dashboard/users/admin/admin")
);
const IndividualTab = lazy(() =>
  import("./components/admin/dashboard/users/individuals/individuals")
);
const ContentTab = lazy(() =>
  import("./components/admin/dashboard/content/contentTable")
);
const DataTab = lazy(() => import("./components/admin/dashboard/data/data"));
const EditVideo = lazy(() =>
  import("./components/admin/dashboard/content/video/updateVideo")
);
const EditArticle = lazy(() =>
  import("./components/admin/dashboard/content/article/editArticle")
);
const Stylist = lazy(() => import("./components/user/stylist/stylist"));
const StylistProfile = lazy(() =>
  import("./components/user/stylist/profile/stylistProfile")
);
const BookedStylistProfile = lazy(() =>
  import("./components/user/stylist/bookedStylist")
);
const ConfirmBooking = lazy(() =>
  import("./components/user/stylist/confirmBooking")
);
const SuccessfullBooking = lazy(() =>
  import("./components/user/stylist/successfulBooking")
);
const AppLayout = lazy(() => import("./components/layout"));
const OverviewTab = lazy(() => import("./components/admin/dashboard/overview"));
const StylistTab = lazy(() =>
  import("./components/admin/dashboard/users/stylists/stylists")
);
const AllTab = lazy(() => import("./components/user/learn/allTab"));
const HomeComponent = lazy(() => import("components/home"));

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
  import("components/admin/dashboard/users/addStylists/addStylist")
);
const EditStylist = lazy(() =>
  import("components/admin/dashboard/users/addStylists/editStylists")
);

const PageNotFound = lazy(() => import("pages/404"));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Routers() {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Suspense fallback={<LoaderComponent />}>
      <Elements stripe={stripePromise}>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
          }}
        >
          <div className="dark:bg-white">
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
                    <Route
                      path={AuthRoutes.dashboardOverview}
                      element={<OverviewTab />}
                    />
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
                    path={AuthRoutes.editStylist}
                    element={<EditStylist />}
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
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </PayPalScriptProvider>
      </Elements>
    </Suspense>
  );
}

export default Routers;
