import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import {
  createWishlistThunk,
  getAllWishlistThunk,
} from "../../../store/wishlists";
import "./index.css";

function WishlistModal({ setWishlistModal, spotId }) {
  const dispatch = useDispatch();

  //   const [wishlist, setWishlist] = useState("");
  const [wishlist, setWishlist] = useState("");
  const [createNew, setCreateNew] = useState(false);
  const [saveExist, setSaveExist] = useState(true);
  const [name, setName] = useState("");
  const [createModal, setCreateWishlishModal] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const userWishlists = useSelector((state) => state.wishlists.userWishlists);

  useEffect(() => {
    dispatch(getAllWishlistThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const newErrors = {};

    if (!wishlist)
      newErrors.noWishilist = "Please enter the name of your new wishlist.";

    setSubmit(false);
    setErrors(newErrors);
  }, [wishlist]);

  // console.log(
  //   "wishlist and its true",
  //   userWishlists,
  //   Object.values(userWishlists).length
  // );

  const handleSave = async (e) => {
    e.preventDefault();

    const wishlist = { title: name };
    await dispatch(createWishlistThunk(wishlist, spotId))
      .then(() => dispatch(getAllWishlistThunk()))
      .then(() => {
        setCreateWishlishModal(false);
        setWishlistModal(false);
      });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCreateWishlishModal(true);
    // setWishlistModal(false);
  };
  //   if (Object.values(userWishlists).length > 0) {
  //     setSaveExist(false);
  //     setCreateNew(true);
  //   }

  let wishlistOption = [];
  if (userWishlists) {
    for (let key in userWishlists) {
      if (!wishlistOption.includes(userWishlists[key].title)) {
        wishlistOption.push(userWishlists[key].title);
      }
    }
  }
  // console.log("create modal open", createModal);
  // console.log("name", name, name.length);
  //   console.log("save exist and create new", saveExist, createNew);
  return (
    loaded && (
      <>
        <div className="wl-form">
          <div className="wl-x-cancel">
            {/* onClick handle close modal */}
            <button className="wl-x-bt" onClick={() => setWishlistModal(false)}>
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
          <div className="wl-header">
            <div className="wl-header-left"></div>
            <div className="wl-header-mid">
              <h1 className="wl-header-text">Your wishlists</h1>
            </div>
            <div className="wl-header-right"></div>
          </div>
          <div className="wl-body">
            <div className="wl-block">
              {/* onClick to handle create new wishlist */}
              <button
                className="wl-block-bt"
                onClick={handleNext}
                // onClick={() => {
                //   setCreateWishlishModal(true);
                //   setWishlistModal(false);
                // }}
              >
                <div className="flex s-b center pt-2">
                  <div className="ptb-8 br-1 flex">
                    <div className="mr-16">
                      <div className="block-plus">
                        <img
                          className="block-plus-img"
                          src="https://a0.muscache.com/im/pictures/da1a2f06-efb0-4079-abce-0f6fc82089e0.jpg"
                        />
                      </div>
                    </div>
                    <div className="wl-block-right">
                      <div className="wl-br-text">Create new wishlist</div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            {Object.values(userWishlists).length > 0 &&
              Object.values(userWishlists).map((wishlist) => (
                <div key={wishlist.id}>
                  <button className="wl-block-bt" onClick={handleSave}>
                    <div className="flex s-b center pt-2">
                      <div className="ptb-8 br-1 flex">
                        <div className="flex">
                          <div className="mr-16">
                            <div className="block-plus">
                              <img
                                className="block-plus-img"
                                src={wishlist.spot.images[0].url}
                                alt="wishlist image"
                              />
                            </div>
                          </div>
                          <div className="wl-block-right">
                            <div className="wl-br-text">{wishlist.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
          </div>
        </div>
        {createModal && (
          <Modal onClose={() => setCreateWishlishModal(false)}>
            <div className="wl-form">
              <div className="wl-x-cancel">
                {/* onClick handle close modal and reopen the lst modal*/}
                <button
                  className="wl-x-bt"
                  onClick={() => setCreateWishlishModal(false)}
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
              <div className="wl-header">
                <div className="wl-header-left"></div>
                <div className="wl-header-mid">
                  <h1 className="wl-header-text">Name this wishlist</h1>
                </div>
                <div className="wl-header-right"></div>
              </div>
              <div className="wl-body-new">
                <div className="wl-input-box">
                  <input
                    className="wl-input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="pt-8">
                  <div className="wl-max-text">50 Characters maximum</div>
                </div>
              </div>
              <div className="wl-footer">
                <button
                  onClick={handleSave}
                  className={`wl-create-bt${
                    name.length === 0 ? "-disable" : ""
                  }`}
                >
                  Create
                </button>
              </div>
            </div>
          </Modal>
        )}
      </>
    )
  );
}

export default WishlistModal;
