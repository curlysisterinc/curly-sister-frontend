import React, { useState, useEffect } from "react";
import UserHome from "components/userHome";
import { useQueries } from "@tanstack/react-query";
import { queryClient } from "App";
import authHandler from "../../authHandler";
import admin from "../../api/admin";
import stylist from "../../api/stylist";
import LandingPage from "./landingPage";
import { useAuthContext } from "../../redux/auth";

function HomeComponent() {
  const {
    state: { isSignedIn },
  } = useAuthContext();

  const { GetAllVideos, GetAllArticles, GetUpcomingBookings } = admin;
  const { GetAllStylists } = stylist;

  const [firstName, setFirstName] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [getQuestions, setGetQuestions] = useState([]);
  const [saveQst, setSaveQst] = useState(false);
  const [getVideos, setGetVideos] = useState([]);
  const [getArticles, setGetArticles] = useState([]);
  const [getStylist, setGetStylist] = React.useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  React.useEffect(() => {
    queryClient.removeQueries(["stylists"], { exact: true });
  }, []);

  const results = useQueries({
    queries: [
      { queryKey: ["videos"], queryFn: GetAllVideos },
      { queryKey: ["articles"], queryFn: GetAllArticles },
      { queryKey: ["stylistsList"], queryFn: () => GetAllStylists(0) },
      { queryKey: ["upcomingBookings"], queryFn: GetUpcomingBookings },
    ],
  });

  useEffect(() => {
    const ac = new AbortController();
    const isDataLoading = results.some((result) => result.isLoading);
    setIsLoading(isDataLoading);
    const isSuccess = results.every((result) => result.isSuccess);
    if (isSuccess) {
      setGetVideos(results[0].data.data.data);
      setGetArticles(results[1].data.data.data);
      setGetStylist(results[2].data.data.stylist);
      setUpcomingBookings(results[3].data.data.data);
    }
    return function cleanup() {
      ac.abort();
    };
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
