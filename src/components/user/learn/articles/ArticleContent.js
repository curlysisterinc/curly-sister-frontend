import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthRoutes } from "constants";
import learn from "api/learn";
import DOMPurify from "dompurify";
import {
  AiTwotoneDislike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import moment from "moment";
import Image from "components/image";
import { runFunctionWhenSpaceOrEnterIsClicked } from "utils";

import Loader from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import useDeleteArticle from "hooks/data/learn/useDeleteArticle";
import useGetOneArticle from "hooks/data/learn/useGetOneArticle";
import useUpdateArticle from "hooks/data/admin/useUpdateArticle";
import useGetCommentForArticle from "hooks/data/learn/useGetCommentForArticle";
import imagineHairVideo from "../../../../assets/images/imagine-video.png";
import gradientAvatar from "../../../../assets/images/gradient-avatar.svg";
import reply from "../../../../assets/images/reply.svg";
import ellipses from "../../../../assets/images/dark-ellipses.svg";
import backArrow from "../../../../assets/images/back-arrow.svg";
import trash from "../../../../assets/images/trash.svg";
import edit from "../../../../assets/images/edit.svg";
import report from "../../../../assets/images/report.svg";
import ContentOptionDropDown from "../ContentOptionDropDown";
import ArticleCommentSection from "./ArticleCommentSection";

function ArticleContent() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [questionDropdown, setQuestionDropdown] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [getComments, setGetComments] = useState([]);
  const [replyValue, setReplyValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [getArticles, setGetArticles] = useState({});

  const {
    isLoading: isDeleteArticleLoading,
    data: deleteArticleData,
    mutate: deleteArticle,
  } = useDeleteArticle(token);

  const {
    isLoading: isArticleLoading,
    data: articleData,
    error: articleError,
    refetch: refetchArticle,
  } = useGetOneArticle(token);

  const {
    isLoading: isCommentForArticleLoading,
    data: commentForArticleData,
    error: commentForArticleError,
    refetch: refetchCommentForArticle,
  } = useGetCommentForArticle(token);

  useEffect(() => {
    if (deleteArticleData) {
      navigate("/dashboard/content");
    }
  }, [deleteArticleData]);

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  useEffect(() => {
    if (articleData) {
      setGetArticles(articleData.data.data);
    }
  }, [articleData]);

  useEffect(() => {
    if (commentForArticleData) {
      setGetComments(commentForArticleData.data.data);
    }
  }, [commentForArticleData]);

  const handleArticleReactionLike = () => {
    setIsLiked(true);
    if (isLiked) {
      setIsLiked(false);
    }

    learn
      .ReactToArticle(token, "like")
      .then((response) => {})
      .catch((error) => {});
  };

  const handleArticleReactionDisLike = () => {
    setIsDisLiked(true);
    if (isDisLiked) {
      setIsDisLiked(false);
    }

    learn
      .ReactToArticle(token, "unlike")
      .then((response) => {})
      .catch((error) => {});
  };

  const handleSaveArticle = () => {
    learn
      .SaveArticle({ articleId: token })
      .then((response) => {
        // setGetArticles([...getArticles, number_of_saves: response.data.data.])
      })
      .catch((error) => {});
  };

  const handleDeleteSavedArticle = () => {
    learn
      .DeleteSavedArticle({ id: token })
      .then((response) => {})
      .catch((error) => {});
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="bg-white px-10 py-8 pt-20 md:pt-12 w-full max-w-1111 m-auto">
      <button
        type="button"
        onClick={() => navigate("/dashboard/content")}
        className="flex items-center mb-10 cursor-pointer text-sm text-gray-300"
      >
        <img src={backArrow} alt="go back" className="mr-4" />
        Go Back
      </button>

      {isArticleLoading && <Loader />}

      {articleError && <ErrorDisplayComponent refetch={refetchArticle} />}

      {articleData && (
        <>
          {" "}
          <div className="flex justify-between space-x-5 items-start">
            <div className="w-9/12">
              <h3 className="text-gray-400 font-BeatriceSemiBold text-2xl mb-6">
                {getArticles.title}
              </h3>
              <div className="flex items-center mb-4 relative">
                <p className="text-sm text-gray-200 flex items-center">
                  {getArticles?.created_by?.firstName}{" "}
                  {getArticles?.created_by?.lastName}
                  {" . "}
                  {moment(getArticles?.createdAt).format("DD MMM YYYY")}
                </p>
                <ContentOptionDropDown
                  content={getArticles}
                  openEditContentModal={() =>
                    navigate(`/edit-article/${getArticles._id}`)
                  }
                  deleteContent={deleteArticle}
                  isContentDeleting={isDeleteArticleLoading}
                />
              </div>
            </div>
            <div className="flex space-x-7">
              <div className="flex flex-row items-center space-x-2">
                <button
                  type="button"
                  className="rounded-full p-2 bg-gray-200"
                  onClick={handleArticleReactionLike}
                >
                  {!isLiked ? (
                    <AiOutlineLike color="white" />
                  ) : (
                    <AiTwotoneLike color="white" />
                  )}
                </button>
                <p>{getArticles?.likes?.length}</p>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <button
                  type="button"
                  className="rounded-full p-2 bg-gray-200"
                  onClick={handleArticleReactionDisLike}
                >
                  {!isDisLiked ? (
                    <AiOutlineDislike color="white" />
                  ) : (
                    <AiTwotoneDislike color="white" />
                  )}
                </button>
                <p>{getArticles?.unlikes?.length}</p>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <button
                  type="button"
                  className="rounded-full p-2 bg-gray-200"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  {!isSaved ? (
                    <MdOutlineBookmarkBorder
                      onClick={handleSaveArticle}
                      color="white"
                    />
                  ) : (
                    <MdBookmark
                      onClick={handleDeleteSavedArticle}
                      color="white"
                    />
                  )}
                </button>
                <p>{getArticles?.number_of_saves}</p>
              </div>
            </div>
          </div>
          <div className="w-full h-auto mt-6 rounded-2xl overflow-hidden">
            <Image
              className="w-full h-full max-h-400 object-cover rounded-2xl"
              src={getArticles?.image}
              alt=""
            />
          </div>
          <div className="mt-8 text-gray-400">
            <div
              className="blog-preview"
              dangerouslySetInnerHTML={createMarkup(getArticles?.content)}
            />
            <div className="flex justify-between space-x-8 items-start">
              <div className="w-8/12">
                <ArticleCommentSection />
              </div>

              <div className="">
                Related Videos
                <div
                  onClick={() => navigate(AuthRoutes.videoContent)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    runFunctionWhenSpaceOrEnterIsClicked(e, () => {
                      navigate(AuthRoutes.videoContent);
                    })
                  }
                >
                  <img src={imagineHairVideo} alt="" className="mt-4" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ArticleContent;
