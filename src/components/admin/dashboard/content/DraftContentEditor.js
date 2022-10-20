import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import admin from "api/admin";
import { useLocation, useParams } from "react-router-dom";
import * as Icons from "./assets";

export function DraftContentEditor({ content }) {
  const { UploadPhoto } = admin;
  const [value, setValue] = useState(null);
  const token = useParams()?.token ?? null;
  const location = useLocation();
  const [contentState, setContentState] = useState(null);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    if (content && location.pathname.includes("edit-article")) {
      setContentState(content);
      setIsContentLoaded(true);
    }
    if (!content && location.pathname.includes("create-article")) {
      const newContent = JSON.parse(localStorage.getItem("content"));
      setContentState(newContent);
      setIsContentLoaded(true);
    }
  }, [content]);

  const uploadCallback = (file, callback) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await UploadPhoto(formData);
        setValue("thumbnail", res.data.file);
        resolve({ data: { link: res.data.file } });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChangeContent = (e) => {
    localStorage.setItem("content", JSON.stringify(e));
    setContentState(e);
  };

  return (
    isContentLoaded && (
      <Editor
        defaultContentState={contentState}
        onContentStateChange={handleChangeContent}
        editorClassName="max-h-350 min-h-200 overflow-auto  px-4"
        wrapperClassName="border border-gray-600 rounded-lg shadow-s01"
        toolbarClassName="border-none"
        toolbarStyle={{
          border: "none",
          borderBottom: "1px solid #EEEDEF",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
        toolbar={{
          options: ["inline", "blockType", "fontSize", "list", "link", "image"],
          blockType: {
            options: [
              "Normal",
              "H1",
              "H2",
              "H3",
              "H4",
              "H5",
              "H6",
              "Blockquote",
            ],
          },
          image: {
            icon: Icons.image,
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback,
            previewImage: true,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: "auto",
              width: "auto",
            },
          },
          link: {
            inDropdown: true,
            showOpenOptionOnHover: true,
            defaultTargetOption: "_self",
            options: ["link", "unlink"],
            link: { icon: Icons.link, className: undefined },
            linkCallback: undefined,
          },
          inline: {
            options: ["bold", "italic", "underline", "monospace"],
            bold: { icon: Icons.bold, className: "border-none border-0" },
            italic: { icon: Icons.italic, className: "demo-option-custom" },
            underline: {
              icon: Icons.underline,
              className: "demo-option-custom",
            },
            monospace: { icon: Icons.code, className: "demo-option-custom" },
          },
          list: {
            options: ["unordered", "ordered"],
            unordered: {
              icon: Icons.unordered,
              className: "demo-option-custom",
            },
            ordered: { icon: Icons.ordered, className: "demo-option-custom" },
          },
        }}
      />
    )
  );
}
