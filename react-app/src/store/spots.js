const LOAD_ALL = "spots/loadAllSpots";
const LOAD_ONE = "spots/loadOneSpot";
const LOAD_CURR = "spots/loadCurrUserSpots";
const DELETE_SPOT = "spots/deleteSpot";

const loadAll = (spots) => ({
  type: LOAD_ALL,
  spots,
});

const loadOne = (spot) => ({
  type: LOAD_ONE,
  spot,
});

const loadOwner = (spots) => ({
  type: LOAD_CURR,
  spots,
});

const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

export const getAllSpotThunk = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  // console.log("response", response.ok);

  if (response.ok) {
    const spots = await response.json();
    // console.log("spots in thunk", spots);
    dispatch(loadAll(spots.spots));

    return spots;
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    console.log("spot", spot);
    dispatch(loadOne(spot));

    return spot;
  }
};

export const getOwnerSpotsThunk = (ownerId) => async (dispatch) => {
  const response = await fetch(`/api/spots/owner/${ownerId}`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadOwner(spots.spots));

    return spots;
  }
};

export const createSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot));
    return spot;
  }
};

export const editSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot));

    return spot;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSpot());

    return response;
  }
};

const initialState = { allSpots: {}, singleSpot: {}, ownerSpots: {} };

export default function spotReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALL:
      action.spots.forEach((spot) => (newState.allSpots[spot.id] = spot));
      // return { ...state, allSpots: action.spots };
      return newState;
    case LOAD_CURR:
      action.spots.forEach((spot) => (newState.ownerSpots[spot.id] = spot));
      return newState;
    // return { ...state, currUserSpots: action.spots };
    case LOAD_ONE:
      return { ...state, singleSpot: action.spot };
    case DELETE_SPOT:
      return { ...state, singleSpot: {} };
    default:
      return state;
  }
}
