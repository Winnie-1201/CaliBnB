const LOAD_ALL = "spots/loadAllSpots";

const loadAll = (spots) => ({
  type: LOAD_ALL,
  spots,
});

export const getAllSpotThunk = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadAll(spots.spots));

    return spots;
  }
};

const initialState = { allSpots: {}, singleSpot: {} };

export default function spotReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL:
      return { ...state, allSpots: action.spots };
    default:
      return state;
  }
}
