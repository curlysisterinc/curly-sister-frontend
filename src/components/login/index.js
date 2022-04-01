/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
/* eslint-disable-next-line no-console */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import AuthModalComponent from "../authModal";
import AuthSideBarComponent from "../authSidebar";
import googleIcon from "../../assets/images/google-icon.svg";
import facebookIcon from "../../assets/images/facebook-icon.svg";
import authHandler from "../../authHandler";
import { AuthRoutes } from "../../constants";
import { loginUser } from "../../redux/auth/authSlice";
import onboarding from "../api/onBoarding";
import signedInImg from "../../assets/images/signed-in-img.svg";
import failedSignin from "../../assets/images/failed-signin.svg";

function LoginComponent() {
  // const authenticated = authHandler.get();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [disableBtn, setBtnDisabled] = useState(true);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Log In";

    // if (authenticated === null) {
    //   navigate(NonAuthRoutes.login);
    // } else {
    //   navigate(AuthRoutes.home);
    // }

    return function cleanup() {
      ac.abort();
    };
  }, []);

  /** handles show Password text */
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handle modal close
  const hideModal = () => {
    setEmailSuccess(false);
    setEmailFailure(false);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      userEmail: "",
    },
    onSubmit: (values) => {
      onboarding
        .LogIn(values.userEmail, values.password)
        .then((response) => {
          if (response.status === 200) {
            setEmailSuccess(true);
            const res = response.data;
            console.log(res);
            // eslint-disable-next-line no-underscore-dangle

            authHandler.setUserInfo(res.user);
            // JWT DECODE SETUP
            const accessToken = res.access_token;
            const refreshToken = res.refresh_token;
            Cookies.set("accessToken", accessToken);
            authHandler.handle(refreshToken);
            // const accessToken = res.access_token;
            // authHandler.handle(accessToken);
            dispatch(
              loginUser({
                token: accessToken,
                isSignedIn: true,
              })
            );
          }
        })
        .catch((error) => {
          if (error) {
            setEmailSuccess(false);
            setEmailFailure(true);
            setBtnIsLoading(false);
          }
        });
    },

    validate: (values) => {
      const errors = {};
      const passwordRegex = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/
      );
      const validPassword = passwordRegex.test(values.password);
      const isValid =
        values.userEmail.trim().length && values.password.trim().length;

      if (isValid) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }

      if (!values.userEmail) {
        errors.userEmail = "Required";
      } else if (
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          values.userEmail
        )
      ) {
        errors.userEmail = "*Please enter a valid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }
      if (validPassword === true) {
        errors.password =
          "*Please enter a password of atleast 8 characters with an uppercase, lowercase, numeric or special character. ";
      }

      return errors;
    },
  });

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setBtnIsLoading(true);
  //   onboarding
  //     .LogIn(userEmail, password)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const res = response.data;
  //         // eslint-disable-next-line no-console
  //         console.log("handleLogIn", res);
  //         // JWT DECODE SETUP
  //         const accessToken = res.access_token;
  //         const refreshToken = res.refresh_token;
  //         Cookies.set("accessToken", accessToken);
  //         authHandler.handle(refreshToken);
  //         // const accessToken = res.access_token;
  //         // authHandler.handle(accessToken);
  //         dispatch(
  //           loginUser({
  //             token: accessToken,
  //             isSignedIn: true,
  //           })
  //         );
  //         navigate(AuthRoutes.home);
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response.data.message) {
  //         setErrorMessage(error.response.data.message, setWarning(true));
  //         setBtnIsLoading(false);
  //       }
  //       setTimeout(() => {
  //         setWarning(false);
  //       }, 5000);
  //     });
  // };
  return (
    <div className="max-w-screen-2xl w-full flex flex-col lg:flex-row  m-auto border border-gray-50">
      <AuthSideBarComponent signin="back" />
      <div className="lg:ml-96 p-5  sm:p-10 lg:p-28 bg-white ">
        <div className="w-full lg:w-3/4 ">
          <h3 className="text-lg lg:text-2xl font-bold text-black">
            Sign in to continue to your account to continue with your
            experience.
          </h3>
          <form className="mt-10" onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="email"
              >
                Email Address
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  value={formik.values.userEmail}
                  placeholder="Enter email address"
                  name="userEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Email address"
                  id="userEmail"
                />
                {formik.errors.userEmail && formik.touched.userEmail ? (
                  <div className="text-red-400 text-sm font-normal">
                    {formik.errors.userEmail}
                  </div>
                ) : null}
              </label>
            </div>
            <div className="">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="password"
              >
                Password
                <div className="flex justify-end relative">
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    placeholder="Enter strong password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Password"
                    id="name"
                  />
                  {showPassword ? (
                    <AiOutlineEye
                      size={16}
                      className="absolute top-8 right-3"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      size={16}
                      className="absolute top-8 right-3"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </label>
            </div>
            <div className="flex justify-end text-orange-200 text-sm mt-0 font-semibold">
              <Link to="/forgot-password" className="">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={disableBtn}
              className="mt-6 bg-orange-200 rounded shadow text-white font-bold disabled:opacity-50 w-full py-3"
            >
              {btnIsLoading ? (
                <div className="flex justify-center">loading...</div>
              ) : (
                "Log In"
              )}
            </button>
            <div className="flex justify-center mt-5 text-sm text-gray-150">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-200 ml-2">
                {" "}
                Sign Up
              </Link>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="border border-gray-500 w-1/2" />
              <p className="mx-3">OR</p>
              <div className="border border-gray-500 w-1/2" />
            </div>
            <div className="mt-4 md:flex justify-between items-center">
              <button
                type="button"
                className=" bg-white w-full lg:mr-3 lg:w-1/2 border p-4 border-gray-500 rounded shadow text-black font-bold px-8 py-3 flex items-center justify-center"
              >
                <img className="mr-3" src={googleIcon} alt="google icon" />
                Sign in with google
              </button>
              <button
                type="button"
                className=" bg-blue-500 w-full mt-8 md:mt-0 md:ml-3 lg:w-1/2 border p-4 border-gray-500 rounded shadow text-white font-bold px-8  py-3 flex items-center justify-center"
              >
                <img className="mr-3" src={facebookIcon} alt="google icon" />
                Sign in with facebook
              </button>
            </div>
          </form>
          {emailSuccess && (
            <AuthModalComponent handleClose={hideModal}>
              <>
                <h2 className="text-2xl lg:text-4xl font-bold mb-5">
                  Welcome to the Community
                </h2>
                <img src={signedInImg} alt="successful sign in" />
                <p className="text-gray-150 mt-8">
                  You have successfully subscribed to Curly Sister.
                </p>
                <button
                  className="bg-orange-200 mt-4 rounded shadow text-white font-bold w-full py-3"
                  type="button"
                  onClick={() => navigate(AuthRoutes.home)}
                >
                  Continue with your experience
                </button>
              </>
            </AuthModalComponent>
          )}

          {emailFailure && (
            <AuthModalComponent handleClose={hideModal}>
              <h2>Ooops! Something went wrong</h2>
              <img src={failedSignin} alt="failed sign in" />
              <p className="text-gray-150">
                Looks like there is a problem, please try signing in again.
              </p>
              <button
                className="bg-orange-200 rounded shadow text-white font-bold w-full py-3"
                onClick={hideModal}
                type="button"
              >
                Try Again
              </button>
            </AuthModalComponent>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
