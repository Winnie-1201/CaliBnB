import React, { useEffect, useState } from "react";
import Header from "../Homepage/Header";
import PartOne from "./PartOne";
import "./index.css";
import PartTwo from "./PartTwo";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneSpotThunk, getOwnerSpotsThunk } from "../../store/spots";
import { getSpotReivewsThunk } from "../../store/reviews";
import { getSpotBookingsThunk } from "../../store/bookings";
import PartThree from "./PartThree";
import PartFour from "./PartFour";
import PartFive from "./PartFive";

function SpotDetailsPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [isLoaded, setLoaded] = useState(false);

  const spotDetail = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.spotReviews);
  const bookings = useSelector((state) => state.bookings.spotBookings);
  const ownerSpots = useSelector((state) => state.spots.ownerSpots);
  const owner = spotDetail.owner;

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
      .then((data) => {
        dispatch(getOwnerSpotsThunk(data.owner.id));
      })
      .then(() => dispatch(getSpotReivewsThunk(spotId)))
      .then(() => dispatch(getSpotBookingsThunk(spotId)))
      .then(() => setLoaded(true));
  }, [dispatch, spotId]);

  return (
    isLoaded && (
      <>
        <Header />
        <main className="site-content">
          <PartOne spot={spotDetail} />
          <PartTwo spot={spotDetail} bookings={bookings} />
          <PartThree spot={spotDetail} reviews={reviews} />
          <PartFour />
          <PartFive ownerSpots={ownerSpots} owner={owner} />
        </main>
      </>
    )
  );
}

export default SpotDetailsPage;
