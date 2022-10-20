import useDeleteArticle from "hooks/data/learn/useDeleteArticle";
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

  return (
    <>
      {typeValue === "all types" && (
        <ContentBody
          data={allContent}
          selectedId={selectedId}
          onCheck={onCheck}
        />
      )}
      {typeValue === "video" && (
        <ContentBody
          data={getVideos}
          selectedId={selectedId}
          onCheck={onCheck}
        />
      )}

      {typeValue === "article" && (
        <ContentBody
          data={getArticles}
          selectedId={selectedId}
          onCheck={onCheck}
        />
      )}
    </>
  );
}

export default ContentTableRow;
