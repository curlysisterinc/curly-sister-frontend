/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthRoutes } from "../../../constants";
import learn from "../../../api/learn";
import imagineHairVideo from "../../../assets/images/imagine-video.png";
import SideBarComponent from "../../sidebar";
import gradientAvatar from "../../../assets/images/gradient-avatar.svg";
import like from "../../../assets/images/like.svg";
// import wideArticle from "../../../assets/images/wide-article.png";
import dislike from "../../../assets/images/dislike.svg";
import reply from "../../../assets/images/reply.svg";
import ellipses from "../../../assets/images/dark-ellipses.svg";
import bgLike from "../../../assets/images/bg-like.svg";
import bgDislike from "../../../assets/images/bg-dislike.svg";
import bgBookmark from "../../../assets/images/bg-bookmark.svg";
import backArrow from "../../../assets/images/back-arrow.svg";
import trash from "../../../assets/images/trash.svg";
import edit from "../../../assets/images/edit.svg";
import pin from "../../../assets/images/pin.svg";
import report from "../../../assets/images/report.svg";
import {
  AiTwotoneDislike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

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
  useEffect(() => {
    const ac = new AbortController();

    console.log(token);
    learn
      .GetOneArticle(token)
      .then((response) => {
        console.log(response.data, "article");
        setGetArticles(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "article error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);
  useEffect(() => {
    const ac = new AbortController();

    learn
      .GetCommentForArticle(token)
      .then((response) => {
        console.log(response.data, "comment");
        setGetComments(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "comment");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    learn
      .CommentOnArticle(token, commentValue)
      .then((response) => {
        console.log(response);
        setGetComments([response.data.data.comment, ...getComments]);

        setCommentValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitReply = (e) => {
    e.preventDefault();

    learn
      .ReplyCommentOnArticle(token, replyValue)
      .then((response) => {
        console.log(response);
        setReplyValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleArticleReactionLike = () => {
    setIsLiked(true);
    if (isLiked) {
      setIsLiked(false);
    }

    learn
      .ReactToArticle(token, "like")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleArticleReactionDisLike = () => {
    setIsDisLiked(true);
    if (isDisLiked) {
      setIsDisLiked(false);
    }

    learn
      .ReactToArticle(token, "unlike")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveArticle = () => {
    learn
      .SaveArticle({ articleId: token })
      .then((response) => {
        console.log(response);
        toast("Article saved!");
        // setGetArticles([...getArticles, number_of_saves: response.data.data.])
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handleDeleteSavedArticle = () => {
    learn
      .DeleteSavedArticle({ id: token })
      .then((response) => {
        console.log(response);
        toast("Article unsaved!");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  return (
    <>
      <div className="ml-80 bg-white px-10 pt-14 w-full">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center mb-10 cursor-pointer text-sm text-gray-300"
        >
          <img src={backArrow} alt="go back" className="mr-4" />
          Go Back
        </div>
        <div className="flex justify-between space-x-5 items-start">
          <div className="w-9/12">
            <h3 className="text-gray-400 font-BeatriceSemiBold text-2xl mb-6">
              {getArticles.title}
            </h3>
            <p className="text-sm text-gray-200 flex items-center">
              {getArticles?.created_by?.firstName}{" "}
              {getArticles?.created_by?.lastName}{" "}
              {moment(getArticles?.createdAt).format("DD MM YYYY")}
              <span
                className="ml-5 relative"
                onClick={() => setQuestionDropdown(!questionDropdown)}
              >
                <img className="cursor-pointer" src={ellipses} alt="" />
                {questionDropdown ? (
                  <div className="absolute top-4 left-0 bg-white w-44 rounded-2xl shadow-md p-3">
                    <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm my-3">
                      <img src={edit} alt="pin" className="mr-3" />
                      <p>Edit</p>
                    </div>
                    <div className="flex items-center justify-start cursor-pointer text-red-400 text-sm">
                      <img src={trash} alt="pin" className="mr-3" />
                      <p>Delete</p>
                    </div>
                  </div>
                ) : null}
              </span>
            </p>
          </div>
          <div className="flex space-x-7">
            <div className="flex flex-row items-center space-x-2">
              <span
                className="rounded-full p-2 bg-gray-200"
                onClick={handleArticleReactionLike}
              >
                {!isLiked ? (
                  <AiOutlineLike color="white" />
                ) : (
                  <AiTwotoneLike color="white" />
                )}
              </span>
              <p>{getArticles?.likes?.length}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <span
                className="rounded-full p-2 bg-gray-200"
                onClick={handleArticleReactionDisLike}
              >
                {!isDisLiked ? (
                  <AiOutlineDislike color="white" />
                ) : (
                  <AiTwotoneDislike color="white" />
                )}
              </span>
              <p>{getArticles?.unlikes?.length}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <span
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
              </span>
              <p>{getArticles?.number_of_saves}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-auto mt-6">
          <img
            className="w-full h-full object-cover"
            src={getArticles?.image}
            alt=""
          />
        </div>
        <div className="mt-8 text-gray-400">
          <p className="text-gray-400 text-base leading-6 mb-6">
            This is a sample article posted on the platform. It sounded an
            excellent plan, no doubt, and very neatly and simply arranged; the
            only difficulty was, that she had not the smallest idea how to set
            about it.
          </p>
          <h4 className="text-lg text-gray-400 font-BeatriceSemiBold mb-6">
            Steps to follow
          </h4>
          <p className="text-gray-400 text-base leading-6 mb-6">
            And while she was peering about anxiously among the trees, a little
            sharp bark just over her head made her look up in a great hurry.
          </p>{" "}
          <p className="text-gray-400 text-base leading-6 mb-6">
            Hardly knowing what she did, she picked up a little bit of stick,
            and held it out to the puppy; whereupon the puppy jumped into the
            air off all its feet at once, with a yelp of delight, and rushed at
            the stick, and made believe to worry it.
          </p>{" "}
          <p className="text-gray-400 text-base leading-6">
            Then Alice dodged behind a great thistle, to keep herself from being
            run over; and the moment she appeared on the other side, the puppy
            made another rush at the stick, and tumbled head over heels in its
            hurry to get hold of it; then Alice, thinking it was very like
            having a game of play with a cart-horse.
          </p>
          <hr className="w-full border border-gray-250 my-10" />
          <div className="flex justify-between space-x-8 items-start">
            <div className="w-8/12">
              <div className="flex items-center">
                <img src={gradientAvatar} alt="" className="h-10 w-10" />
                <div className="relative w-full">
                  <input
                    type="text"
                    value={commentValue}
                    name="comment"
                    id="comment"
                    onChange={(e) => setCommentValue(e.target.value)}
                    placeholder="Add a comment"
                    className="ml-5 w-full border h-46 rounded-xl border-gray-800 3 placeholder:text-gray-400 text-gray-400 text-sm"
                  />
                  {commentValue.length ? (
                    <button
                      type="button"
                      onClick={handleSubmitComment}
                      className="disabled:text-gray-300 border-0 outline-0 text-sm text-purple-100 cursor-pointer absolute right-0 top-3"
                    >
                      post
                    </button>
                  ) : null}
                </div>
              </div>
              {getComments &&
                getComments.map((comment) => {
                  return (
                    <div className="mt-8">
                      <div className="flex items-start">
                        <img
                          className="h-10 w-10 mt-2"
                          src={gradientAvatar}
                          alt=""
                        />
                        <div className="ml-5 text-sm text-gray-400">
                          <div className="flex items-center">
                            <p className="mr-3">Serena Williams</p>
                            <span className="text-gray-200 text-xs ">
                              3 mins ago
                            </span>
                          </div>
                          <p className="mt-3 leading-6">{comment.comment}</p>
                          <div className="flex space-x-4 mt-4 items-center">
                            <div className="flex">
                              <span
                                className="mr-2 items-center"
                                onClick={() => setIsLiked(!isLiked)}
                              >
                                {!isLiked ? (
                                  <AiOutlineLike color="#8E8695" />
                                ) : (
                                  <AiTwotoneLike color="#8E8695" />
                                )}
                              </span>
                              <p>{comment.likes.length}</p>
                            </div>
                            <div className="flex items-center">
                              <span
                                className="mr-2"
                                onClick={() => setIsDisLiked(!isDisLiked)}
                              >
                                {!isDisLiked ? (
                                  <AiOutlineDislike color="#8E8695" />
                                ) : (
                                  <AiTwotoneDislike color="#8E8695" />
                                )}
                              </span>

                              <p>{comment.unlikes.length}</p>
                            </div>

                            <img
                              onClick={() => setOpenReply(!openReply)}
                              className="cursor-pointer"
                              src={reply}
                              alt=""
                            />
                            <span className="relative">
                              <img
                                onClick={() =>
                                  setReportDropdown(!reportDropdown)
                                }
                                className="cursor-pointer"
                                src={ellipses}
                                alt=""
                              />
                              {reportDropdown ? (
                                <div className="absolute top-4 left-0 bg-white w-44 rounded-2xl shadow-md p-3">
                                  <div className="flex items-center justify-start cursor-pointer text-gray-400 text-sm">
                                    <img
                                      src={report}
                                      alt="report"
                                      className="mr-3"
                                    />
                                    Report
                                  </div>
                                </div>
                              ) : null}
                            </span>
                            <span
                              onClick={() => setOpenReply(true)}
                              className="text-purple-100 cursor-pointer"
                            >
                              {comment.replies.length} replies
                            </span>
                          </div>
                          {openReply ? (
                            <div className="m-6 flex items-center">
                              <img
                                src={gradientAvatar}
                                alt=""
                                className="h-10 w-10"
                              />
                              <div className="relative w-full">
                                <input
                                  type="text"
                                  value={replyValue}
                                  name="comment"
                                  id="comment"
                                  onChange={(e) =>
                                    setReplyValue(e.target.value)
                                  }
                                  placeholder="Reply comment"
                                  className="ml-5 w-300 border h-46 rounded-xl border-gray-800 3 placeholder:text-gray-400 text-gray-400 text-sm"
                                />
                                {replyValue.length ? (
                                  <button
                                    type="button"
                                    onClick={handleSubmitReply}
                                    className="disabled:text-gray-300 border-0 outline-0 text-sm text-purple-100 cursor-pointer absolute right-0 top-3"
                                  >
                                    post
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="">
              Related Videos
              <img
                onClick={() => navigate(AuthRoutes.videoContent)}
                src={imagineHairVideo}
                alt=""
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ArticleContent;
