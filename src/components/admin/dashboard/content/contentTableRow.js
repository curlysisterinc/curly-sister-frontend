/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-var */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import clsx from "clsx";
import { AuthRoutes } from "../../../../constants";
import grayIndicator from "../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../assets/images/green-indicator.svg";
// import kebabIcon from "../../../../assets/images/kebab.svg";
// import trashIcon from "../../../../assets/images/trash.svg";
// import activateIcon from "../../../../assets/images/activate.svg";
// import editIcon from "../../../../assets/images/edit.svg";
// import publishIcon from "../../../../assets/images/publish.svg";
import colorHairVideo from "../../../../assets/images/color-hair-video.png";
import moment from "moment";
import admin from "../../../../api/admin";
import ReactPlayer from "react-player";
import ContentDropDown from "../../../customdropdown/dashboard/content/contentitem";
import { BsFillPlayFill } from "react-icons/bs";

function ContentRow({
  allContent,
  setAllContent,
  selectedId,
  setSelectedId,
  typeValue,
  getVideos,
  setGetVideos,
  setGetArticles,
  getArticles,
  setCallToAction,
}) {
  const navigate = useNavigate();
  const onCheck = (e, id) => {
    if (e.target.checked) {
      setCallToAction(true);
      setSelectedId((prev) => [...prev, id]);
    } else {
      setCallToAction(false);
      setSelectedId((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleDeleteContent = (id) => {
    admin
      .DeleteContent(id)
      .then((response) => {
        console.log(response.data);
        setAllContent(allContent.filter((content) => content._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteArticle = (id) => {
    admin
      .DeleteArticleById(id)
      .then((response) => {
        console.log(response.data);
        setGetArticles(getArticles.filter((article) => article._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteVideo = (id) => {
    admin
      .DeleteVideoById(id)
      .then((response) => {
        console.log(response.data);
        setGetVideos(getVideos.filter((video) => video._id !== id));
        // setAllContent()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {typeValue === "all types" &&
        allContent?.map((content) => {
          return (
            <tr key={content._id} className="bg-white border-b border-gray-600">
              <th scope="row">
                <input
                  type="checkbox"
                  value={content.title}
                  className="ml-3"
                  id={content._id}
                  checked={selectedId.includes(content._id)}
                  onChange={(e) => onCheck(e, content._id)}
                />
              </th>
              <td
                className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer"
                onClick={() => navigate(`/learn/article/${content._id}`)}
              >
                <img
                  className="w-12 h-12 rounded-lg"
                  src={content.image ? content.image : colorHairVideo}
                  alt=""
                />
                <div className="ml-2">
                  <p className="text-sm text-gray-400 mb-1">{content.title}</p>
                  <p className="text-xs text-gray-200 ">
                    By {content.created_by.firstName}{" "}
                    {content.created_by.lastName}
                  </p>
                </div>
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.type}
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {moment(content.createdAt).format("DD MM YYYY")}
              </td>{" "}
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.views}
              </td>{" "}
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.likes.length}
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.saves}
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.status === "PUBLISHED" ? (
                  <img src={greenIndicator} alt="" />
                ) : (
                  <img src={grayIndicator} alt="" />
                )}
              </td>
              <td className="px-2 py-y relative cursor-pointer ">
                <ContentDropDown
                  deleteAction={handleDeleteContent}
                  editAction={() => navigate(AuthRoutes.addArticle)}
                  publishAction={() => console.log("publish")}
                  status={content.status}
                />
              </td>
            </tr>
          );
        })}
      {typeValue === "video" &&
        getVideos?.map((content) => {
          return (
            <tr key={content._id} className="bg-white border-b border-gray-600">
              <th scope="row">
                <input
                  type="checkbox"
                  value={content.title}
                  className="ml-3"
                  id={content._id}
                  checked={selectedId.includes(content._id)}
                  onChange={(e) => onCheck(e, content._id)}
                />
              </th>
              <td
                className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer"
                onClick={() => navigate(AuthRoutes.addcontent)}
              >
                <div className="rounded-lg overflow-hidden">
                  <ReactPlayer
                    url={content.link}
                    onStart={() => {
                      navigate(`/learn/video/${content._id}`);
                    }}
                    light
                    controls={false}
                    playIcon={<BsFillPlayFill color="#fff" size={16} />}
                    width="64px"
                    height="44px"
                  />
                </div>
                <div className="ml-2">
                  <p className="text-sm text-gray-400 mb-1">{content.title}</p>
                  <p className="text-xs text-gray-200 ">By {content.source}</p>
                </div>
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                video
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {moment(content.createdAt).format("DD MM YYYY")}
              </td>{" "}
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.views}
              </td>{" "}
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.likes.length}
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                10
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.status === "PUBLISHED" ? (
                  <img src={greenIndicator} alt="" />
                ) : (
                  <img src={grayIndicator} alt="" />
                )}
              </td>
              <td className="px-2 py-y relative cursor-pointer ">
                <ContentDropDown
                  deleteAction={handleDeleteVideo}
                  editAction={() => navigate(`/edit-video/${content._id}`)}
                  publishAction={() => console.log("publish  video")}
                  status={content.status}
                />
              </td>
            </tr>
          );
        })}
      {typeValue === "article" &&
        getArticles?.map((content) => {
          return (
            <tr key={content._id} className="bg-white border-b border-gray-600">
              <th scope="row">
                <input
                  type="checkbox"
                  value={content.title}
                  className="ml-3"
                  id={content._id}
                  checked={selectedId.includes(content._id)}
                  onChange={(e) => onCheck(e, content._id)}
                />
              </th>
              <td
                className="px-6 py-4 whitespace-nowrap flex items-center cursor-pointer"
                onClick={() => navigate(`/learn/article/${content._id}`)}
              >
                <img
                  className="h-11 w-16"
                  src={content.image}
                  alt="profile pix"
                />
                <div className="ml-2">
                  <p className="text-sm text-gray-400 mb-1">{content.title}</p>
                  <p className="text-xs text-gray-200 ">By {content.source}</p>
                </div>
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                article
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {moment(content.createdAt).format("DD MM YYYY")}
              </td>{" "}
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.views}
              </td>{" "}
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.likes.length}
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                10
              </td>
              <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
                {content.status === "PUBLISHED" ? (
                  <img src={greenIndicator} alt="" />
                ) : (
                  <img src={grayIndicator} alt="" />
                )}
              </td>
              <td className="px-2 py-y relative cursor-pointer ">
                <ContentDropDown
                  deleteAction={handleDeleteArticle}
                  editAction={() => navigate(`/edit-article/${content._id}`)}
                  publishAction={() => console.log("green")}
                  status={content.status}
                />
              </td>
            </tr>
          );
        })}
    </>
  );
}

export default ContentRow;
