/* eslint-disable prefer-regex-literals */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import useForgotPassword from "hooks/data/onboarding/useForgotPassword";
import { Loadersmall } from "components/loader-component/loader";
import AuthSideBarComponent from "../authSidebar";

function ForgotPasswordComponent() {
  const {
    data,
    isLoading,
    error,
    mutate: forgotPassword,
  } = useForgotPassword();

  const [disableBtn, setBtnDisabled] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Forgot Password";

    return function cleanup() {
      ac.abort();
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      userEmail: "",
    },
    onSubmit: (values) => {
      forgotPassword(values.userEmail);
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
    <div
      className=" w-full flex flex-col md:flex-row m-auto border-r border-gray-50"
      id="appLayout"
    >
      <AuthSideBarComponent signin="back" />
      <div className="md:ml-60 xl:ml-80 w-full content p-5 pt-10">
        <div className="max-w-640 m-auto">
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
              disabled={disableBtn || isLoading}
              className="mt-6 bg-orange-200 rounded shadow text-white font-bold w-full disabled:opacity-50 py-3"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <Loadersmall />
                </div>
              ) : (
                "Get reset link"
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

export default ForgotPasswordComponent;
