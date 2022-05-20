/* eslint-disable import/prefer-default-export */
const AuthRoutes = {
  home: "/home",
  about: "/stations",
  analytics: "/analytics",
  dashboard: "/dashboard",
  learn: "/learn",
  addStylist: "/add-stylist",
  addArticle: "/add-article",
  addVideo: "/add-video",
  bookings: "/bookings",
  videos: "/learn/videos",
  communities: "/learn/communities",
  articles: "/learn/articles",
  videoContent: "/learn/video/:token",
  articleContent: "/learn/articles/:token",
  communityContent: "/learn/communities/:token",
  termsAndPrivacy: "/terms-and-privacy",
};

const NonAuthRoutes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  videos: "/learn-more/videos",
  communities: "/learn-more/communities",
  articles: "/learn-more/articles",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  about: "/about",
  stylists: "/stylists",
  learn: "/learn-more",
  termsAndPrivacy: "/terms-and-privacy",
};

export { AuthRoutes, NonAuthRoutes };
