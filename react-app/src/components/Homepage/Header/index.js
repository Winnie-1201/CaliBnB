import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import CreateSpot from "../../CreateSpot";
import NextStepForm from "../../CreateSpot/NextStepModal";
import LoginForm from "../../LoginSignup/LoginForm";
import SignupForm from "../../LoginSignup/SignupForm";
import DropdownLogin from "./DropdownLogin";
import "./index.css";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  // const [createSpotModal, setCreateSpotModal] = useState(false);
  // const [next, setNext] = useState(false);

  const data = {};

  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const isLogin = !user || user?.error ? false : true;

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

  const handleHomepage = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleCalibnb = (e) => {
    e.preventDefault();
    history.push("/spots/current/new");
    // setCreateSpotModal(true);
  };

  return (
    <div className="flex center relative s-b z-1 plr-40 header">
      <div className="header-left">
        <div
          className="inline-flex center relative z-1 redirect"
          onClick={handleHomepage}
        >
          <div className="logo-container flex center">
            <img className="logo wh-30-32" src="/logo.png" alt="logo png" />
            <div className="logo-text">calibnb</div>
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
            <div className="p-12 z-1" onClick={handleCalibnb}>
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
            {showMenu && !isLogin && (
              <div className="flex-column mt dropdown">
                <div className="top flex-column">
                  <div
                    className="text-hover flex center"
                    onClick={() => {
                      setSignupModal(true);
                    }}
                  >
                    <div className="top-text">
                      <div
                        className="signup"
                        onClick={() => {
                          setSignupModal(true);
                        }}
                      >
                        Sign up
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-hover flex center"
                    onClick={() => {
                      setLoginModal(true);
                    }}
                  >
                    <div className="top-text">
                      <div
                        className="login"
                        onClick={() => {
                          setLoginModal(true);
                        }}
                      >
                        Log in
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom flex-column">
                  <div className="text-hover flex center">
                    <div className="top-text">
                      <div className="home">Calibnb your home</div>
                    </div>
                  </div>
                  <div className="text-hover flex center">
                    <div className="top-text">
                      <div className="experience">Share your experience</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {loginModal && (
              <Modal onClose={() => setLoginModal(false)}>
                <LoginForm setLoginModal={setLoginModal} />
              </Modal>
            )}
            {signupModal && (
              <Modal onClose={() => setSignupModal(false)}>
                <SignupForm setSignupModal={setSignupModal} />
              </Modal>
            )}
            {/* {createSpotModal && (
              <Modal
                onClose={() => {
                  setCreateSpotModal(false);
                }}
              >
                {next ? (
                  <NextStepForm next={next} setNext={setNext} data={data} />
                ) : (
                  <CreateSpot next={next} setNext={setNext} data={data} />
        
                )}
              </Modal>
            )} */}

            {showMenu && isLogin && <DropdownLogin />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
