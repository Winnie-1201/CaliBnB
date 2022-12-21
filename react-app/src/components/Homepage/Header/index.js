import React from "react";
import "./index.css";

export default function index() {
  return (
    <div className="flex center relative s-b z-1 plr-40">
      <div className="header-left">
        <div className="inline-flex center relative z-1">
          <div className="logo-container">
            <div className="logo wh-30-32">logo</div>
          </div>
        </div>
      </div>
      <div className="header-mid plr-24">
        <div className="flex mid-box">
          <span></span>
          <button className="flex anywhere default-button z-1 relative">
            <div className="anywhere-text">Anywhere</div>
          </button>
          <span></span>
          <button className="flex anyweek default-button">
            <div className="anyweek-text">Anyweek</div>
          </button>
          <span></span>
          <button className="flex anyguest default-button">
            <div className="anyguest-text">Add guests</div>
            <div className="search-button">
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          </button>
        </div>
      </div>
      <div className="header-right">
        <div className="flex center relative h-80">
          <div className="flex auto">
            {/* change it to a link later */}
            <div className="p-12 z-1">
              <div className="flex relative center z-1">Calibnb your home</div>
            </div>
          </div>
          <div className="user-profile">
            <button className="profile-bt z-1 flex">
              <div>
                <i class="fa-solid fa-grip-lines" />
              </div>
              <div className="ml-12 z-1 profile-icon">
                <i class="fa-solid fa-circle-user" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
