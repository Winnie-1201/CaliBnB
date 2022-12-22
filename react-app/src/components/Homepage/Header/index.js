import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import DropdownLogin from "./DropdownLogin";
import "./index.css";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector((state) => state.session.user);
  const isLogin = user.error ? false : true;

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

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
          {/* change the buttons to input later */}
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
          <div className="user-profile relative z-1">
            <button className="profile-bt z-1 flex" onClick={openMenu}>
              <div>
                <i className="fa-solid fa-grip-lines" />
              </div>
              <div className="ml-12 z-1 profile-icon">
                <i className="fa-solid fa-circle-user" />
              </div>
            </button>
            {showMenu && !isLogin && <Dropdown />}
            {showMenu && isLogin && <DropdownLogin />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
