/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AuthModalComponent from "../authModal";
import onboarding from "../../api/onBoarding";
import { AuthRoutes } from "../../constants";
import AuthSideBarComponent from "../authSidebar";
import authHandler from "../../authHandler";
import resetSuccess from "../../assets/images/reset-success.svg";
import forgotPwdError from "../../assets/images/forgot-pwd-error.svg";

function ResetPasswordComponent() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [disableBtn, setBtnDisabled] = useState(true);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  /** handles show Password text */
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      password2: "",
    },
    onSubmit: (values) => {
      onboarding
        .ResetPassword(token, values.newPassword)
        .then((response) => {
          if (response.status === 200) {
            setEmailSuccess(true);
            // eslint-disable-next-line no-console
            // const accessToken = res.access_token;
            // authHandler.handle(accessToken);
          }
        })
        .catch((error) => {
          setEmailFailure(true);

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
      const validPassword = passwordRegex.test(values.newPassword);
      const isValid =
        values.newPassword.trim().length && values.password2.trim().length;

      if (isValid) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }

      if (!values.newPassword) {
        errors.newPassword = "Required";
      }
      if (validPassword === true) {
        errors.newPassword =
          "*Please enter a password of atleast 8 characters with an uppercase, lowercase, numeric or special character. ";
      }

      if (values.newPassword !== values.password2) {
        errors.password2 = "*Your passwords do not match. Please try again";
      }

      if (!values.password2) {
        errors.password2 = "Required";
      }

      return errors;
    },
  });

  return (
    <div className="max-w-screen-2xl w-full flex flex-col lg:flex-row  m-auto border h-full border-gray-50">
      <AuthSideBarComponent signin="back" />
      <div className="lg:ml-96 p-5  sm:p-10 lg:p-28 bg-white w-full">
        <div className="w-full lg:w-3/4  ">
          <h3 className="text-lg lg:text-2xl font-bold text-black">
            Reset Your Password
          </h3>
          <p className="text-gray-300 mt-3">
            Create a new password for your account.
          </p>
          <form className="mt-10" onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="newPassword"
              >
                New Password
                <div className="flex justify-end relative">
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.newPassword}
                    placeholder="Enter strong password"
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="New password"
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
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="text-red-400 text-sm font-normal">
                    {formik.errors.newPassword}
                  </div>
                ) : null}
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold "
                htmlFor="password2"
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
                  Password Reset Successful
                </h2>
                <img src={resetSuccess} alt="successful sign in" />
                <p className="modal-feedback mt-8">
                  Your password has been sucessfully updated
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
              <h2 className="text-2xl lg:text-4xl font-bold mb-5">
                Password Reset Failed
              </h2>
              <img src={forgotPwdError} alt="failed sign in" />
              <p className="modal-feedback mt-8">
                Please try again, we could not change your password.
              </p>
              <button
                className="bg-orange-200 rounded shadow mt-4 text-white font-bold w-full py-3"
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

export default ResetPasswordComponent;
