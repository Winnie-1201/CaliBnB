import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpotThunk } from "../../../store/spots";
import "./index.css";

function AllSpots() {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  let spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpotThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  if (loaded) {
    spots = Object.values(spots);
  }

  return (
    loaded && (
      <div className="main-inner">
        <div className="grid">
          {spots.map((spot) => (
            <NavLink
              key={spot.id}
              to={`/spots/${spot.id}`}
              className="navlink-hp"
            >
              <div className="grid-column">
                <div className="flex one-spot">
                  <div className="mb-12">
                    <img
                      className="one-spot-img"
                      src={spot.images[0].url}
                      alt="spot"
                    />
                  </div>
                  <div className="flex start">
                    <div className="flex-column left">
                      <div className="location">
                        {spot.city}, {spot.state}
                      </div>
                      <div className="name">{spot.name}</div>
                      <div className="date"></div>
                      <div className="price">${spot.price} night</div>
                    </div>
                    <div className="flex right">rating</div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    )
  );
}

export default AllSpots;
