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
import useGetAllStylists from "hooks/data/stylist/useGetAllStylists";
import { useAuthContext } from "../../redux/auth";
// import UserHome from "./home";

function HomeComponent() {
  const {
    state: { isSignedIn },
  } = useAuthContext();
  console.log({ isSignedIn });
  const details = localStorage.getItem("user");
  const [firstName, setFirstName] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [getQuestions, setGetQuestions] = useState([]);
  const [saveQst, setSaveQst] = useState(false);
  const [getVideos, setGetVideos] = useState([]);
  const [getArticles, setGetArticles] = useState([]);
  // const [getStylist, setGetStylist] = React.useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  // const { data, loading, error: err } = useGetAllStylists();
  const { data, loading, error: err } = useGetAllStylists();
  const getStylist = data?.data?.stylists;

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

  useEffect(async () => {
    const ac = new AbortController();

    learn
      .GetAllQuestions()
      .then((response) => {
        console.log(response.data.data);
        setIsLoading(false);
        setGetQuestions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    admin
      .GetAllVideos()
      .then((response) => {
        console.log(response.data.data, "Success");
        setIsLoading(false);
        setGetVideos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    admin
      .GetAllArticles()
      .then((response) => {
        console.log(response.data.data, "Success");
        setIsLoading(false);

        setGetArticles(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);

        console.log(error);
      });
    // admin
    //   .GetAllStylists()
    //   .then((response) => {
    //     console.log(response.data.stylists, "stylists");
    //     setGetStylist(response.data.stylists);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    admin.GetUpcomingBookings().then((response) => {
      setUpcomingBookings(response.data.data);
      console.log(response, "upcoming bookings");
    });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <div>
      {!isSignedIn ? (
        data && <LandingPage getStylist={getStylist} />
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
  );
}

export default HomeComponent;
