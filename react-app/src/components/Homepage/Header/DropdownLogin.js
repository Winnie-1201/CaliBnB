import React from "react";

function DropdownLogin() {
  return (
    <div className="flex-column ptb mt login-dropdown">
      <div className="top flex-column">
        <div className="top-text">Messages</div>
        <div className="top-text">Notifications</div>
        <div className="top-text">Trips</div>
        <div className="top-text">Wishlists</div>
      </div>
      <div className="mid flex-column">
        <div className="top-text">Calibnb your home</div>
        <div className="top-text">Share your experience</div>
        <div className="top-text">Account</div>
      </div>
      <div className="bottom flex-column">
        <div className="top-text">Log out</div>
      </div>
    </div>
  );
}

export default DropdownLogin;
