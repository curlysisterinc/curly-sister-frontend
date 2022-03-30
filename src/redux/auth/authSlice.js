/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  isSignedIn: false,
  userEmail: undefined,
  userPw: undefined,
  userTitle: undefined,
};

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
      const { token, isSignedIn } = action.payload;

      state.token = token;
      state.isSignedIn = isSignedIn;
    },
    signupUser(state, action) {
      const { token, isSignedIn } = action.payload;

      state.token = token;
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
} = authSlice.actions;

export default authSlice.reducer;
