const ALL = "wishlist/getAllWishlist";
const ONE = "wishlist/getOneWishlist";
const CREATE = "wishlist/createWishilist";
const DELETE = "wishlist/deleteWishlist";
const EDIT = "wishlist/editWishlist";

const getAll = (wishlists) => ({
  type: ALL,
  wishlists,
});

const getOne = (wishlist) => ({
  type: ONE,
  wishlist,
});

// const createOne = (wishlist) => ({
//   type: CREATE,
//   wishlist,
// });

const editOne = (wishlist, wishlistId) => ({
  type: EDIT,
  wishlist,
  wishlistId,
});

const deleteOne = (wishlistId) => ({
  type: DELETE,
  wishlistId,
});

export const getAllWishlistThunk = () => async (dispatch) => {
  const response = await fetch("/api/wishlists/current");

  //   console.log("response in thunk wishlist get all", response);
  if (response.ok) {
    const wishlists = await response.json();
    // console.log("wishlist list in get all thunk", wishlists);
    dispatch(getAll(wishlists.Wishlists));
    return wishlists;
  }
};

export const createWishlistThunk = (wishlist, spotId) => async (dispatch) => {
  const response = await fetch(`/api/wishlists/new?spotId=${spotId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wishlist),
  });

  if (response.ok) {
    const wishilist = await response.json();
    dispatch(getOne(wishilist));
    return wishilist;
  }
};

// maynot needed
export const editWishlistThunk =
  (wishlist, wishilistId) => async (dispatch) => {
    const response = await fetch(`/api/wishlists/${wishilistId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wishlist),
    });

    if (response.ok) {
      const wishilist = await response.json();
      dispatch(editOne(wishilist));
      return wishilist;
    }
  };

export const deleteWishlistThunk = (wishlistId) => async (dispatch) => {
  const response = await fetch(`/api/wishlists/${wishlistId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // const data = await response.json()
    dispatch(deleteOne(wishlistId));
    return response;
  }
};

const initialState = { userWishlists: {}, singleWishlist: null };

export default function wishlistReducer(state = initialState, action) {
  let newState = { userWishlists: {}, singleWishlist: null };
  switch (action.type) {
    case ALL:
      action.wishlists.forEach((w) => (newState.userWishlists[w.id] = w));
      return newState;
    case ONE:
      newState.singleWishlist = action.wishilist;
      return newState;
    case EDIT:
      newState.userWishlists[action.wishlistId] = action.wishilist;
      return newState;
    case DELETE:
      delete newState.userWishlists[action.wishlistId];
      return newState;
    default:
      return state;
  }
}
