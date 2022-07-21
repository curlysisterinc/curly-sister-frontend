/* eslint-disable import/prefer-default-export */
const AuthRoutes = {
  about: "/stations",
  analytics: "/analytics",
  dashboard: "/dashboard",
  addStylist: "/add-stylist",
  addArticle: "/create-article",
  addVideo: "/create-video",
  editVideoById: "/edit-video/:token",
  editArticleById: "/edit-article/:token",
  bookings: "/bookings",
  users: "/dashboard/users/stylists",
  admin: "/dashboard/users/admin",
  individual: "/dashboard/users/individual",
  stylist: "/dashboard/users/stylist",
  successfullBooking: "/stylists/successfull-booking",
  content: "/dashboard/content",
  data: "/dashboard/data",
  stylistProfile: "/stylists/profile/:token",
  bookedStylistProfile: "/stylists/stylist-profile/:token",
  confirmBooking: "/stylists/confirm-booking",
};

const NonAuthRoutes = {
  home: "/",
  login: "/login",
  learn: "/learn",
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
};

export { AuthRoutes, NonAuthRoutes };
