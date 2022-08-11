/* eslint-disable import/no-cycle */
import React from "react";
import "./App.css";
import Routers from "./routers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function App() {
  return <Routers />;
}

export default App;
