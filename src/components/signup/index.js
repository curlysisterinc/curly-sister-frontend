/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import AuthModalComponent from "../authModal";
import AuthSideBarComponent from "../authSidebar";
import authHandler from "../../authHandler";
import { NonAuthRoutes } from "../../constants";
import { signupUser } from "../../redux/auth/authSlice";
import onboarding from "../../api/onBoarding";
import googleIcon from "../../assets/images/google-icon.svg";
import facebookIcon from "../../assets/images/facebook-icon.svg";
import signedInImg from "../../assets/images/signed-in-img.svg";
import failedSignin from "../../assets/images/failed-signin.svg";

function SignupComponent() {
  // const authenticated = authHandler.get();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Log In";
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
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
      userEmail: "",
      agree: false,
    },
    onSubmit: (values) => {
      onboarding
        .SignUp(
          values.userEmail,
          values.password,
          values.firstName,
          values.lastName
        )
        .then((response) => {
          if (response.status === 200) {
            setEmailSuccess(true);
            // const res = response;
            // // eslint-disable-next-line no-console
            // console.log("handle signup", res);
            // // eslint-disable-next-line no-underscore-dangle
            // authHandler.setUserInfo(res.data);

            // const accessToken = res.access_token;
            // authHandler.handle(accessToken);
            dispatch(
              signupUser({
                isSignedIn: true,
              })
            );
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
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
        values.firstName.trim().length &&
        values.lastName.trim().length &&
        values.userEmail.trim().length &&
        values.password.trim().length &&
        values.password2.trim().length &&
        values.agree;

      if (isValid) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
      if (!values.firstName) {
        errors.firstName = "*Please enter your first name";
      }
      if (!values.lastName) {
        errors.lastName = "*Please enter your last name";
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

      if (!values.password2) {
        errors.password2 = "Required";
      }
      if (values.password !== values.password2) {
        errors.password2 = "*Your passwords do not match. Please try again";
      }

      return errors;
    },
  });
  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   setBtnIsLoading(true);
  //   if (password === confirmPassword) {
  //     onboarding
  //       .SignUp(userEmail, password, name)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setEmailSuccess(true);
  //           const res = response.data;
  //           // eslint-disable-next-line no-console
  //           console.log("handle signup", res);
  //           // JWT DECODE SETUP
  //           const accessToken = res.access_token;
  //           const refreshToken = res.refresh_token;
  //           Cookies.set("accessToken", accessToken);
  //           authHandler.handle(refreshToken);
  //           // const accessToken = res.access_token;
  //           // authHandler.handle(accessToken);
  //           dispatch(
  //             signupUser({
  //               token: accessToken,
  //               isSignedIn: true,
  //             })
  //           );
  //         }
  //       })
  //       .catch((error) => {
  //         if (error.response.data.message) {
  //           setEmailSuccess(false);
  //           setEmailFailure(true);
  //           setErrorMessage(error.response.data.message, setWarning(true));
  //           setBtnIsLoading(false);
  //         }
  //         setTimeout(() => {
  //           setWarning(false);
  //         }, 5000);
  //       });
  //   }
  // };
  return (
    <div className="max-w-screen-2xl w-full flex flex-col lg:flex-row m-auto border border-gray-50">
      <AuthSideBarComponent />
      <div className="lg:ml-96 p-5  sm:p-10 lg:p-28 bg-white ">
        <div className="w-full lg:w-3/4  ">
          <h3 className="text-lg lg:text-2xl font-bold text-black mb-3">
            Join curly sister
          </h3>
          <p className="text-gray-300">
            Get access to pro videos, articles, free awesome material & your
            questions answered on the Curly Sister community.
          </p>

          <form className="mt-10" onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="firstName"
              >
                FirstName
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  value={formik.values.firstName}
                  placeholder="Enter First Name"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              {formik.errors.firstName && formik.touched.firstName ? (
                <div className="text-red-400 text-sm font-normal">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="lastName"
              >
                LastName
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  value={formik.values.lastName}
                  placeholder="Enter Last Name"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              {formik.errors.lastName && formik.touched.lastName ? (
                <div className="text-red-400 text-sm font-normal">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="email"
              >
                Email Address
                <input
                  className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.userEmail}
                  name="userEmail"
                  id="userEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  placeholder="Enter Email Address"
                />
              </label>
              {formik.errors.userEmail && formik.touched.userEmail ? (
                <div className="text-red-400 text-sm font-normal">
                  {formik.errors.userEmail}
                </div>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="password"
              >
                Password
                <div className="flex justify-end relative">
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    placeholder="Enter Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Password"
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
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-400 text-sm font-normal">
                    {formik.errors.password}
                  </div>
                ) : null}
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="password"
              >
                Confirm Password
                <div className="flex justify-end relative">
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password2"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password2}
                    placeholder="Enter strong password"
                    name="password2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                {formik.touched.password2 && formik.errors.password2 ? (
                  <div className="text-red-400 text-sm font-normal">
                    {formik.errors.password2}
                  </div>
                ) : null}
              </label>
            </div>
            <div>
              <label className=" block text-black" htmlFor="check-agree">
                <input
                  id="agree"
                  className="mr-2 leading-tight"
                  type="checkbox"
                  name="agree"
                  onChange={formik.handleChange}
                />
                <span className="text-sm">
                  By ticking this checkbox, you agree to being added to our
                  mailing list
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={btnDisabled}
              className="mt-6 bg-orange-200 disabled:opacity-50 rounded shadow text-white font-bold w-full py-3"
            >
              {btnIsLoading ? (
                <div className="flex justify-center">loading...</div>
              ) : (
                "Continue"
              )}
            </button>
            <div className="flex justify-center mt-5 text-sm text-gray-150">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-200 ml-2">
                {" "}
                Log In
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
                className=" bg-white w-full md:mr-3 lg:w-1/2 border p-4 border-gray-500 rounded shadow text-black font-bold px-8 py-3 flex items-center justify-center"
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
            <p className="mt-5 text-sm text-gray-150">
              By creating an account, you agree to Curly Sister’s{" "}
              <Link to="/terms-and-privacy" className="text-orange-200">
                Terms of Use
              </Link>{" "}
              and
              <Link to="/terms-and-privacy" className="text-orange-200">
                Privacy Policy
              </Link>{" "}
              .
            </p>
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
                  className="bg-orange-200 rounded shadow text-white font-bold w-full py-3"
                  type="button"
                  onClick={() => navigate(NonAuthRoutes.login)}
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
                Try Subscribing Again
              </button>
            </AuthModalComponent>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupComponent;