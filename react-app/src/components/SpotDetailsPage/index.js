import React, { useEffect, useState } from "react";
import Header from "../Homepage/Header";
import PartOne from "./PartOne";
import "./index.css";
import PartTwo from "./PartTwo";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneSpotThunk } from "../../store/spots";

function SpotDetailsPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [isLoaded, setLoaded] = useState(false);

  const spotDetail = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId)).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Header />
        <main className="site-content">
          <PartOne spot={spotDetail} />
          <PartTwo spot={spotDetail} />
        </main>
      </>
    )
  );
}

export default SpotDetailsPage;
