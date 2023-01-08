import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishlistThunk } from "../../../store/wishlists";
import "./index.css";

function WishlistModal() {
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState("");
  const [title, setTitle] = useState("");
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

    if (!title)
      newErrors.noTitle = "Please enter the name of your new wishlist.";

    setSubmit(false);
    setErrors(newErrors);
  }, [title]);

  console.log(
    "wishlist and its true",
    userWishlists,
    Object.values(userWishlists).length
  );

  //   if (Object.values(userWishlists).length > 0) {
  //     setSaveExist(false);
  //     setCreateNew(true);
  //   }

  let titleOption = [];
  if (userWishlists) {
    for (let key in userWishlists) {
      if (!titleOption.includes(userWishlists[key].title)) {
        titleOption.push(userWishlists[key].title);
      }
    }
  }

  console.log("save exist and create new", saveExist, createNew);
  return (
    loaded && (
      <>
        <form className="wl-form flex-columnm">
          <div className="wl-title">
            <h2 className="wl-title-text">Save the place</h2>
          </div>
          <div className="wl-form-body flex-column">
            <div className="wl-form-input">
              {saveExist && Object.values(userWishlists).length > 0 && (
                <>
                  <div className="wl-input-label">Save to</div>
                  <select
                    className="wl-select"
                    name="wl-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></select>
                  {titleOption.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </>
              )}
              {(createNew || Object.values(userWishlists).length === 0) && (
                <>
                  <div className="wl-input-label">Title</div>
                  {/* <div className="wl-input-box"> */}
                  <input
                    className="wl-input-box"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="create new wishilist"
                  ></input>
                  {/* </div> */}
                </>
              )}
            </div>
          </div>
        </form>
      </>
    )
  );
}

export default WishlistModal;
