/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import SideBarComponent from "../sidebar/sidebar";
import FooterComponent from "../footer/footer";
import searchIcon from "../../assets/images/search-normal.svg";
import girl0 from "../../assets/images/girl-0.png";
import girl1 from "../../assets/images/girl-1.png";
import girl2 from "../../assets/images/girl-2.png";
import girl3 from "../../assets/images/girl-3.png";
import girl4 from "../../assets/images/girl-4.png";
import bgOne from "../../assets/images/bg-one.png";
import LearnSection from "./learn";
import BookStylist from "./bookStylist";
import CommunitySection from "./community";
import { Link } from "react-router-dom";
import authHandler from "../../authHandler";
import profileDp from "../../assets/images/profile-dp.png";
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

function HomeComponent() {
  const details = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = React.useState(details);
  const [firstName, setFirstName] = React.useState("");
  React.useEffect(() => {
    const ac = new AbortController();
    if (isLoggedIn) {
      const userDetails = authHandler.getUser("users");
      const userFirstName = userDetails.active.firstName;
      setFirstName(userFirstName);
    }

    return function cleanup() {
      ac.abort();
    };
  }, []);
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border-r border-gray-50">
      <SideBarComponent active="home" />
      {!isLoggedIn ? (
        <div className="ml-80 p-0">
          <div className="relative">
            <img className="absolute w-full" src={bgOne} alt="" />
            <div className="absolute z-10 top-1/2 bg-white rounded-full w-3/4  left-1/2 transform -translate-x-1/2 p-3 shadow">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  placeholder="What city do you live in?"
                  className="border-0 outline-none w-11/12"
                />
                <div className="rounded-full bg-orange-200 h-11 w-11 flex justify-center items-center cursor-pointer">
                  <img src={searchIcon} alt="Search icon" />
                </div>
              </div>
            </div>
            <div className="bg-purple-200 px-10 pt-14">
              <div className="relative text-center w-full border border-orange-100 flex flex-col justify-center items-center py-24">
                <h1 className="text-white font-bold text-5xl font-GTSuperTextBlack">
                  Let’s find you a stylist
                </h1>
                <p className="text-white text-lg mt-6">
                  Find thousands of curly hair stylists right at your fingertips
                </p>
              </div>
            </div>
            <div className="flex justify-start flex-nowrap overflow-x-hidden">
              <img src={girl0} alt="girl with hair" />
              <img src={girl1} alt="girl with hair" />
              <img src={girl2} alt="girl with hair" />
              <img src={girl3} alt="girl with hair" />
              <img src={girl4} alt="girl with hair" />
            </div>
          </div>
          <div className="mt-20">
            <BookStylist />
            <LearnSection />
            <CommunitySection />
          </div>
          <FooterComponent />
        </div>
      ) : (
        <div className="ml-80 bg-white px-10 py-14 w-full">
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
            <div className="rounded-full px-3 py-3 relative w-full lg:w-2/5 h-12 mt-6 lg:mt-0 border border-gray-250 flex justify-between items-center">
              <input
                type="text"
                className="border-0 outline-none   h-full w-full"
                placeholder="San Francisco, CA, USA"
              />
              <div className="ml-2 rounded-full bg-orange-200 h-10 w-10 flex justify-center items-center cursor-pointer">
                <img src={searchIcon} alt="Search icon" />
              </div>
            </div>
          </div>

          {/* flexed-content */}
          <div className="grid grid-cols-12 gap-10  mt-10 w-full ">
            {/* left-content */}
            <div className="col-span-8">
              <div className="bg-orange-300 border border-orange-100 rounded-lg p-6">
                <div className="w-full flex justify-between items-center mb-5">
                  <p className="text-gray-400 text-base">
                    Your upcoming bookings
                  </p>
                  <Link
                    to="/all-bookings"
                    className="text-sm font-bold text-purple-100"
                  >
                    View all bookings
                  </Link>
                </div>
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
                <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
                  <img
                    className="mr-3"
                    src={productRecommendation}
                    alt="circle"
                  />
                  <div>
                    <p className="font-semibold text-gray-400 text-base">
                      Micro teaching lesson
                    </p>
                    <p className="text-sm text-gray-200">
                      Curly Helen · Mon, 21 Mar · 06:00 AM (GMT +1)
                    </p>
                  </div>
                </div>
                <div className="mb-4 bg-white flex shadow rounded-lg border border-gray-250 w-full p-3">
                  <img
                    className="mr-3"
                    src={productRecommendation}
                    alt="circle"
                  />
                  <div>
                    <p className="font-semibold text-gray-400 text-base">
                      Consultation
                    </p>
                    <p className="text-sm text-gray-200">
                      All Naturals · Tue, 22 Mar · 05:00 PM (GMT +1)
                    </p>
                  </div>
                </div>
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
                          Suddenly she came upon a little three-legged table,
                          all made up.
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
                      A speech caused a remarkable sensation among the party.
                      Some of the birds hurried off at once to see...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeComponent;
