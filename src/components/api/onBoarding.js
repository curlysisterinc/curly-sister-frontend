/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
/* eslint-disable object-shorthand */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import { curlySistersOnboarding } from "../../config";

// eslint-disable-next-line
export default {
  /** Send a POST request to Log In User */
  async SignUp(email, password, name) {
    const data = {
      email,
      password,
      name,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post("/users/register", stringifiedData);
  },

  /** Send a POST request to Log In User */
  async LogIn(email, password) {
    const data = {
      email,
      password,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post("/users/login", stringifiedData);
  },

  /** Send a POST request for Forgot Password */
  async ForgotPassword(userEmail) {
    const data = {
      email: userEmail,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post(
      "/users/forgotPassword",
      stringifiedData
    );
  },

  /** Send a POST request to Reset Password */
  async ResetPassword(token, newPassword) {
    const data = {
      password: newPassword,
    };
    const stringifiedData = JSON.stringify(data);
    return curlySistersOnboarding.post(
      `$/users/reset-password/${token}`,
      stringifiedData
    );
  },
};
