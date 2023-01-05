import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviewsThunk } from "../../../store/reviews";
import { dateTransfer } from "../../dateTransfer";
import "./index.css";

function ReviewsByYou() {
  const dispatch = useDispatch();
  const history = useHistory();

  // const currUser = useSelector(state => state.session.user)
  const userReviews = useSelector((state) => state.reviews.userReviews);

  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   dispatch(getUserReviewsThunk()).then(() => setLoaded(true));
  // }, [dispatch]);

  // console.log("userReview ----", userReviews);

  return (
    // loaded && (
    <>
      <h2 className="rp-header-h2 flex center">
        <div className="mr-8">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="rp-star-svg"
          >
            <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
          </svg>
        </div>
        {Object.values(userReviews).length >= 1
          ? Object.values(userReviews).length + " reivews"
          : Object.values(userReviews).length + " review"}
      </h2>
      <div className="rp-body">
        {Object.values(userReviews).length > 0 ? (
          <section>
            {Object.values(userReviews).map((review) => (
              <div className="rp-block" key={review.id}>
                <div className="flex">
                  <div className="rp-block-left">
                    <div
                      className="link-to-sd"
                      onClick={() => history.push(`/spots/${review.spot.id}`)}
                    >
                      <img
                        src={review.spot.owner.icon}
                        className="rp-owner-icon"
                      />
                    </div>
                    <div className="flex-column">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                  <div className="rp-block-right">
                    <div className="rp-owner-info">
                      <span className="rp-owner-name">
                        {review.spot.owner.firstName}
                      </span>
                      <span className="rp-date">
                        {dateTransfer("month", review.created) +
                          " " +
                          dateTransfer("year", review.created)}
                      </span>
                    </div>
                    <div className="mt-16">
                      <div className="rp-content">
                        {review.content}
                        {/* {review.content.length > 255 ? (
                            review.content
                          )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <></>
        )}
      </div>
    </>
    // )
  );
}

export default ReviewsByYou;
