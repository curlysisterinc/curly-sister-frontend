/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import admin from "../../../../../api/admin";
import SideBarComponent from "../../../../sidebar";
import backArrow from "../../../../../assets/images/back-arrow.svg";
import NewVideoCategory from "./newVideoCategory";
import learn from "../../../../../api/learn";
import { AuthRoutes } from "../../../../../constants";

function EditVideo() {
  const navigate = useNavigate();
  const [draftBtn, setDraftBtn] = useState(false);
  const [options, setOptions] = useState([]);
  // const [status, setStatus] = useState([]);
  const { token } = useParams();
  const [getVideos, setGetVideos] = useState({});

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  // const [status, setStatus] = useState("published");
  const [videoInputs, setVideoInputs] = useState({
    link: "",
    category: "",
    title: "",
    description: "",
    status: "",
    source: "",
    videoId: "",
  });

  const handleChange = (event) => {
    setVideoInputs({ ...videoInputs, [event.target.name]: event.target.value });
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

    learn
      .GetOneVideo(token)
      .then((response) => {
        setGetVideos(response.data.data);
        setVideoInputs({
          ...videoInputs,
          link: response.data.data.link,
          title: response.data.data.title,
          description: response.data.data.description,
          source: response.data.data.source,
          videoId: response.data.data._id,
          status: "published",
        });
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    admin.GetVideoCategory().then((result) => {
      setOptions(result.data.data);
    });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "CurlySisters • Edit Video";
    const isValid =
      videoInputs.link.trim().length ||
      videoInputs.category.trim().length ||
      videoInputs.title.trim().length ||
      videoInputs.description.trim().length ||
      videoInputs.source.trim().length;

    if (isValid) {
      setBtnDisabled(false);
      setDraftBtn(true);
    } else {
      setBtnDisabled(true);
      setDraftBtn(false);
    }
    return function cleanup() {
      ac.abort();
    };
  }, []);

  const handleSubmit = (e) => {
    // setVideoInputs(prevState=>{ prevState, status });

    e.preventDefault();
    admin
      .EditVideo(videoInputs)
      .then((response) => {
        if (response.status === 200) {
          const res = response.data;
          navigate(AuthRoutes.content);
        }
      })
      .catch((error) => {
        if (error) {
          console.error(error, videoInputs, "error");
        }
      });
  };

  const handleSaveDraft = (e) => {
    setVideoInputs({ ...videoInputs, status: "unpublished" });

    e.preventDefault();

    admin
      .AddVideoToContent(videoInputs)
      .then((response) => {
        if (response.status === 200) {
          const res = response.data;
        }
      })
      .catch((error) => {
        if (error) {
          console.error(error, videoInputs, "error");
        }
      });
  };

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="bg-white px-10 py-8 pt-20 md:pt-12 w-full">
        <div className="flex items-start ">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img className="mr-2" src={backArrow} alt="back arrow" />
            Go Back
          </div>
          <form autoComplete="off" className="ml-28 w-4/6 ">
            <div className=" flex justify-between items-center">
              <div className="text-22 text-gray-400 font-BeatriceSemiBold">
                Video
              </div>
              <div className="flex">
                {draftBtn && (
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="text-sm mr-5 font-BeatriceSemiBold rounded-full bg-gray-50 border border-gray-250 py-2 px-8 text-gray-400"
                  >
                    Draft saved
                  </button>
                )}
                <button
                  type="button"
                  disabled={btnDisabled}
                  onClick={handleSubmit}
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
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 text-sm placeholder:text-sm leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter a title for this video here"
                    name="title"
                    id="title"
                    value={videoInputs.title}
                    onChange={handleChange}
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
                      name="category"
                      className="w-full block mt-3 text-sm border border-gray-800 rounded-lg py-4 px-3"
                      value={videoInputs.category}
                      onChange={handleChange}
                    >
                      {options.map((option) => {
                        return (
                          <option
                            key={option._id}
                            value={option._id}
                            name={option.name}
                          >
                            {option.name}
                          </option>
                        );
                      })}
                    </select>
                  </label>{" "}
                  <label
                    htmlFor="source"
                    className="block text-gray-400 text-sm font-medium w-1/2"
                  >
                    By
                    <select
                      id="source"
                      name="source"
                      className="w-full block mt-3 text-sm border border-gray-800 rounded-lg py-4 px-3"
                      value={videoInputs.source}
                      onChange={handleChange}
                    >
                      <option value="Super Admin" name="super-admin">
                        Super Admin
                      </option>
                      <option value="Master Stylist" name="master-stylist">
                        Master Stylist
                      </option>
                      <option value="Stylist" name="stylist">
                        Stylist
                      </option>
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
                          id="embedLink"
                          defaultChecked
                        />
                      </label>
                    </div>
                  </div>
                  <hr className=" border-gray-800 w-full mt-4" />
                  <div className="px-5 py-5">
                    {/* {radioStatus === 1 ? <div>hello</div> : null} */}

                    <label htmlFor="link">
                      <input
                        className="shadow-sm appearance-none border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 text-sm placeholder:text-sm leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter a link here eg. YouTube, Vimeo, Wistia, etc."
                        type="text"
                        name="link"
                        id="link"
                        value={videoInputs.link}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <label
                  className="block text-gray-400 text-sm font-semibold mt-8"
                  htmlFor="description"
                >
                  Add a description for this video (optional)
                  <textarea
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="textarea"
                    placeholder="Enter a description for this service"
                    name="description"
                    id="description"
                    value={videoInputs.description}
                    onChange={handleChange}
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

export default EditVideo;
