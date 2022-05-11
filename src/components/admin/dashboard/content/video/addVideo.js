/* eslint-disable import/no-cycle */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AuthRoutes } from "../../../../../constants";
import admin from "../../../../../api/admin";
import SideBarComponent from "../../../../sidebar/sidebar";
import backArrow from "../../../../../assets/images/back-arrow.svg";
import NewVideoCategory from "./newVideoCategory";

function NewVideo() {
  const navigate = useNavigate();
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [radioStatus, setRadioStatus] = useState(2);
  const radioHandler = (status) => {
    setRadioStatus(status);
  };
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleModalOpen = () => {
    setOpenCategoryModal(true);
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  const handleModalClose = () => {
    setOpenCategoryModal(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const ac = new AbortController();
    document.title = "CurlySisters • Create Video";

    return function cleanup() {
      ac.abort();
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      link: "",
      category: "",
      title: "",
      description: "",
      by: "",
    },
    onSubmit: (values) => {
      admin
        .AddVideoToContent(values)
        .then((response) => {
          if (response.status === 200) {
            const res = response.data;
            console.log(res);
          }
        })
        .catch((error) => {
          if (error) {
            console.error(error, values, "error");
          }
        });
    },

    validate: (values) => {
      const isValid =
        values.title.trim().length ||
        values.category.trim().length ||
        values.description.trim().length ||
        values.by.trim().length;

      if (isValid) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    },
  });
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        <div className="flex items-start ">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(AuthRoutes.dashboard)}
          >
            <img className="mr-2" src={backArrow} alt="back arrow" />
            Go Back
          </div>
          <form
            autoComplete="off"
            className="ml-28 w-4/6 "
            onSubmit={formik.handleSubmit}
          >
            <div className=" flex justify-between items-center">
              <div className="text-22 text-gray-400 font-BeatriceSemiBold">
                Video
              </div>
              <div className="flex">
                <button
                  type="submit"
                  disabled={btnDisabled}
                  className="text-sm font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white disabled:opacity-40"
                >
                  Publish
                </button>
              </div>
            </div>

            <hr className="mb-5 mt-5 border-b border-gray-600  mx-auto" />
            <div className="mx-auto w-full mt-8">
              <div className="mt-5">
                <label
                  className="block text-gray-400 text-sm font-medium mt-8"
                  htmlFor="title"
                >
                  Title
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 text-sm placeholder:text-sm leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter a title for this video here"
                    name="title"
                    label="title"
                    id="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                </label>
                <div className="flex justify-between items-center space-x-5 mt-8">
                  <label
                    htmlFor="category"
                    className="block text-gray-400 text-sm font-medium w-1/2"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400">Category</p>
                      <p
                        className="text-purple-100 cursor-pointer"
                        onClick={handleModalOpen}
                      >
                        New category
                      </p>
                    </div>
                    <select
                      id="category"
                      className="w-full block mt-3 text-sm border border-gray-800 rounded-lg py-4 px-3"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                    >
                      <option value="Braiding">Braiding</option>
                      <option value="Weaving">Weaving</option>
                      <option value="Installation">Installation</option>
                    </select>
                  </label>{" "}
                  <label
                    htmlFor="by"
                    className="block text-gray-400 text-sm font-medium w-1/2"
                  >
                    By
                    <select
                      id="by"
                      className="w-full block mt-3 text-sm border border-gray-800 rounded-lg py-4 px-3"
                      value={formik.values.by}
                      onChange={formik.handleChange}
                    >
                      <option value="Curly sister">Curly Sister</option>
                      <option value="Brazillian Weave">Brazillian Weave</option>
                      <option value="Afro Taste">Afro Taste</option>
                    </select>
                  </label>
                </div>
                <div className="border border-gray-800 rounded-xl mt-8">
                  <div className="flex justify-start space-x-10 px-5 pt-5 ">
                    {/* <div className="form-check form-check-inline">
                      <label
                        className="form-check-label inline-block text-gray-400"
                        htmlFor="videoFile1"
                      >
                        Use video file
                        <input
                          className="appearance-none rounded-full h-4 w-4 border border-gray-400 bg-white checked:bg-purple-100 checked:border-purple-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="radio"
                          name="uploadVideo"
                          id="videoFile"
                          value="videoFile"
                          checked={radioStatus === 1}
                          onClick={(e) => radioHandler(1)}
                        />
                      </label>
                    </div> */}
                    <div className="form-check form-check-inline">
                      <label
                        className="form-check-label inline-block text-gray-400"
                        htmlFor="embedLink"
                      >
                        Enter embed link
                        <input
                          className="appearance-none rounded-full h-4 w-4 border border-gray-400 bg-white checked:bg-purple-100 checked:border-purple-100 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="radio"
                          name="uploadVideo"
                          id="embedLink"
                          value={formik.values.link}
                          checked={radioStatus === 2}
                          onChange={formik.handleChange}
                          onClick={(e) => radioHandler(2)}
                        />
                      </label>
                    </div>
                  </div>
                  <hr className=" border-gray-800 w-full mt-4" />
                  <div className="px-5 py-5">
                    {/* {radioStatus === 1 ? <div>hello</div> : null} */}
                    {radioStatus === 2 ? (
                      <input
                        className="shadow-sm appearance-none border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 text-sm placeholder:text-sm leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter a link here eg. YouTube, Vimeo, Wistia, etc."
                        type="text"
                        name="link"
                        id="link"
                        value={formik.values.link}
                        onChange={formik.handleChange}
                      />
                    ) : null}
                  </div>
                </div>
                <label
                  className="block text-gray-400 text-sm font-semibold mt-8"
                  htmlFor="description"
                >
                  Add a description for this video (optional)
                  <textarea
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="textarea"
                    placeholder="Enter a description for this service"
                    name="description"
                    id="description"
                    values={formik.values.description}
                    onChange={formik.handleChange}
                    rows="3"
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* new category modal */}
      {openCategoryModal ? (
        <NewVideoCategory handleClose={handleModalClose} />
      ) : null}
    </div>
  );
}

export default NewVideo;
