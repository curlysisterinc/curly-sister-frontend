/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { AuthRoutes } from "../../../../constants";
import DeleteContentModal from "./deleteContentModal";
import trashIcon from "../../../../assets/images/trash.svg";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import searchIcon from "../../../../assets/images/search-normal-2.svg";
import ContentRow from "./contentTableRow";
// import { contents } from "../users/data";
import admin from "../../../../api/admin";
import SideBarComponent from "../../../sidebar/sidebar";
import TypesContent from "../../../customdropdown/dashboard/types";
import Newcontent from "../../../customdropdown/dashboard/content/newcontent";
import AdminDashbaord from "../../dashboard";

function ContentTab({ active }) {
  const [toggleActions, setToggleActions] = useState(false);
  const [typeValue, setTypeValue] = useState("all types");
  const [query, setQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [getVideos, setGetVideos] = useState([]);
  const [getArticles, setGetArticles] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [callToAction, setCallToAction] = useState(false);
  const navigate = useNavigate();

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
  useEffect(() => {
    admin
      .GetAllContents()
      .then((response) => {
        console.log(response.data, "contents");
        setAllContent(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
  }, [getVideos, getArticles]);

  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetAllVideos()
      .then((response) => {
        // console.log(response.data, "video");
        setGetVideos(response.data.data);
      })
      .catch((error) => {
        // console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);
  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetAllArticles()
      .then((response) => {
        // console.log(response.data, "article");
        setGetArticles(response.data.data);
      })
      .catch((error) => {
        // console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <>
      {/* tabs */}
      <div className="">
        <div className="flex items-end justify-between">
          <div className="font-BeatriceSemiBold text-gray-400 text-2xl">
            Content
            <span className="text-gray-300 ml-2 text-sm">
              {allContent.length}
            </span>
          </div>
          <div className="">
            {/* filters */}
            {callToAction ? (
              <div
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
                    <div
                      onClick={openDeleteModal}
                      className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer"
                    >
                      <img className="mr-2" src={trashIcon} alt="" />
                      Delete
                    </div>
                  </div>
                )}
              </div>
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
        <div className="flex flex-col mt-4 min-h-screen">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="min-h-screen">
                <table className="min-w-full text-left border border-gray-600 pb-40">
                  <thead className=" bg-gray-50 uppercase text-sm text-gray-300">
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
                    <ContentRow
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
                <div className="my-10" />
              </div>
            </div>
          </div>
        </div>
        {deleteModal && <DeleteContentModal handleClose={closeDeleteModal} />}
      </div>
    </>
  );
}

export default ContentTab;
