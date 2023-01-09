import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  console.log(
    "wishlist and its true",
    userWishlists,
    Object.values(userWishlists).length
  );

  const handleSave = async (e) => {
    e.preventDefault();
    await dispatch(createWishlistThunk(wishlist, spotId)).then(() =>
      setWishlistModal(false)
    );
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

  //   console.log("save exist and create new", saveExist, createNew);
  return (
    loaded && (
      <>
        <form className="wl-form flex-columnm">
          {Object.values(userWishlists).length > 0 ? (
            <>
              <div className="flex center">
                <h2 className="wl-wishlist-text">Save the place to</h2>
                <select
                  className="wl-select"
                  name="wl-wishlist"
                  value={wishlist}
                  onChange={(e) => setWishlist(e.target.value)}
                >
                  {wishlistOption.map((option) => (
                    <option key={option} className="wl-option">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="m-20">
                <div className="wl-or flex center">Or</div>
              </div>
              <div className="wl-wishlist">
                <h2 className="wl-wishlist-text">Create a new wishlist</h2>
                <input
                  className="wl-input-box"
                  type="text"
                  value={wishlist}
                  onChange={(e) => setWishlist(e.target.value)}
                  placeholder="create new wishilist"
                ></input>
              </div>
            </>
          ) : (
            <>
              <div className="wl-input-label">Wishlist title</div>
              {/* <div className="wl-input-box"> */}
              <input
                className="wl-input-box"
                type="text"
                value={wishlist}
                onChange={(e) => setWishlist(e.target.value)}
                placeholder="create new wishilist"
              ></input>
              {/* </div> */}
            </>
          )}
          <div className="wl-form-bt flex s-b">
            <button
              className="wl-cancel-bt"
              onClick={() => setWishlistModal(false)}
            >
              Cancel
            </button>
            <button className="wl-save-bt" onClick={handleSave}>
              Save
            </button>
          </div>
          {/* <div className="wl-wishlist">
            <h2 className="wl-wishlist-text">Save the place to</h2>
          </div> */}
          {/* <div className="wl-form-body flex-column"> */}
          {/* <div className="wl-form-input"> */}
          {/* {saveExist && Object.values(userWishlists).length > 0 && (
                <>
                  <select
                    className="wl-select"
                    name="wl-wishlist"
                    value={wishlist}
                    onChange={(e) => setWishlist(e.target.value)}
                  >
                    {wishlistOption.map((option) => (
                      <option key={option} className="wl-option">
                        {option}
                      </option>
                    ))}
                  </select>
                </>
              )} */}
          {/* {(createNew || Object.values(userWishlists).length === 0) && (
                <>
                  <div className="wl-input-label">Wishlist title</div>
                  <input
                    className="wl-input-box"
                    type="text"
                    value={wishlist}
                    onChange={(e) => setWishlist(e.target.value)}
                    placeholder="create new wishilist"
                  ></input>
                </>
              )} */}
          {/* </div> */}
          {/* </div> */}
        </form>
      </>
    )
  );
}

export default WishlistModal;
