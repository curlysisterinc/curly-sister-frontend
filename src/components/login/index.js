/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import AuthSideBarComponent from "../authSidebar";
import googleIcon from "../../assets/images/google-icon.svg";
import facebookIcon from "../../assets/images/facebook-icon.svg";
import useLoginUser from "../../hooks/data/onboarding/useLoginUser";

function LoginComponent() {
  const { mutate, isLoading: btnIsLoading, error: Err, data } = useLoginUser();

  const [showPassword, setShowPassword] = useState(false);
  const [disableBtn, setBtnDisabled] = useState(true);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      password: "",
      userEmail: "",
    },
    onSubmit: (values) => {
      mutate({ ...values });
    },

    validate: (values) => {
      const errors = {};
      const passwordRegex = new RegExp(
        "^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
      );
      const validPassword = passwordRegex.test(values.password);
      const isValid =
        !!values.userEmail.trim().length &&
        !!values.password.trim().length &&
        validPassword;

      if (isValid) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }

      if (!values.userEmail) {
        errors.userEmail = "Required";
      }
      if (
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          values.userEmail
        )
      ) {
        errors.userEmail = "*Please enter a valid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (!validPassword) {
        errors.password =
          "*Your pssword must be at least \n 8 characters long with an uppercase, lowercase, numeric or special character. ";
      }

      return errors;
    },
  });

  return (
    <div
      className=" w-full flex flex-col md:flex-row m-auto border-r border-gray-50"
      id="appLayout"
    >
      <AuthSideBarComponent signin="back" />
      <div className="md:ml-60 xl:ml-80 w-full content p-5 pt-10">
        <div className="max-w-640 m-auto">
          <div className="w-full pt-10">
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
                        size={25}
                        className="absolute top-6 cursor-pointer right-3"
                        onClick={handleShowPassword}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        size={25}
                        className="absolute top-6 cursor-pointer right-3"
                        onClick={handleShowPassword}
                      />
                    )}
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <div className="text-red-400 text-sm font-normal">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </label>
              </div>
              <div className="flex justify-end text-orange-200 text-sm mt-0 font-semibold">
                <Link to="/forgot-password" className="">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={btnIsLoading || disableBtn}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
