/* eslint-disable import/prefer-default-export */
const AuthRoutes = {
  home: "/home",
  about: "/stations",
  analytics: "/analytics",
  dashboard: "/dashboard",
  addStylist: "/add-stylist",
  addArticle: "/add-article",
  addVideo: "/add-video",
  bookings: "/bookings",
  termsAndPrivacy: "/terms-and-privacy",
};

const NonAuthRoutes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  about: "/about",
  stylists: "/stylists",
  learn: "/learn",
  termsAndPrivacy: "/terms-and-privacy",
};

export { AuthRoutes, NonAuthRoutes };
