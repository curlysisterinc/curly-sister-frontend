/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

let initialState = {
  isSignedIn: false,
};

const resetAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  initialState = {
    isSignedIn: false,
  };
};

if (
  localStorage.getItem("token") &&
  localStorage.getItem("token") !== "undefined" &&
  localStorage.getItem("user") &&
  localStorage.getItem("user") !== "undefined"
) {
  const token = localStorage.getItem("token") || "";
  const user = JSON.parse(localStorage.getItem("user") || "");
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    resetAuth();
  }
  initialState = {
    ...initialState,
    ...user,
    decodedToken,
    token,
    isSignedIn: true,
  };
} else {
  resetAuth();
}

const getInitialState = () => initialState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userFirstPageRegistration(state, action) {
      const { userEmail, userPw } = action.payload;

      state.userEmail = userEmail;
      state.userPw = userPw;
    },
    loginUser(state, action) {
      return { ...state, ...action.payload, isSignedIn: true };
    },
    signupUser(state, action) {
      const { isSignedIn } = action.payload;

      state.isSignedIn = isSignedIn;
    },
    forgotPassword(state, action) {
      const { token, isSignedIn } = action.payload;

      state.token = token;
      state.isSignedIn = isSignedIn;
    },
    resetPassword(state, action) {
      const { token, isSignedIn } = action.payload;

      state.token = token;
      state.isSignedIn = isSignedIn;
    },
    logoutUser(state) {
      return { isSignedIn: false };
    },
  },
});

export const userTitleInitial = (state) => state.auth.userTitle;
export const emailFromFirstPage = (state) => state.auth.userEmail;
export const pwFromFirstPage = (state) => state.auth.userPw;
export const userIsSignedIn = (state) => state.auth.isSignedIn;
export const accessToken = (state) => state.auth.token;
export const {
  userFirstPageRegistration,
  loginUser,
  signupUser,
  forgotPassword,
  resetPassword,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
