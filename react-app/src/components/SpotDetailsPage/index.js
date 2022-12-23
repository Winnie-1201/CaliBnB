import React, { useEffect, useState } from "react";
import Header from "../Homepage/Header";
import PartOne from "./PartOne";
import "./index.css";
import PartTwo from "./PartTwo";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneSpotThunk } from "../../store/spots";
import { getSpotReivewsThunk } from "../../store/reviews";
import { getSpotBookingsThunk } from "../../store/bookings";

function SpotDetailsPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [isLoaded, setLoaded] = useState(false);

  const spotDetail = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.spotReviews);
  const bookings = useSelector((state) => state.bookings.spotBookings);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
      .then(() => dispatch(getSpotReivewsThunk(spotId)))
      .then(() => dispatch(getSpotBookingsThunk(spotId)))
      .then(() => setLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Header />
        <main className="site-content">
          <PartOne spot={spotDetail} />
          <PartTwo spot={spotDetail} bookings={bookings} />
        </main>
      </>
    )
  );
}

export default SpotDetailsPage;
