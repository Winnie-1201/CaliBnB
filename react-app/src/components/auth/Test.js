import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotThunk } from "../../store/spots";

function Test() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpotThunk());
  }, [dispatch]);

  return (
    <ul>
      {spots.map((spot) => (
        <li key={spot.id}>{spot.name}</li>
      ))}
    </ul>
  );
}

export default Test;
