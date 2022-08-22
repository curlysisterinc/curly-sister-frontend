/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import SideBarComponent from "../sidebar";
import { Link, useNavigate } from "react-router-dom";
import authHandler from "../../authHandler";
import learn from "../../api/learn";
import admin from "../../api/admin";
import LandingPage from "./landingPage";
import UserHome from "components/userHome";
import useGetAllStylists from "hooks/data/admin/useGetAllStylists";
import useGetAllQuestions from "hooks/data/learn/useGetAllQuestions";
import { useAuthContext } from "../../redux/auth";
import { useQueries } from "@tanstack/react-query";
// import UserHome from "./home";

function HomeComponent() {
  const {
    state: { isSignedIn },
  } = useAuthContext();
  // console.log({ isSignedIn });

  const { GetAllVideos, GetAllArticles, GetAllStylists, GetUpcomingBookings } =
    admin;

  const details = localStorage.getItem("user");
  const [firstName, setFirstName] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [getQuestions, setGetQuestions] = useState([]);
  const [saveQst, setSaveQst] = useState(false);
  const [getVideos, setGetVideos] = useState([]);
  const [getArticles, setGetArticles] = useState([]);
  const [getStylist, setGetStylist] = React.useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  const results = useQueries({
    queries: [
      { queryKey: ["videos"], queryFn: GetAllVideos },
      { queryKey: ["articles"], queryFn: GetAllArticles },
      { queryKey: ["stylists"], queryFn: GetAllStylists },
      { queryKey: ["upcomingBookings"], queryFn: GetUpcomingBookings },
    ],
  });

  // console.log("RESULT", results);
  // console.log("PROCESS", process.env);
  useEffect(() => {
    const isDataLoading = results.some((result) => result.isLoading);
    setIsLoading(isDataLoading);
    const isSuccess = results.every((result) => result.isSuccess);
    if (isSuccess) {
      setGetVideos(results[0].data.data.data);
      setGetArticles(results[1].data.data.data);
      setGetStylist(results[2].data.data.stylists);
      setUpcomingBookings(results[3].data.data.data);
    }
  }, [results]);

  React.useEffect(() => {
    const ac = new AbortController();
    if (isSignedIn) {
      const userDetails = authHandler.getUser("users");
      const userFirstName = userDetails?.active?.firstName;
      setFirstName(userFirstName);
    }

    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    !isLoading &&
    getStylist && (
      <div>
        {!isSignedIn ? (
          <LandingPage getStylist={getStylist} />
        ) : (
          <UserHome
            isLoading={isLoading}
            isLoggedIn={isSignedIn}
            firstName={firstName}
            getVideos={getVideos}
            getStylist={getStylist}
            getArticles={getArticles}
            getQuestions={getQuestions}
            saveQst={saveQst}
            setSaveQst={setSaveQst}
            upcomingBookings={upcomingBookings}
          />
        )}
      </div>
    )
  );
}

export default HomeComponent;
