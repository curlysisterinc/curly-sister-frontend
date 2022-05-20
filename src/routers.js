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
import IsLoggedInLearnComponent from "./components/isLoggedInLearn/learn";
import LearnComponent from "./components/learn/learn";
import VideoContent from "./components/isLoggedInLearn/videoContent";
import ArticleContent from "./components/isLoggedInLearn/articleContent";
import CommunityContent from "./components/isLoggedInLearn/communityContent";
import VideoTab from "./components/isLoggedInLearn/videoTab";
import ArticleTab from "./components/isLoggedInLearn/articleTab";
import CommunityTab from "./components/isLoggedInLearn/communityTab";
import LearnMoreArticleTab from "./components/learn/articleTab";
import LearnMoreTabComponent from "./components/learn/videoTab";
import LearnMoreCommunityTab from "./components/learn/communityTab";

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
          <Route
            exact
            path={NonAuthRoutes.learn}
            element={<LearnComponent />}
          />
          <Route
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
          />
          <Route
            exact
            path={AuthRoutes.learn}
            element={<IsLoggedInLearnComponent />}
          />
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
          <Route
            path={AuthRoutes.articleContent}
            element={<ArticleContent />}
          />{" "}
          <Route
            path={AuthRoutes.communityContent}
            element={<CommunityContent />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Routers;
