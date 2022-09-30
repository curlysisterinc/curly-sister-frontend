import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "redux/auth";
import SideBarComponent from "../sidebar";
import authHandler from "../../authHandler";
import profileDp from "../../assets/images/profile-dp.png";
import searchIcon, {
  ReactComponent as RiSearchLine,
} from "../../assets/images/search-normal.svg";
import productRecommendation from "../../assets/images/product-recommendation.png";
import stylistPlace1 from "../../assets/images/stylist-place-1.png";
import stylistPlace2 from "../../assets/images/stylist-place-2.png";
import serenaAvatar from "../../assets/images/serena-avatar.png";
import hairChallengeAvatar from "../../assets/images/hair-challenge-avatar.png";
import bookMarkIcon from "../../assets/images/book-mark.png";
import trendingVideo from "../../assets/images/trending-video.png";
import curatedProduct from "../../assets/images/curated-product.png";
import continueLearning from "../../assets/images/continue-learning.png";
import arrowIcon from "../../assets/images/arrow.svg";

function UserHome({ upcomingBookings }) {
  const {
    state: { isSignedIn },
  } = useAuthContext();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    const ac = new AbortController();
    if (isSignedIn) {
      const userDetails = authHandler.getUser("users");
      const userFirstName = userDetails.firstName;
      setFirstName(userFirstName);
    }

    return function cleanup() {
      ac.abort();
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/stylists`, {
      state: { city: inputRef.current.value },
    });
  };

  return (
    <div className="bg-white px-10 py-8 pt-20 md:pt-12 w-full">
      <div className="flex flex-col w-full lg:flex-row justify-between items-center">
        <div className="flex justify-start items-center ">
          <img className="mr-3" src={profileDp} alt="profile pix" />
          <div className="">
            <p className="font-semibold text-gray-400 text-lg">
              Hello {firstName} 👋
            </p>
            <p className="text-sm text-gray-200">
              We hope your day is coming along great
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="relative h-12  mb-4 w-full lg:w-2/5 "
        >
          <input
            placeholder="What city do you live in?"
            className="border outline-none focus:outline-none border-gray-250 bg-white rounded-full placeholder:text-sm placeholder:text-gray-300 w-full h-full px-3 lg:px-6"
            id="searchInput"
            ref={inputRef}
            // value={searchValue}
            // onChange={debouncedResults}
          />
          <button
            type="submit"
            className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-orange-200 rounded-full"
          >
            <RiSearchLine color="white" size={20} />
          </button>
        </form>
      </div>

      {/* flexed-content */}
      <div className="grid grid-cols-12 gap-10  mt-10 w-full ">
        {/* left-content */}
        <div className="col-span-8">
          <div className="bg-orange-300 border border-orange-100 rounded-lg p-6">
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-400 text-base">Your upcoming bookings</p>
              <Link
                to="/all-bookings"
                className="text-sm font-bold text-purple-100"
              >
                View all bookings
              </Link>
            </div>
            {upcomingBookings &&
              upcomingBookings.map((booking) => {
                return (
                  <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
                    <img
                      className="mr-3"
                      src={productRecommendation}
                      alt="circle"
                    />
                    <div>
                      <p className="font-semibold text-gray-400 text-base">
                        Product recommendation
                      </p>
                      <p className="text-sm text-gray-200">
                        All Naturals · Fri, 18 Mar · 4:30 PM (GMT +1)
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* popular arund you */}
          <div className="mt-10">
            <div className="w-full flex justify-between items-center mb-5">
              <p className="text-gray-400 text-base">
                Popular around you
                <span>.</span>
                <span className="text-gray-200">Interesting styles</span>
              </p>
              <Link
                to="/stylists"
                className="text-sm font-bold text-purple-100"
              >
                View more
              </Link>
            </div>

            {/* stylists */}
            <div className="grid grid-cols-2 gap-8">
              <div className="shadow rounded-xl">
                <img
                  className="w-full object-cover"
                  src={stylistPlace1}
                  alt="stylist place"
                />
                <div className="p-5">
                  <dl className="mt-4 text-xs  flex justify-end items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                    <dt className="sr-only">Reviews</dt>
                    <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        aria-hidden="true"
                        className="mr-1 stroke-current dark:stroke-indigo-500"
                      >
                        <path
                          d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>
                        4.5{" "}
                        <span className="text-gray-200 font-normal">
                          (12 reviews)
                        </span>
                      </span>
                    </dd>
                  </dl>
                  <div className="mt-5 p">
                    <p className="text-gray-400 font-bold">
                      Sade’s Beauty Place
                    </p>
                    <p className="text-gray-400 text-sm">
                      Here’s a short version of a bio where one has been
                      provided.
                    </p>
                    <p className="text-gray-200 text-sm pt-3">
                      (636) 763-9867 · 333, Fremont Str, SF, CA (12km) ·
                      Certified
                    </p>
                  </div>
                </div>
              </div>

              <div className="shadow rounded-xl">
                <img
                  className="w-full object-cover"
                  src={stylistPlace2}
                  alt="stylist place"
                />
                <div className="p-5">
                  <dl className="mt-4 text-xs  flex justify-end items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                    <dt className="sr-only">Reviews</dt>
                    <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        aria-hidden="true"
                        className="mr-1 stroke-current dark:stroke-indigo-500"
                      >
                        <path
                          d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>
                        3.2{" "}
                        <span className="text-gray-200 font-normal">
                          (98 reviews)
                        </span>
                      </span>
                    </dd>
                  </dl>
                  <div className="mt-5 p">
                    <p className="text-gray-400 font-bold">All Naturals</p>
                    <p className="text-gray-400 text-sm">
                      Suddenly she came upon a little three-legged table, all
                      made up.
                    </p>
                    <p className="text-gray-200 text-sm pt-3">
                      (636) 145-9831 · 546, Mandela Avenue, SF, CA (23km) ·
                      Certified
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* questions */}
            <div className="mt-10">
              <div className="w-full flex justify-between items-center mb-5">
                <p className="text-gray-400 text-base">New questions</p>
                <Link
                  to="/stylists"
                  className="text-sm font-bold text-purple-100"
                >
                  View more
                </Link>
              </div>
              <div className="mb-4 bg-white flex items-center justify-between shadow rounded-lg border border-gray-250 w-full p-5">
                <div className="flex items-center">
                  <img className="mr-3" src={serenaAvatar} alt="circle" />
                  <div>
                    <p className="font-semibold text-gray-400 text-base mb-1">
                      How do you style your hair in winter?
                    </p>
                    <div>
                      <p className="text-sm text-gray-400">
                        Serena Williams{" "}
                        <span className="text-gray-400">
                          78 comments · 23 Mar 2022
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <img
                    className="ml-3"
                    src={bookMarkIcon}
                    alt="book mark icon"
                  />
                </div>
              </div>

              <div className="mb-4 bg-white flex justify-between items-center shadow rounded-lg border border-gray-250 w-full p-5">
                <div className="flex items-center">
                  <img
                    className="mr-3"
                    src={hairChallengeAvatar}
                    alt="circle"
                  />
                  <div>
                    <p className="font-semibold text-gray-400 text-base mb-1">
                      What has been your biggest hair challenge?
                    </p>
                    <div>
                      <p className="text-sm text-gray-400">
                        Funmi Adekunle
                        <span className="text-gray-400">
                          78 comments · 23 Mar 2022
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <img
                    className="ml-3"
                    src={bookMarkIcon}
                    alt="book mark icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right-content */}
        <div className="col-span-4">
          <div>Trending Videos</div>
          <div className="mt-8">
            <img src={trendingVideo} alt="trending video" />
          </div>
          <div className="border border-gray-50 w-full my-6" />
          <div className="mt-3 rounded-lg w-full border bg-orange-150 overflow-hidden border-orange-200 shadow">
            <img src={curatedProduct} alt="trending video" />
            <div className="bg-white p-3">
              <p className="font-BeatriceSemiBold text-base my-3 text-gray-400">
                Our curated products
              </p>
              <p className="text-sm text-gray-200">
                Over 100+ hand selected, trusted items for your hair.
              </p>
              <div className="flex text-orange-200 font-BeatriceSemiBold text-sm mt-3">
                Get them
                <img className="ml-3" src={arrowIcon} alt="arrow icon" />
              </div>
            </div>
          </div>
          <div className="border border-gray-50 w-full my-6 overflow-hidden" />

          <div className="mt-8">
            <p>Continue Learning</p>
            <div className="mt-3 rounded-lg w-full border border-gray-50 shadow">
              <img src={continueLearning} alt="trending video" />
              <div className="bg-white p-3">
                <p className="text-sm text-gray-200">
                  Oprah Winfrey · 11 Feb 2022
                </p>
                <p className="font-BeatriceSemiBold text-base my-3 text-gray-400">
                  Here’s help for drying your textured hair the right way
                </p>
                <p className="text-sm text-gray-200">
                  A speech caused a remarkable sensation among the party. Some
                  of the birds hurried off at once to see...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
