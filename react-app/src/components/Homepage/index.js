import React from "react";
import AllSpots from "../Spots/AllSpots";
import Header from "./Header";
import "./index.css";

function Homepage() {
  return (
    <div className="homepage-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="bannber-container"></div>
      <div className="map-container grid"></div>
      <div className="main-container">
        <AllSpots />
      </div>
    </div>
  );
}

export default Homepage;
