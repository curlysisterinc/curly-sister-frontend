/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import AuthModalComponent from "../authModal";
import onboarding from "../api/onBoarding";
import { forgotPassword } from "../../redux/auth/authSlice";
import { AuthRoutes } from "../../constants";
import AuthSideBarComponent from "../authSidebar";
import authHandler from "../../authHandler";
import resetSuccess from "../../assets/images/reset-success.svg";
import forgotPwdError from "../../assets/images/forgot-pwd-error.svg";

function ForgotPasswordComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [disableBtn, setBtnDisabled] = useState(true);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Forgot Password";

    return function cleanup() {
      ac.abort();
    };
  }, []);

  // handle modal close
  const hideModal = () => {
    setEmailSuccess(false);
    setEmailFailure(false);
  };

  /** handles Forgot Password */
  // const handleForgotPassword = (e) => {
  //   e.preventDefault();
  //   setBtnIsLoading(true);
  //   onboarding
  //     .ForgotPassword(userEmail)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setEmailSuccess(true);
  //       }
  //     })
  //     .catch((error) => {
  //       setBtnIsLoading(false);
  //       if (error.response.data.error) {
  //         setErrorMessage(error.response.data.message, setWarning(true));
  //       }
  //       setTimeout(() => {
  //         setWarning(false);
  //       }, 5000);
  //     });
  // };

  const formik = useFormik({
    initialValues: {
      userEmail: "",
    },
    onSubmit: (values) => {
      onboarding
        .ForgotPassword(values.userEmail)
        .then((response) => {
          if (response.status === 200) {
            setEmailSuccess(true);
            const res = response.data;
            // eslint-disable-next-line no-console
            // JWT DECODE SETUP
            const accessToken = res.access_token;
            const refreshToken = res.refresh_token;
            Cookies.set("accessToken", accessToken);
            authHandler.handle(refreshToken);
            // const accessToken = res.access_token;
            // authHandler.handle(accessToken);
            dispatch(
              forgotPassword({
                token: accessToken,
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
      const isValid = values.userEmail.trim().length;

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

      return errors;
    },
  });

  return (
    <div className="max-w-screen-2xl w-full flex flex-col lg:flex-row  m-auto border border-gray-50">
      <AuthSideBarComponent signin="back" />
      <div className="lg:ml-96 p-5  sm:p-10 lg:p-28 bg-white">
        <div className="w-full lg:w-3/4 ">
          <h3 className="text-2xl font-bold text-black">Forgot Password?</h3>
          <p className="text-gray-300 mt-3">
            Enter the email address associated with your account and we will
            send you a link to reset your password.
          </p>
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

            <button
              type="submit"
              disabled={disableBtn}
              className="mt-6 bg-orange-200 rounded shadow text-white font-bold w-full disabled:opacity-50 py-3"
            >
              {btnIsLoading ? (
                <div className="flex justify-center">loading...</div>
              ) : (
                "Send link"
              )}
            </button>
            <p className="text-black text-center mt-4">
              Remember Password now?{" "}
              <Link to="/login" className="text-orange-200">
                Return to Sign In
              </Link>
            </p>
          </form>
          {emailSuccess && (
            <AuthModalComponent handleClose={hideModal}>
              <>
                <h2 className="text-2xl lg:text-4xl font-bold mb-5">
                  Welcome to the Community
                </h2>
                <img src={resetSuccess} alt="successful sign in" />
                <p className="text-gray-150 mt-8">
                  A reset link has been sent to the email address
                </p>
                <button
                  className="bg-orange-200 mt-4 rounded shadow text-white font-bold w-full py-3"
                  type="button"
                  onClick={() => navigate(AuthRoutes.home)}
                >
                  Continue
                </button>
              </>
            </AuthModalComponent>
          )}

          {emailFailure && (
            <AuthModalComponent handleClose={hideModal}>
              <h2>Ooops! Something went wrong</h2>
              <img src={forgotPwdError} alt="failed sign in" />
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

export default ForgotPasswordComponent;
