/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import useAddAdmin from "hooks/data/admin/useAddAdmin";
import { Loadersmall } from "components/loader-component/loader";
import { useToasts } from "react-toast-notifications";
import closeModalBtn from "../../../../../assets/images/cancel.svg";
import trashIcon from "../../../../../assets/images/trash.svg";
import admin from "../../../../../api/admin";

function InviteAdminModal({ handleClose }) {
  const [emailValue, setEmailValue] = useState("");
  const { addToast } = useToasts();

  const { isLoading, data: adminData, mutateAsync: addAdmin } = useAddAdmin();

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Invite Admins";

    // if (authenticated === null) {
    //   navigate(NonAuthRoutes.login);
    // } else {
    //   navigate(AuthRoutes.home);
    // }

    return function cleanup() {
      ac.abort();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendInvitationsToAdmins();
  };

  const sendInvitationsToAdmins = async () => {
    const emails = emailValue.split(",");
    try {
      const result = await Promise.allSettled(
        emails.map((email) => {
          return addAdmin(email.trim());
        })
      );

      const successResult =
        result.length &&
        result
          .filter((item) => item.status === "fulfilled")
          .forEach((success) => {
            const { message } = success.value.data;
            addToast(message, {
              appearance: "success",
              autoDismiss: true,
            });
          });

      const errorResult =
        result.length &&
        result
          .filter((item) => item.status === "rejected")
          .forEach((rejection) => {
            const message = `${
              JSON.parse(rejection.reason.config.data).email
            } : ${rejection.reason.response.data.message}`;
            addToast(message, {
              appearance: "error",
              autoDismiss: 6000,
            });
          });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 left-0 h-full overflow-y-auto z-200 bg-black-100 w-full flex  justify-end items-center"
    >
      <div
        className="flex items-start h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="mt-10 mr-10 bg-white rounded-full p-2"
          onClick={handleClose}
          src={closeModalBtn}
          alt="close button"
        />
        <div className="bg-white min-h-screen  p-10">
          <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
            Invite admins
          </h4>
          <p className="text-gray-200 text-base">
            Enter the email addresses to invite below
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label htmlFor="email" className="">
                <textarea
                  className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full text-sm py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="textarea"
                  placeholder="Enter email address, separate multiple emails with a comma."
                  name="email"
                  label="email"
                  id="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  rows="3"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold flex items-center justify-center"
            >
              {isLoading ? <Loadersmall /> : "Send invites"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InviteAdminModal;
