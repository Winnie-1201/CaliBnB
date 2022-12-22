import React from "react";
import LoginFormModal from "../../LoginFormModal";
import LoginSignup from "../../LoginSignup";
import "./Dropdown.css";

function Dropdown() {
  return (
    <div className="flex-column mt dropdown">
      {/* <div className="top flex-column"> */}
      <LoginSignup />
      {/* <LoginFormModal /> */}
      {/* <div className="top-text">
          <div className="signup">Sign up</div>
        </div>
        <div className="top-text">
          <div className="login">Log in</div>
        </div> */}
      {/* </div> */}
      <div className="bottom flex-column">
        <div className="top-text">
          <div className="home">Calibnb your home</div>
        </div>
        <div className="top-text">
          <div className="experience">Share your experience</div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
