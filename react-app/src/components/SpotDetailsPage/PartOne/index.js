import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneSpotThunk } from "../../../store/spots";
import "./index.css";

function PartOne() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [isLoaded, setLoaded] = useState(false);

  const spotDetail = useSelector((state) => state.spots.singleSpot);
  let reviews;
  let images;
  let avgs;

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId)).then(() => setLoaded(true));
  }, [dispatch]);

  if (isLoaded) {
    images = spotDetail.images;
    avgs = spotDetail.averages;
    reviews = spotDetail.reviews;
  }

  return (
    isLoaded && (
      <>
        <div className="top-1 flex">
          <div className="flex-full-width plrt-80-24">
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
                    </span>
                    <span className="avg">{avgs?.avg} · </span>
                    <span className="review-count">
                      <button className="show-review">
                        {" "}
                        {reviews} {reviews > 1 ? "reviews" : "review"}
                      </button>
                    </span>
                  </span>
                  <span className="m-8-0">·</span>
                  {avgs?.avg >= 3.3 && (
                    <span className="mt-4-flex">
                      <span className="mr-4-flex">
                        <i className="fa-solid fa-trophy" />
                      </span>
                      <span className="superhost">Superhost</span>
                    </span>
                  )}
                  <span className="m-8-0">·</span>
                  <span className="mt-4-flex">
                    <button className="show-map">
                      <span className="show-map-address">
                        {spotDetail.city}, {spotDetail.state},{" "}
                        {spotDetail.country}
                      </span>
                    </button>
                  </span>
                </div>
                <div className="flex flex-end">
                  <div>
                    <button className="save-button">
                      <div className="flex center">
                        <span className="mr-8">
                          <svg
                            viewBox="0 0 32 32"
                            className="save-svg"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m 16 28 c 7 -4.733 14 -10 14 -17 c 0 -1.792 -0.683 -3.583 -2.05 -4.95 c -1.367 -1.366 -3.158 -2.05 -4.95 -2.05 c -1.791 0 -3.583 0.684 -4.949 2.05 l -2.051 2.051 l -2.05 -2.051 c -1.367 -1.366 -3.158 -2.05 -4.95 -2.05 c -1.791 0 -3.583 0.684 -4.949 2.05 c -1.367 1.367 -2.051 3.158 -2.051 4.95 c 0 7 7 12.267 14 17 Z"></path>
                          </svg>
                        </span>
                        Save
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="top-2">
          <div className="flex plrt-40">
            <div className="m-auto">
              <div className="pt-24">
                <div className="brd-12">
                  <div className="image-container">
                    <div className="img-1">
                      {/* maybe change it to a button later for reviews all images */}
                      <img
                        className="img-size"
                        src={images[0].url}
                        alt="spot pic"
                      />
                    </div>
                    <div className="flex-column img-2-3">
                      <div className="full-wh">
                        <div className="h-50">
                          <img
                            className="img-size"
                            src={images[1].url}
                            alt="spot pic"
                          />
                        </div>
                        <div className="h-50 pt-8">
                          <img
                            className="img-size"
                            src={images[2].url}
                            alt="spot pic"
                          />
                        </div>
                      </div>
                    </div>
                    {/* come back to change the image display */}
                    <div className="flex-column img-4-5">
                      <div className="full-wh">
                        <div className="h-50">
                          <img
                            className="img-size"
                            src={images[3].url}
                            alt="spot pic"
                          />
                        </div>
                        <div className="h-50 pt-8">
                          <img
                            className="img-size"
                            src={images[4].url}
                            alt="spot pic"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default PartOne;
