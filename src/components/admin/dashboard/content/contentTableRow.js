import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../../../api/admin";
import { ContentBody } from "./ContentItem";

function ContentTableRow({
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
        setAllContent(allContent.filter((content) => content._id !== id));
      })
      .catch((error) => {});
  };

  const handleDeleteArticle = (id) => {
    admin
      .DeleteArticleById(id)
      .then((response) => {
        setGetArticles(getArticles.filter((article) => article._id !== id));
      })
      .catch((error) => {});
  };
  const handleDeleteVideo = (id) => {
    admin
      .DeleteVideoById(id)
      .then((response) => {
        setGetVideos(getVideos.filter((video) => video._id !== id));
        // setAllContent()
      })
      .catch((error) => {});
  };
  return (
    <>
      {typeValue === "all types" && (
        <ContentBody
          data={allContent}
          selectedId={selectedId}
          onCheck={onCheck}
          handleDeleteContent={handleDeleteContent}
        />
      )}
      {typeValue === "video" && (
        <ContentBody
          data={getVideos}
          selectedId={selectedId}
          onCheck={onCheck}
          handleDeleteContent={handleDeleteContent}
        />
      )}

      {typeValue === "article" && (
        <ContentBody
          data={getArticles}
          selectedId={selectedId}
          onCheck={onCheck}
          handleDeleteContent={handleDeleteContent}
        />
      )}
    </>
  );
}

export default ContentTableRow;
