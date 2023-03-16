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
import useResetPassword from "hooks/data/onboarding/useResetPassword";
import { Loadersmall } from "components/loader-component/loader";
import AuthSideBarComponent from "../authSidebar";

function ResetPasswordComponent() {
  const navigate = useNavigate();
  const { token } = useParams();

  const { data, isLoading, error, mutate: resetPassword } = useResetPassword();

  const [disableBtn, setBtnDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Forgot Password";

    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    if (data) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [data]);

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
      resetPassword({ token, password: values.newPassword });
    },

    validate: (values) => {
      const errors = {};
      const passwordRegex = new RegExp(
        "^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
      );
      const validPassword = passwordRegex.test(values.newPassword);

      const isValid = validPassword && values.newPassword === values.password2;

      if (isValid) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }

      if (!values.newPassword && formik.touched.newPassword) {
        errors.newPassword = "Required";
      }
      if (validPassword === false && formik.touched.newPassword) {
        errors.newPassword =
          "*Please enter a password of atleast 8 characters with an uppercase, lowercase, numeric or special character. ";
      }

      if (values.newPassword !== values.password2) {
        errors.password2 = "*Your passwords do not match. Please try again";
      }

      if (!values.password2 && formik.touched.password2) {
        errors.password2 = "Required";
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
                {formik.touched.password2 && formik.errors.password2 ? (
                  <div className="text-red-400 text-sm font-normal">
                    {formik.errors.password2}
                  </div>
                ) : null}
              </label>
            </div>

            <button
              type="submit"
              disabled={disableBtn || isLoading}
              className="mt-6 bg-orange-200 rounded shadow text-white font-bold w-full disabled:opacity-50 py-3"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <Loadersmall />
                </div>
              ) : (
                "Create new password"
              )}
            </button>
            <p className="text-black text-center mt-4">
              Remember Password now?{" "}
              <Link to="/login" className="text-orange-200">
                Return to Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;
