import React, { useEffect, useState } from "react";
import Header from "../../Homepage/Header";
import Footer from "../../Homepage/Footer";
import "./index.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneWishlist } from "../../../store/wishlists";
import LoadingBlock from "../../LoadingBlock";
import { Modal } from "../../../context/Modal";

function WishlistDetail() {
  const dispatch = useDispatch();

  const { title } = useParams();
  const wishlist = useSelector((state) => state.wishlists.singleWishlist);

  const [newTitle, setNewTitle] = useState(title);
  const [editWishlistModal, setEditWishlistModal] = useState(false);
  // const [delWishlistModal, setDelWishlistModal] = useState(false)

  const [errors, setErrors] = useState("");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOneWishlist(title)).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (!newTitle) setErrors("You need to enter the title for the wishlist.");
    if (newTitle && newTitle.length > 50) setErrors("The title is too long.");
  }, [errors]);

  const handleDelete = async (e) => {
    e.preventDefault();
  };

  const handleSave = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      {!loaded && <LoadingBlock />}
      {loaded && (
        <main className="wd-container">
          <div className="wd-top">
            <div className="flex center s-b">
              <button className="wd-go-back">
                <i className="fa-solid fa-arrow-left" />
              </button>
              <button
                className="wd-more"
                onClick={() => setEditWishlistModal("edit")}
              >
                <i className="fa-solid fa-ellipsis" />
              </button>
            </div>
          </div>
          <div className="wd-mid">
            <h2 className="wd-mid-h2">{title}</h2>
          </div>
          <div className="wd-bottom">
            <div className="wd-grid">
              {wishlist.map((item) => (
                <NavLink
                  className="wd-grid-card"
                  key={item.id}
                  to={`/spots/${item.spot.id}`}
                >
                  <div className="grid-column">
                    <div className="flex one-spot">
                      <div className="mb-12 wd-img-box">
                        <img
                          className="wd-one-spot-img"
                          src={item.spot.images[0].url}
                          alt="spot"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                      <div className="flex s-b plr-8 font-16">
                        <div className="flex-column left">
                          <div className="location">{item.spot.city}</div>
                          <div className="type">{item.spot.type}</div>
                          <div className="date"></div>
                          <div className="price">
                            <span className="price-d">${item.spot.price}</span>{" "}
                            night
                          </div>
                        </div>
                        <div>
                          <div className="flex center">
                            <span className="star-svg-box">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                className="hp-star-svg"
                              >
                                <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
                              </svg>
                            </span>
                            <span className="avg-rating">
                              {item.spot.averages.avg}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </main>
      )}
      {editWishlistModal === "edit" && (
        <Modal onClose={() => setEditWishlistModal(false)}>
          <div className="wl-form">
            <div className="wl-x-cancel">
              {/* onClick handle close modal and reopen the lst modal*/}
              <button
                className="wl-x-bt"
                onClick={() => setEditWishlistModal(false)}
              >
                <span className="wl-x-text">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="wl-x-svg"
                  >
                    <path d="m 6 6 l 20 20"></path>
                    <path d="m 26 6 l -20 20"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="ewl-header">
              <div className="wl-header-left"></div>
              <div className="wl-header-mid">
                <h1 className="ewl-header-text">Setting</h1>
              </div>
              <div className="wl-header-right">
                <button
                  className="ewl-del-bt"
                  onClick={() => setEditWishlistModal("ed-del")}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="ewl-body-new">
              <div className="wl-input-box">
                <input
                  className="wl-input"
                  placeholder="Name"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                ></input>
              </div>
              <div className="pt-8">
                <div className="wl-max-text">50 Characters maximum</div>
              </div>
            </div>
            <div className="ewl-footer">
              <button
                className="ewl-cancel-bt"
                onClick={() => setEditWishlistModal(false)}
              >
                Cancel
              </button>
              <button
                // onClick={handleSave}
                className={`ewl-save-bt${
                  newTitle.length === 0 ? "-disable" : ""
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
      {editWishlistModal === "ed-del" && (
        <Modal onClose={() => setEditWishlistModal(false)}>
          <div className="ed-del-modal">
            <div className="wl-x-cancel">
              {/* onClick handle close modal and reopen the lst modal*/}
              <button
                className="wl-x-bt"
                onClick={() => setEditWishlistModal(false)}
              >
                <span className="wl-x-text">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="wl-x-svg"
                  >
                    <path d="m 6 6 l 20 20"></path>
                    <path d="m 26 6 l -20 20"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="ewl-header">
              <div className="wl-header-left"></div>
              <div className="wl-header-mid">
                <h1 className="ewl-header-text">Delete this wishlist</h1>
              </div>
              <div className="wl-header-right"></div>
            </div>
            <div className="dwl-body-new">
              Are you sure you want to delete {title}
            </div>
            <div className="ewl-footer">
              <button
                className="ewl-cancel-bt"
                onClick={() => setEditWishlistModal("edit")}
              >
                Cancel
              </button>
              <button
                // onClick={handleSave}
                className={`ewl-save-bt${
                  newTitle.length === 0 ? "-disable" : ""
                }`}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Footer />
    </>
  );
}

export default WishlistDetail;
