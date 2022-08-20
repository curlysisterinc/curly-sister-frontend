/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Node } from "slate";
import admin from "../../../../../api/admin";
// import { AuthRoutes } from "../../../../../constants";
import backArrow from "../../../../../assets/images/back-arrow.svg";
import uploadFile from "../../../../../assets/images/upload-file.png";
import SlateContent from "../slateContent";

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  // {
  //   type: "paragraph",
  //   children: [
  //     {
  //       text: "Since it's rich text, you can do things like turn a selection of text ",
  //     },
  //     { text: "bold", bold: true },
  //     {
  //       text: ", or add a semantically rendered block quote in the middle of the page, like this:",
  //     },
  //   ],
  // },
  // {
  //   type: "block-quote",
  //   children: [{ text: "A wise quote." }],
  // },
  // {
  //   type: "paragraph",
  //   children: [{ text: "Try it out for yourself!" }],
  // },
];

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

// Define a deserializing function that takes a string and returns a value.
const deserialize = (string) => {
  // Return a value array of children derived by splitting the string.
  return string.split("\n").map((line) => {
    return {
      children: [{ text: line }],
    };
  });
};

function NewArticle() {
  const navigate = useNavigate();
  // const inputRef = useRef();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [draftBtn, setDraftBtn] = useState(false);
  const [image, setImage] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [content, setContent] = useState(initialValue);
  const [inputValues, setInputValues] = useState({
    title: "",
    source: "curly sister",
    file: null,
    status1: "published",
    status2: "unpublished",
    // content: "",
  });
  // console.log(initialValue, "initial valus");

  const handlePublishArticle = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", inputValues.title);
    formData.append("file", inputValues.file);
    formData.append("source", inputValues.source);
    formData.append("status", inputValues.status1);
    formData.append("content", serialize(content));
    admin
      .AddArticleToContent(formData)
      .then((response) => {
        if (response.status === 200) {
          const res = response.data;
          console.log(res);
        }
      })
      .catch((error) => {
        if (error) {
          console.error(error, formData, "error");
        }
      });
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", inputValues.title);
    formData.append("file", inputValues.file);
    formData.append("source", inputValues.source);
    formData.append("status", inputValues.status2);
    admin
      .SaveArticleDraft(formData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const disableButton = () => {
    const isValid =
      inputValues.title.trim().length ||
      inputValues.source.trim().length ||
      filePreview !== null;

    if (isValid) {
      setBtnDisabled(false);
      setDraftBtn(true);
    } else {
      setBtnDisabled(true);
      setDraftBtn(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValues({ ...inputValues, [e.target.name]: value });
  };

  const handleSlateChange = (value) => {
    // const content = JSON.stringify(value.toJSON());
    setContent(value);
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

  useEffect(() => {
    disableButton();
  }, [inputValues]);

  return (
    <div className="ml-80 bg-white px-10 py-8 w-full">
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
              Article
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
                type="submit"
                onClick={handlePublishArticle}
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
                    className="opacity-0 absolute h-16 w-120  border cursor-pointer"
                  />
                  {filePreview == null ? (
                    <img src={uploadFile} className="h-16 w-120" alt="" />
                  ) : (
                    <img
                      src={filePreview}
                      onClick={() => {
                        setImage(null);
                      }}
                      className="h-16 w-120 object-cover"
                      alt="preview"
                    />
                  )}
                </div>
              </div>

              <div className="mt-5">
                <p>Content</p>
                <SlateContent value={content} onChange={handleSlateChange} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewArticle;
