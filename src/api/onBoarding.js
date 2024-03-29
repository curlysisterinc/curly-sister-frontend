/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
/* eslint-disable object-shorthand */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import { curlySistersOnboarding, curlySistersApi } from "../config";

// eslint-disable-next-line
export default {
  /** Send a POST request to Log In User */
  async SignUp(email, password, firstName, lastName) {
    const data = {
      email,
      password,
      firstName,
      lastName,
      callbackUrl: `${window.location.origin}/verify-user`,
    };

    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post("/api/users/register", stringifiedData);
  },

  /** Send a POST request to Log In User */
  async LogIn(email, password) {
    const data = {
      email,
      password,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post("/api/users/login", stringifiedData);
  },

  /** Send a POST request for Forgot Password */
  async ForgotPassword(userEmail) {
    const data = {
      email: userEmail,
      callbackUrl: `${window.location.origin}/reset-password/`,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post(
      "/api/users/forgotPassword",
      stringifiedData
    );
  },

  /** Send a POST request to Reset Password */
  async ResetPassword(data) {
    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post(
      `/api/users/reset-password/${data.token}`,
      stringifiedData
    );
  },

  /** Send a POST request to Resend Verification Mail */
  async ResendVerificationMail(userEmail) {
    const data = {
      email: userEmail,
      callbackUrl: `${window.location.origin}/verify-user`,
    };

    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post(
      `/api/users/resend-verification`,
      stringifiedData
    );
  },

  /** Send a POST request to Resend Verification Mail */
  async VerifyUserEmail(userEmail) {
    return curlySistersOnboarding.get(`/api/users/verifyEmail/${userEmail}`);
  },

  async inviteAdmin(email) {
    const data = {
      email,
      callbackUrl: `${window.location.origin}/login`,
      role: "ADMIN",
    };
    return curlySistersOnboarding.post("/api/users/admin-invitation", data);
  },

  async GetUserProfile() {
    return curlySistersApi.get("/v1/user/user-profile");
  },
};
