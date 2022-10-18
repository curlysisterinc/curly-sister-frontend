import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../../../api/admin";
import grayIndicator from "../../../../assets/images/gray-indicator.svg";
import greenIndicator from "../../../../assets/images/green-indicator.svg";
import { AuthRoutes } from "../../../../constants";
import ContentDropDown from "../../../customdropdown/dashboard/content/contentitem";

export function ContentItem({
  content,
  selectedId,
  onCheck,
  handleDeleteContent,
}) {
  const navigate = useNavigate();

  return (
    <tr
      key={content._id}
      className="bg-white border-b border-gray-600 cursor-pointer"
      onClick={() => navigate(`/learn/${content.content_type}/${content._id}`)}
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
        <img
          className="w-12 h-12 rounded-lg object-cover"
          src={content.image ? content.image : content?.thumbnail}
          alt=""
        />
        <div className="ml-2">
          <p className="text-sm text-gray-400 mb-1">{content.title}</p>
          <p className="text-xs text-gray-200 ">
            By {content.created_by.firstName} {content.created_by.lastName}
          </p>
        </div>
      </td>
      <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
        {content.content_type}
      </td>
      <td className="text-sm text-gray-400  px-3 py-4 whitespace-nowrap">
        {moment(content.createdAt).format("DD MMM YY")}
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
          deleteAction={handleDeleteContent}
          editAction={() => navigate(AuthRoutes.addArticle)}
          publishAction={() => console.log("publish")}
          status={content.status}
        />
      </td>
    </tr>
  );
}

export const ContentBody = ({
  data,
  selectedId,
  onCheck,
  handleDeleteContent,
}) => {
  return data?.map((content) => {
    return (
      <ContentItem
        content={content}
        selectedId={selectedId}
        onCheck={onCheck}
        handleDeleteContent={handleDeleteContent}
      />
    );
  });
};
