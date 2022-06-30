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
import StylistProfile from "./components/user/stylist/stylistProfile";
import BookedStylistProfile from "./components/user/stylist/bookedStylist";
import ConfirmBooking from "./components/user/stylist/confirmBooking";

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
          {/* <Route
            exact
            path={NonAuthRoutes.learn}
            element={<LearnComponent />}
          /> */}
          {/* <Route
            exact
            path={NonAuthRoutes.videos}
            element={<LearnMoreTabComponent />}
          />{" "}
          <Route
            exact
            path={NonAuthRoutes.articles}
            element={<LearnMoreArticleTab />}
          />{" "}
          <Route
            exact
            path={NonAuthRoutes.communities}
            element={<LearnMoreCommunityTab />}
          /> */}
          {/* <Route
            exact
            path={AuthRoutes.learn}
            element={<IsLoggedInLearnComponent />}
          /> */}
          <Route path={AuthRoutes.home} element={<UserHome />} />
          <Route path={AuthRoutes.dashboard} element={<AdminDashbaord />} />
          <Route path={AuthRoutes.addStylist} element={<AddStylist />} />
          <Route path={AuthRoutes.bookings} element={<IndividualsBookings />} />
          <Route path={AuthRoutes.addArticle} element={<NewArticle />} />
          <Route path={AuthRoutes.addVideo} element={<NewVideo />} />
          <Route path={AuthRoutes.learn} element={<LearnComponent />} />
          <Route path={AuthRoutes.videoContent} element={<VideoContent />} />
          <Route path={AuthRoutes.videos} element={<VideoTab />} />
          <Route path={AuthRoutes.articles} element={<ArticleTab />} />
          <Route path={AuthRoutes.communities} element={<CommunityTab />} />
          <Route path={NonAuthRoutes.stylists} element={<Stylist />} />
          <Route
            path={AuthRoutes.articleContent}
            element={<ArticleContent />}
          />{" "}
          <Route
            path={AuthRoutes.communityContent}
            element={<CommunityContent />}
          />
          <Route path={AuthRoutes.users} element={<UsersTab />} />
          <Route path={AuthRoutes.admin} element={<AdminTab />} />
          <Route path={AuthRoutes.individual} element={<IndividualTab />} />
          <Route path={AuthRoutes.content} element={<ContentTab />} />
          <Route path={AuthRoutes.data} element={<DataTab />} />
          <Route path={AuthRoutes.editVideoById} element={<EditVideo />} />
          <Route path={AuthRoutes.editArticleById} element={<EditArticle />} />
          <Route path={NonAuthRoutes.stylists} element={<Stylist />} />
          <Route
            path={NonAuthRoutes.stylistProfile}
            element={<StylistProfile />}
          />
          <Route
            path={NonAuthRoutes.bookedStylistProfile}
            element={<BookedStylistProfile />}
          />
          <Route
            path={NonAuthRoutes.confirmBooking}
            element={<ConfirmBooking />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Routers;
