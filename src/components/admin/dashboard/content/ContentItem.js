import Image from "components/image";
import ContentOptionDropDown from "components/user/learn/ContentOptionDropDown";
import useUpdateArticle from "hooks/data/admin/useUpdateArticle";
import useUpdateVideo from "hooks/data/admin/useUpdateVideo";
import useDeleteArticle from "hooks/data/learn/useDeleteArticle";
import useDeleteVideo from "hooks/data/learn/useDeleteVideo";
import * as dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../../../api/admin";
import grayIndicator from "../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../assets/images/green-indicator.svg";
import { AuthRoutes } from "../../../../constants";
import ContentDropDown from "../../../customdropdown/dashboard/content/contentitem";

export function ContentItem({ content, selectedId, onCheck }) {
  const navigate = useNavigate();

  const {
    isLoading: isDeleteArticleLoading,
    data: deleteArticleData,
    mutate: deleteArticle,
  } = useDeleteArticle(content._id);

  const {
    isLoading: isDeleteVideoLoading,
    data: deleteVideoData,
    mutate: deleteVideo,
  } = useDeleteVideo(content._id);

  const {
    isLoading: isUpdateVideoLoading,
    data: updatedVideoData,
    error: updateVideoError,
    mutate: updateVideo,
  } = useUpdateVideo(content._id);

  const {
    isLoading: isUpdateArticleLoading,
    data: updatedArticleData,
    error: updateArticleError,
    mutate: updateArticle,
  } = useUpdateArticle(content._id);

  const isLoading =
    isDeleteArticleLoading ||
    isDeleteVideoLoading ||
    isUpdateVideoLoading ||
    isUpdateArticleLoading;

  const handleChangeStatus = (e) => {
    e.stopPropagation();
    e.stopPropagation();

    const newStatus =
      content.status === "PUBLISHED" ? "unpublished" : "published";
    const newData = { ...content, status: newStatus };

    if (content.content_type === "article") {
      updateArticle(newData);
    } else {
      updateVideo(newData);
    }
  };

  const handleDeleteContent = (e) => {
    e.stopPropagation();
    e.stopPropagation();

    if (content.content_type === "article") {
      deleteArticle();
    } else {
      deleteVideo();
    }
  };

  const handleClickRow = (e) => {
    if (!e.target.type) {
      navigate(`/learn/${content.content_type}/${content._id}`);
    }
  };

  const handleOpenEditPage = () => {
    navigate(`/edit-${content.content_type}/${content._id}`);
  };

  return (
    <tr
      key={content._id}
      className="bg-white border-b border-gray-600 cursor-pointer"
      onClick={handleClickRow}
    >
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
      <td className="px-6 py-4 whitespace-nowrap flex items-center ">
        <div className="w-12">
          <Image
            className="w-12 h-12 rounded-lg object-cover"
            src={content.image ? content.image : content?.thumbnail}
            alt=""
          />
        </div>
        <div className="ml-2">
          <p className="text-sm text-gray-400 mb-1">{content.title}</p>
          <p className="text-xs text-gray-200 ">
            By {content?.created_by?.firstName} {content?.created_by?.lastName}
          </p>
        </div>
      </td>
      <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
        {content.content_type}
      </td>
      <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
        {dayjs(content.createdAt).format("DD MMM YY")}
      </td>{" "}
      <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
        {content.number_of_views}
      </td>{" "}
      <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
        {content.likes.length}
      </td>
      <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
        {content.number_of_saves}
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
          editAction={handleOpenEditPage}
          publishAction={handleChangeStatus}
          status={content.status}
          isLoading={isLoading}
          handleDeleteContent={handleDeleteContent}
        />
      </td>
    </tr>
  );
}

export const ContentBody = ({ data, selectedId, onCheck }) => {
  return data?.map((content) => {
    return (
      <ContentItem
        content={content}
        selectedId={selectedId}
        onCheck={onCheck}
        key={content._id}
      />
    );
  });
};
