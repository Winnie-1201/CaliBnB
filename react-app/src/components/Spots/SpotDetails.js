import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSpotReivewsThunk } from "../../store/reviews";
import { getOneSpotThunk } from "../../store/spots";
import Header from "../Homepage/Header";
import "./SpotDetails.css";

function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spotDetail = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.spot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    dispatch(getSpotReivewsThunk(spotId));
  }, [dispatch]);

  // const rating = spotDetail.

  return (
    <>
      <Header />
      <main className="site-content">
        <div>
          <div className="top-1">
            <div className="flex plrt-80-24">
              <section>
                <div className="mb-4px">
                  <span className="top-1-text">
                    <h1 className="top-1-text">{spotDetail.name}</h1>
                  </span>
                </div>
                <div className="flex s-b">
                  <div className="flex mt-0 fw">
                    <span className="mt-4-flex">
                      <span className="mr-4-flex">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          className="star-top-1"
                        >
                          <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
                        </svg>
                        {/* <i class="fa-solid fa-star-top" /> */}
                      </span>
                    </span>
                    <span className="m-8-0">·</span>
                    <span className="mt-4-flex"></span>
                    <span className="m-8-0">·</span>
                    <span className="mt-4-flex"></span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="top-2"></div>
        </div>
      </main>
    </>
  );
}

export default SpotDetails;
