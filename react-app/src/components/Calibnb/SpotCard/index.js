import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getImgsBySpotThunk } from "../../../store/images";
import {
  deleteSpotThunk,
  getOneSpotThunk,
  getOwnerSpotsThunk,
} from "../../../store/spots";
import { dateTransfer } from "../../dateTransfer";
import "./index.css";

function SpotCard({ spots }) {
  const history = useHistory();
  const dispatch = useDispatch();

  // const userSpots = Object.values(spots);

  const userSpots = Object.values(
    useSelector((state) => state.spots.ownerSpots)
  );
  const currUser = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   dispatch(getOwnerSpotsThunk(currUser.id));
  // }, [dispatch]);

  const handleEdit = (e, spotId) => {
    e.preventDefault();
    console.log("go in the edit page");
    dispatch(getOneSpotThunk(spotId))
      .then(() => dispatch(getImgsBySpotThunk(spotId)))
      .then(() => history.push(`/spots/${spotId}/edit`));
  };

  // const handleDelete = (e, spotId) => {
  //   e.preventDefault();
  //   dispatch(deleteSpotThunk(spotId));
  // };
  // if (!userSpots) return null;

  console.log("userSpot in comp", userSpots);

  return (
    <>
      {userSpots.map((spot) => (
        <div className="sc-one flex" key={spot.id}>
          <div className="flex-column w-70">
            <div className="sc-img-container">
              <img
                className="cs-img"
                src={spot.images[0]?.url}
                alt="spot image"
              />
            </div>
            <div className="sc-date">
              <div className="sc-date-text">
                Posted {dateTransfer("month", spot.created)},{" "}
                {dateTransfer("year", spot.created)}
              </div>
            </div>
          </div>
          <div className="sc-buttons flex-column">
            <div className="sc-edit" onClick={(e) => handleEdit(e, spot.id)}>
              <button className="sc-edit-bt">Edit</button>
            </div>
            <div
              className="sc-del mtb-16-24"
              onClick={async () => {
                await dispatch(deleteSpotThunk(spot.id)).then(() =>
                  dispatch(getOwnerSpotsThunk(currUser.id))
                );
              }}
            >
              <button className="sc-del-bt">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SpotCard;
