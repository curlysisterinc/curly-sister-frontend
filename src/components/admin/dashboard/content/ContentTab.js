/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Loader, { Loadersmall } from "components/loader-component/loader";
import ErrorDisplayComponent from "components/errorDisplayComponent";
import { queryClient } from "App";
import { useInView } from "react-intersection-observer";
import DeleteContentModal from "./deleteContentModal";
import trashIcon from "../../../../assets/images/trash.svg";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import searchIcon from "../../../../assets/images/search-normal-2.svg";
import ContentTableRow from "./contentTableRow";
import TypesContent from "../../../customdropdown/dashboard/types";
import Newcontent from "../../../customdropdown/dashboard/content/newcontent";
import useGetAllContents from "../../../../hooks/data/admin/useGetAllContents";
import useGetAllArticles from "../../../../hooks/data/admin/useGetAllArticles";
import useGetAllVideos from "../../../../hooks/data/admin/useGetAllVideos";

function ContentTab({ active }) {
  const [toggleActions, setToggleActions] = useState(false);
  const [typeValue, setTypeValue] = useState("all types");
  const [query, setQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [getVideos, setGetVideos] = useState([]);
  const [getArticles, setGetArticles] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [totalCount, setTotalCount] = useState({});
  const [callToAction, setCallToAction] = useState(false);

  const [ref, inView] = useInView();

  const {
    data: contentData,
    isLoading: isContentLoading,
    error: contentError,
    refetch: contentRefetch,
    isFetching: isContentFetching,
    fetchNextPage: fetchNextContentPage,
    hasNextPage: hasContentNextPage,
  } = useGetAllContents({ size: 10 });
  const {
    data: articlesData,
    isLoading: isArticlesLoading,
    error: articlesError,
    refetch: articlesRefetch,
    isFetching: isArticlesFetching,
    fetchNextPage: fetchNextArticlesPage,
    hasNextPage: hasArticlesNextPage,
  } = useGetAllArticles({ size: 10 });

  const {
    data: videosData,
    isLoading: isVideosLoading,
    error: videosErrror,
    refetch: videosRefetch,
    isFetching: isVideosFetching,
    fetchNextPage: fetchNextVideosPage,
    hasNextPage: hasVideosNextPage,
  } = useGetAllVideos({ size: 10 });

  useEffect(() => {
    if (articlesData) {
      const data = queryClient.getQueryData(["articles"]);
      if (data?.pages) {
        const currentData =
          data?.pages.map((item) => item.data.article).flatMap((a) => a) ?? [];
        setGetArticles(currentData ?? []);
        setTotalCount({
          ...totalCount,
          article: data?.pages[0].data.payload.totalCount,
        });
      }
    }
  }, [articlesData]);

  useEffect(() => {
    if (videosData) {
      const data = queryClient.getQueryData(["videos"]);
      if (data?.pages) {
        const currentData =
          data?.pages.map((item) => item.data.video).flatMap((a) => a) ?? [];
        setGetVideos(currentData);
        setTotalCount({
          ...totalCount,
          video: data?.pages[0].data.payload.totalCount,
        });
      }
    }
  }, [videosData]);

  useEffect(() => {
    if (contentData) {
      const data = queryClient.getQueryData(["content"]);
      if (data?.pages) {
        const currentData =
          data?.pages.map((item) => item.data.content).flatMap((a) => a) ?? [];
        setAllContent(currentData);
        setTotalCount({
          ...totalCount,
          allContent: data?.pages[0].data.payload.totalCount,
        });
      }
    }
  }, [contentData]);

  React.useEffect(() => {
    if (inView) {
      if (typeValue === "all types") fetchNextContentPage();
      if (typeValue === "article") fetchNextArticlesPage();
      if (typeValue === "video") fetchNextVideosPage();
    }
  }, [inView, typeValue]);

  const checkAll = (e) => {
    switch (typeValue) {
      case "all types":
        if (e.target.checked) {
          setSelectedId(allContent.map((content) => content._id));
          setCallToAction(true);
        } else {
          setSelectedId([]);
          setCallToAction(false);
        }
        break;
      case "article":
        if (e.target.checked) {
          setCallToAction(true);
          setSelectedId(getArticles.map((article) => article._id));
        } else {
          setSelectedId([]);
          setCallToAction(false);
        }
        break;
      case "video":
        if (e.target.checked) {
          setCallToAction(true);

          setSelectedId(getVideos.map((video) => video._id));
        } else {
          setCallToAction(false);

          setSelectedId([]);
        }
        break;

      default:
        break;
    }
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const refetchCurrentTab = () => {
    if (typeValue === "all types") contentRefetch();
    if (typeValue === "article") articlesRefetch();
    if (typeValue === "video") videosRefetch();
  };

  const isSuccess = articlesData && videosData && contentData;
  return (
    <>
      {/* tabs */}
      <div className="h-screen-170px mt-10">
        <div className="flex items-end justify-between">
          <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
            {typeValue === "all types" && "All Contents"}
            {typeValue === "article" && "All Articles"}
            {typeValue === "video" && "All Videos"}
            <span className="text-gray-300 ml-2 text-sm">
              {typeValue === "all types" &&
                `${allContent.length} out of ${totalCount.allContent}`}
              {typeValue === "article" &&
                `${getArticles.length} out of ${totalCount.article}`}
              {typeValue === "video" &&
                `${getVideos.length} out of ${totalCount.video}`}
            </span>
          </div>
          <div className="">
            {/* filters */}
            {callToAction ? (
              <button
                type="button"
                onClick={() => setToggleActions(!toggleActions)}
                className="cursor-pointer bg-white relative text-gray-400 border border-gray-250 h-10 font-BeatriceSemiBold text-sm flex justify-between items-center  rounded-full p-3"
              >
                Actions
                <img
                  className={clsx(
                    toggleActions && "transform rotate-180",
                    "ml-6"
                  )}
                  src={dropdownIcon}
                  alt=""
                />
                {toggleActions && (
                  <div className="absolute bg-white rounded-xl top-10 shadow w-full right-0">
                    <button
                      type="button"
                      onClick={openDeleteModal}
                      className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
                    >
                      <img className="mr-2" src={trashIcon} alt="" />
                      Delete
                    </button>
                  </div>
                )}
              </button>
            ) : (
              <div className="">
                <div className="flex justify-between items-center">
                  <div className="flex justify-between items-center">
                    {/* stylist type */}

                    <TypesContent
                      typeValue={typeValue}
                      setTypeValue={setTypeValue}
                    />

                    <div className="mr-2 w-140 border border-gray-800  rounded-full px-3 h-10 flex justify-center items-center">
                      More filters
                    </div>
                    <div className="mr-2 relative text-gray-600 focus-within:text-gray-400">
                      <span className="absolute inset-y-0 right-2 flex items-center pl-2">
                        <button
                          type="submit"
                          className="p-1 focus:outline-none focus:shadow-outline"
                        >
                          <img src={searchIcon} alt="" />
                        </button>
                      </span>
                      <input
                        type="text"
                        value={query}
                        name="query"
                        onChange={(e) => setQuery(e.target.value)}
                        className="py-2 w-140 text-sm text-gray-400 bg-white rounded-full pl-3 focus:outline-none focus:bg-white focus:text-gray-400"
                        placeholder="Search..."
                        autoComplete="off"
                      />
                    </div>

                    <Newcontent />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* table */}
        {isSuccess && (
          <div className="flex flex-col mt-4 ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="max-h-screen-250px overflow-auto shadow-s01 border border-gray-600 rounded-2xl">
                  <table className="min-w-full text-left rounded-2xl pb-40">
                    <thead className="bg-gray-50 uppercase text-sm text-gray-300 sticky z-50 -top-px">
                      <tr>
                        <th scope="col ">
                          <input
                            type="checkbox"
                            className="ml-3"
                            id="mastercheck"
                            onChange={checkAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="text-xs   px-3 py-4 text-gray-300"
                        >
                          title
                        </th>
                        <th
                          scope="col"
                          className="text-xs   px-3 py-4 text-gray-300"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="text-xs   px-3 py-4 text-gray-300"
                        >
                          created
                        </th>
                        <th
                          scope="col"
                          className="text-xs   px-3 py-4 text-gray-300"
                        >
                          views
                        </th>
                        <th
                          scope="col"
                          className="text-xs   px-3 py-4 text-gray-300"
                        >
                          likes
                        </th>
                        <th
                          scope="col"
                          className="text-xs   px-3 py-4 text-gray-300"
                        >
                          saves
                        </th>
                        <th
                          scope="col"
                          className="text-xs px-3 py-4 text-gray-300"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="text-xs  text-gray-400 px-3 py-4"
                        />
                      </tr>
                    </thead>
                    <tbody className="">
                      <ContentTableRow
                        getVideos={getVideos}
                        setGetVideos={setGetVideos}
                        getArticles={getArticles}
                        setGetArticles={setGetArticles}
                        typeValue={typeValue}
                        allContent={allContent}
                        query={query}
                        setAllContent={setAllContent}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        setCallToAction={setCallToAction}
                      />
                    </tbody>
                  </table>
                  <div className="my-10">
                    {typeValue === "article" && hasArticlesNextPage && (
                      <div className="loading" ref={ref}>
                        <Loader />
                      </div>
                    )}
                    {typeValue === "video" && hasVideosNextPage && (
                      <div className="loading" ref={ref}>
                        <Loader />
                      </div>
                    )}
                    {typeValue === "all types" && hasContentNextPage && (
                      <div className="loading" ref={ref}>
                        <Loader />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(isContentLoading || isArticlesLoading || isVideosLoading) && (
          <Loadersmall />
        )}
        {(contentError || articlesError || videosErrror) && (
          <ErrorDisplayComponent refetch={refetchCurrentTab} />
        )}
        {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
      </div>
    </>
  );
}

export default ContentTab;
