/* eslint-disable import/prefer-default-export */
const AuthRoutes = {
  about: "/stations",
  addStylist: "/dashboard/users/add-stylist",
  addVideo: "/create-video",
  admin: "/dashboard/users/admin",
  analytics: "/analytics",
  addArticle: "/create-article",
  Article: "/create-article",
  bookings: "/bookings",
  bookedStylistProfile: "/stylists/stylist-profile/:token",
  confirmBooking: "/stylists/confirm-booking",
  content: "/dashboard/content",
  dashboard: "/dashboard",
  dashboardOverview: "/dashboard/overview",
  data: "/dashboard/data",
  editVideoById: "/edit-video/:token",
  editArticleById: "/edit-article/:token",
  individual: "/dashboard/users/individual",
  successfullBooking: "/stylists/successfull-booking",
  stylists: "/dashboard/users/stylists",
  editStylist: "/dashboard/users/edit-stylist/:id",
  stylistProfile: "/stylists/profile/:token",
  users: "/dashboard/users",
};

const NonAuthRoutes = {
  home: "/",
  login: "/login",
  learn: "/learn",
  learnAll: "/learn/all",
  signup: "/signup",
  videos: "/learn/videos",
  communities: "/learn/communities",
  articles: "/learn/articles",
  videoContent: "/learn/video/:token",
  articleContent: "/learn/article/:token",
  communityContent: "/learn/communities/:token",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  about: "/about",
  stylists: "/stylists",
  termsAndPrivacy: "/terms-and-privacy",
  verifyUser: "/verify-user/:email",
};

export { AuthRoutes, NonAuthRoutes };
