import React from "react";
import { useHistory } from "react-router-dom";
import { dateTransfer } from "../../dateTransfer";
import "./index.css";

function SpotCard({ spots }) {
  const history = useHistory();

  const userSpots = Object.values(spots);

  const handleEdit = (e, spotId) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/edit`);
  };

  return (
    <>
      {userSpots.map((spot) => (
        <div className="sc-one flex" key={spot.id}>
          <div className="flex-column w-70">
            <div className="sc-img-container">
              <img className="cs-img" src={spot.preview_img} alt="spot image" />
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
            <div className="sc-del mtb-16-24">
              <button className="sc-del-bt">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SpotCard;
