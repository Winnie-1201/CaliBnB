import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./index.css";
import AllSpots from "./Spots";

function Homepage() {
  return (
    <div className="homepage-container">
      {/* <div className="header-container"> */}
      <Header />
      {/* </div> */}
      <div className="bannber-container"></div>
      <div className="map-container grid"></div>
      <div className="main-container">
        <AllSpots />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
