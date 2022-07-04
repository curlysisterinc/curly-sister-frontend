/* eslint-disable import/prefer-default-export */
const AuthRoutes = {
  about: "/stations",
  analytics: "/analytics",
  dashboard: "/dashboard",
  learn: "/learn",
  addStylist: "/add-stylist",
  addArticle: "/create-article",
  addVideo: "/create-video",
  editVideoById: "/edit-video/:token",
  editArticleById: "/edit-article/:token",
  bookings: "/bookings",
  videos: "/learn/videos",
  communities: "/learn/communities",
  articles: "/learn/articles",
  videoContent: "/learn/video/:token",
  articleContent: "/learn/article/:token",
  communityContent: "/learn/communities/:token",
  users: "/dashboard/users/stylists",
  admin: "/dashboard/users/admin",
  individual: "/dashboard/users/individual",
  stylist: "/dashboard/users/stylist",
  successfullBooking: "/stylists/successfull-booking",
  content: "/dashboard/content",
  data: "/dashboard/data",
  stylistProfile: "/stylists/profile",
  bookedStylistProfile: "/stylists/booked-stylist-profile",
  confirmBooking: "/stylists/confirm-booking",
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
