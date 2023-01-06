import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTag } from "../../../context/tag";
import { getAllSpotThunk } from "../../../store/spots";
import "./index.css";

function AllSpots() {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  let spots = useSelector((state) => state.spots.allSpots);
  const { type } = useTag();

  useEffect(() => {
    dispatch(getAllSpotThunk(type)).then(() => setLoaded(true));
  }, [dispatch, type]);

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
                  <div className="flex s-b plr-8">
                    <div className="flex-column left">
                      <div className="location">{spot.city}</div>
                      <div className="type">{spot.type}</div>
                      <div className="date"></div>
                      <div className="price">
                        <span className="price-d">${spot.price}</span> night
                      </div>
                    </div>
                    <div>
                      <div className="flex center">
                        <span className="star-svg-box">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            className="hp-star-svg"
                          >
                            <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
                          </svg>
                        </span>
                        <span className="avg-rating">{spot.averages.avg}</span>
                      </div>
                    </div>
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
