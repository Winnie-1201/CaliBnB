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

const createOne = (wishlist) => ({
  type: CREATE,
  wishlist,
});

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

  if (response.ok) {
    const wishlists = await response.json();
    dispatch(getAll(wishlists.Wishlists));
  }
};

const initialState = { userWishlists: {}, singleWishlist: null };

export default function wishlistReducer(state = initialState, action) {
  let newState = { userWishlists: {}, singleWishlist: null };
  switch (action.type) {
    case ALL:
      action.wishlists.forEach((w) => (newState.userWishlists[w.id] = w));
      return newState;
    default:
      return state;
  }
}
