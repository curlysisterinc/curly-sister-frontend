import { Loadersmall } from "components/loader-component/loader";
import useAddArticleToContent from "hooks/data/admin/useAddArticleToContent";
import useUploadPhoto from "hooks/data/admin/useUploadPhoto";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Node } from "slate";
import { runFunctionWhenSpaceOrEnterIsClicked, serializeToHTML } from "utils";
// import Html from "slate-html-serializer";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { convertToHTML } from "draft-convert";
import admin from "../../../../../api/admin";
// import { AuthRoutes } from "../../../../../constants";
import backArrow from "../../../../../assets/images/back-arrow.svg";
import uploadFile from "../../../../../assets/images/upload-file.png";
import { DraftContentEditor } from "../DraftContentEditor";

function NewArticle() {
  const navigate = useNavigate();
  // const inputRef = useRef();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [draftBtn, setDraftBtn] = useState(false);
  const [image, setImage] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [content, setContent] = useState([]);
  const [inputValues, setInputValues] = useState({
    title: "",
    source: "curly sister",
    file: null,
    status1: "published",
    status2: "unpublished",
    // content: "",
  });

  const {
    isLoading: isAddArticleToContentLoading,
    data: addArticleToContentData,
    isError: addArticleToContentError,
    refetch: addArticleToContentRefetch,
    mutate: addArticleToContent,
  } = useAddArticleToContent();

  const {
    isLoading: isPhotoUploadLoading,
    data: photoUploadData,
    isError: photoUploadError,
    refetch: photoUploadRefetch,
    mutate: uploadPhoto,
  } = useUploadPhoto();

  useEffect(() => {
    const initialValue = JSON.parse(localStorage.getItem("content")) || [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ];
    // console.log(initialValue);
    setContent(initialValue);
  }, []);

  useEffect(() => {
    if (photoUploadData) {
      addArticleToContent({
        ...inputValues,
        file: photoUploadData.data.file,
        content,
        // content,
      });
    }
  }, [photoUploadData]);

  useEffect(() => {
    const ac = new AbortController();
    if (addArticleToContentData) {
      localStorage.removeItem("content");
      navigate(`/learn/article/${addArticleToContentData.data.data._id}`);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [addArticleToContentData]);

  // Define a serializing function that takes a value and returns a string.
  const serialize = (value) => {
    return (
      value
        // Return the string content of each paragraph in the value's children.
        .map((n) => Node.string(n))
        // Join them all with line breaks denoting paragraphs.
        .join("\n")
    );
  };

  const handlePublishArticle = (e, status) => {
    e.preventDefault();

    const newContent = JSON.parse(localStorage.getItem("content"));
    const convertedHtmlText = convertToHTML(convertFromRaw(newContent));
    setContent(convertedHtmlText);
    setInputValues({ ...inputValues, status });
    const formData = new FormData();
    formData.append("file", inputValues.file);
    uploadPhoto(formData);
  };

  const disableButton = Object.values(inputValues).some((item) => item === "");

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValues({ ...inputValues, [e.target.name]: value });
  };

  const handleSlateChange = (value) => {
    // const content = JSON.stringify(value.toJSON());
    const newValue = JSON.stringify(value);
    localStorage.setItem("content", newValue);
    setContent(newValue);
    // console.log(value);
    // setInputValues({ ...inputValues, content });
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setFilePreview(null);
    }
  }, [image]);

  return (
    <div className="max-w-screen-2xl w-full flex m-auto">
      <div className="bg-white px-10 py-8 pt-20 md:pt-12 w-full">
        <div className=" ">
          <button
            type="button"
            className="flex items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img className="mr-2" src={backArrow} alt="back arrow" />
            Go Back
          </button>
          <form autoComplete="off" className="w-full max-w-640 m-auto">
            <div className=" flex justify-between items-center">
              <div className="text-22 text-gray-400 font-BeatriceSemiBold">
                Article
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={(e) => handlePublishArticle(e, "unpublish")}
                  disabled={disableButton}
                  className="text-sm mr-5 font-BeatriceSemiBold rounded-full bg-gray-50 border border-gray-250 py-2 px-8 text-gray-400 disabled:opacity-40"
                >
                  {(isAddArticleToContentLoading || isPhotoUploadLoading) &&
                  inputValues.status === "unpublish" ? (
                    <Loadersmall />
                  ) : (
                    "Save"
                  )}
                </button>

                <button
                  type="button"
                  disabled={disableButton}
                  onClick={(e) => handlePublishArticle(e, "published")}
                  // onClick={handlePublishArticle}
                  className="text-sm font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white disabled:opacity-40"
                >
                  {(isAddArticleToContentLoading || isPhotoUploadLoading) &&
                  inputValues.status === "published" ? (
                    <Loadersmall />
                  ) : (
                    "Publish"
                  )}
                </button>
              </div>
            </div>

            <hr className="mb-5 mt-5 border-b border-gray-600  mx-auto" />
            <div className="mx-auto w-full mt-8">
              <div className="mt-5">
                <label
                  className="block text-gray-400 text-sm font-medium mt-5"
                  htmlFor="title"
                >
                  Title
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full py-4 px-3 text-gray-400 placeholder-gray-700 text-sm placeholder:text-sm leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter a title for this article here"
                    name="title"
                    label="title"
                    id="title"
                    value={inputValues.title}
                    onChange={handleChange}
                  />
                </label>

                <label
                  htmlFor="source"
                  className="block text-gray-400 text-sm font-medium mt-5"
                >
                  By
                  <select
                    id="source"
                    name="source"
                    className="w-full block mt-3 text-sm border border-gray-800 rounded-lg py-4 px-3"
                    value={inputValues.source}
                    onChange={handleChange}
                  >
                    <option value="curly sister">Curly Sister</option>
                    <option value="others">Others</option>
                  </select>
                </label>

                <div className="mt-5 text-gray-400 text-sm font-medium">
                  <p>Cover photo</p>
                  <div className="mt-3">
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file) {
                          setImage(file);
                          setInputValues({ ...inputValues, file });
                        } else {
                          setImage(null);
                        }
                      }}
                      className="opacity-0 absolute h-16 w-120  border cursor-pointer z-50"
                    />
                    {filePreview == null ? (
                      <img src={uploadFile} className="h-16 w-120" alt="" />
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) =>
                          runFunctionWhenSpaceOrEnterIsClicked(e, () => {
                            setImage(null);
                          })
                        }
                        onClick={() => {
                          setImage(null);
                        }}
                      >
                        <img
                          src={filePreview}
                          className="h-16 w-120 object-cover"
                          alt="preview"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <p>Content</p>
                  <DraftContentEditor />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewArticle;
