/* eslint-disable import/prefer-default-export */
const AuthRoutes = {
  home: "/home",
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
  termsAndPrivacy: "/terms-and-privacy",
  users: "/dashboard/users/stylists",
  admin: "/dashboard/users/admin",
  individual: "/dashboard/users/individual",
  stylist: "/dashboard/users/stylist",
  content: "/dashboard/content",
  data: "/dashboard/data",
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
