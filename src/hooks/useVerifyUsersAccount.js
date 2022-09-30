/* eslint-disable camelcase */
import { Loadersmall } from "components/loader-component/loader";
import React, { useCallback, useState } from "react";
import { useAuthContext } from "redux/auth";
import useResendVerificationMail from "./data/onboarding/useResendVerificationMail";

export default function () {
  const {
    state: { isSignedIn, email_verified, email },
  } = useAuthContext();
  console.log(" useAuthContext();", useAuthContext());
  const {
    data,
    isLoading,
    error,
    mutate: resendVerificationMail,
  } = useResendVerificationMail();

  const handleResendVerificationEmail = () => {
    resendVerificationMail(email);
  };

  const display = useCallback(() => {
    return (
      isSignedIn &&
      !email_verified && (
        <div className="w-full bg-gray-400 py-3 px-6 flex flex-wrap items-center justify-center">
          <p className="text-white justify-center mr-5">
            Click the mail sent to you to verify your account or resend a
            verification mail so that you can have full access to the platform
          </p>

          <button
            type="button"
            className="bg-orange-600 text-white py-2 px-6 rounded-full mt-6 min-w"
            onClick={handleResendVerificationEmail}
          >
            {isLoading ? <Loadersmall /> : "Resend verification mail"}
          </button>
        </div>
      )
    );
  }, [email_verified, isLoading]);

  return { display };
}
