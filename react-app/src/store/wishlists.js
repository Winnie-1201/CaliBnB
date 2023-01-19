const ALL = "wishlist/getAllWishlist";
const ONE = "wishlist/getOneWishlist";
const CREATE = "wishlist/createwishlist";
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

const createOne = (wishlist) => ({
  type: CREATE,
  wishlist,
});

const editOne = (wishlist, wishlistId) => ({
  type: EDIT,
  wishlist,
  wishlistId,
});

const deleteOne = (title) => ({
  type: DELETE,
  title,
});

export const getAllWishlistThunk = () => async (dispatch) => {
  const response = await fetch("/api/wishlists/current");

  //   console.log("response in thunk wishlist get all", response);
  if (response.ok) {
    const wishlists = await response.json();
    dispatch(getAll(wishlists));
    return wishlists;
  }
};

export const getOneWishlist = (title) => async (dispatch) => {
  const response = await fetch("/api/wishlists/current");

  //   console.log("response in thunk wishlist get all", response);
  if (response.ok) {
    const wishlists = await response.json();
    dispatch(getOne(wishlists[title]));
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
    const wishlist = await response.json();
    await dispatch(createOne(wishlist));
    return wishlist;
  }
};

// maynot needed
export const editWishlistThunk = (oldTitle, titleData) => async (dispatch) => {
  // console.log("title in edit thunk", oldTitle);
  const response = await fetch(`/api/wishlists/${oldTitle}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(titleData),
  });

  if (response.ok) {
    const wishlist = await response.json();
    console.log("wishlist in edit thunk", wishlist);
    dispatch(editOne(wishlist));
    return wishlist;
  }
};

export const deleteWishlistThunk = (title) => async (dispatch) => {
  const response = await fetch(`/api/wishlists/${title}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // const data = await response.json()
    dispatch(deleteOne(title));
    return response;
  }
};

const initialState = { userWishlists: {}, singleWishlist: null };

export default function wishlistReducer(state = initialState, action) {
  let newState = { userWishlists: {}, singleWishlist: null };
  switch (action.type) {
    case ALL:
      newState.userWishlists = action.wishlists;
      return newState;
    case ONE:
      newState = { ...state };
      newState.singleWishlist = action.wishlist;
      return newState;
    case CREATE:
      newState = { ...state };
      if (newState.userWishlists[action.wishlist.title])
        newState.userWishlists[action.wishlist.title].push(action.wishlist);
      else newState.userWishlists[action.wishlist.title] = action.wishlist;
      return newState;
    case EDIT:
      newState.userWishlists = action.wishlist;
      return newState;
    case DELETE:
      newState = { ...state };
      delete newState.userWishlists[action.title];

      return newState;
    default:
      return state;
  }
}
