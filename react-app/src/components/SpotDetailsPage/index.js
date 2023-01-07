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
import { getImgsBySpotThunk } from "../../store/images";
import LoadingBlock from "../LoadingBlock";

function SpotDetailsPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [isLoaded, setLoaded] = useState(false);

  const spotDetail = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.spotReviews);
  const bookings = useSelector((state) => state.bookings.spotBookings);
  const ownerSpots = useSelector((state) => state.spots.ownerSpots);
  const images = useSelector((state) => state.images.allImages[spotId]);
  const owner = spotDetail?.owner;

  // console.log("go in n");

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
      // .then((data) => {
      //   dispatch(getOwnerSpotsThunk(data.owner.id));
      // })
      .then(() => dispatch(getSpotReivewsThunk(spotId)))
      .then(() => dispatch(getSpotBookingsThunk(spotId)))
      .then(() => dispatch(getImgsBySpotThunk(spotId)))
      .then(() => setLoaded(true));
  }, [dispatch, spotId]);

  // console.log("all images", images);

  return (
    <>
      <Header />
      {!isLoaded && <LoadingBlock />}
      {isLoaded && (
        <main className="site-content">
          <PartOne spot={spotDetail} imgs={images} />
          <PartTwo spot={spotDetail} bookings={bookings} />
          <PartThree spot={spotDetail} reviews={reviews} />
          {/* <PartFour /> */}
          <PartFive ownerSpots={ownerSpots} owner={owner} />
        </main>
      )}
    </>
  );
}

export default SpotDetailsPage;
