import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createReviewThunk,
  editReviewThunk,
  getUserReviewsThunk,
} from "../../../store/reviews";
import "./index.css";

function ReviewForm({ review, type, spotId, setEditModal }) {
  const dispatch = useDispatch();
  const history = useDispatch();

  //   const [content, setContent] = useState(review.content);
  //   const [cleanliness, setCleanliness] = useState(review.cleanliness);
  //   const [check_in, setCheckin] = useState(review.check_in);
  //   const [communicatoin, setCommunication] = useState(review.communicatoin);
  //   const [value, setValue] = useState(review.value);
  //   const [location, setLocation] = useState(review.location);
  //   const [accuracy, setAccuracy] = useState(review.accuracy);

  const [content, setContent] = useState();
  const [cleanliness, setCleanliness] = useState();
  const [check_in, setCheckin] = useState();
  const [communicatoin, setCommunication] = useState();
  const [value, setValue] = useState();
  const [location, setLocation] = useState();
  const [accuracy, setAccuracy] = useState();

  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};

    if (!content)
      newErrors.noContent = "Please enter your review of the place.";
    if (!cleanliness)
      newErrors.noCleanliness = "Please rate the cleanliness of the place.";
    if (!check_in)
      newErrors.noCheckin = "Please rate the check in of the place.";
    if (!communicatoin)
      newErrors.noCommunication = "Please rate the communication of the place.";
    if (!value) newErrors.noValue = "Please rate the value of the spot.";
    if (!location)
      newErrors.noLocation = "Please rate the location of the place.";
    if (!accuracy)
      newErrors.noAccuracy = "Please rate the accuracy of the place.";

    setSubmit(false);
    setErrors(newErrors);
  }, [
    content,
    cleanliness,
    check_in,
    communicatoin,
    value,
    location,
    accuracy,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);
    // review needs to be an object
    cleanliness = parseInt(cleanliness);
    check_in = parseInt(check_in);
    communicatoin = parseInt(communicatoin);
    value = parseInt(value);
    location = parseInt(location);
    accuracy = parseInt(accuracy);

    review = {
      ...review,
      content,
      cleanliness,
      check_in,
      communicatoin,
      value,
      location,
      accuracy,
    };

    if (type === "create") {
      await dispatch(createReviewThunk(spotId, review)).then(() => {
        setEditModal(false);
        history.push(`/users/profile`);
      });
    } else if (type === "edit") {
      await dispatch(editReviewThunk(review))
        .then(() => dispatch(getUserReviewsThunk()))
        .then(() => setEditModal(false));
    }
  };
  //   console.log("clean rating", cleanliness);
  //   console.log("checkin rating", check_in);

  return (
    <form onSubmit={handleSubmit}>
      <div className="cr-form-body flex-column">
        <div className="cr-rating-block">
          <div className="cr-label">Cleanliness</div>
          <div className="cl-block">
            <input
              type="radio"
              id="cl-star5"
              name="rate1"
              value="5"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star5" class="fas fa-star"></label>
            <input
              type="radio"
              id="cl-star4"
              name="rate1"
              value="4"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star4" class="fas fa-star">
              {/* 4 stars */}
            </label>
            <input
              type="radio"
              id="cl-star3"
              name="rate1"
              value="3"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star3" class="fas fa-star"></label>
            <input
              type="radio"
              id="cl-star2"
              name="rate1"
              value="2"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star2" class="fas fa-star"></label>
            <input
              type="radio"
              id="cl-star1"
              name="rate1"
              value="1"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star1" class="fas fa-star"></label>
          </div>
        </div>
        <div className="cr-rating-block">
          <div className="cr-label">Check in</div>
          <div className="cl-block">
            <input
              type="radio"
              id="ci-star5"
              name="rate2"
              value="5"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star5" class="fas fa-star"></label>
            <input
              type="radio"
              id="ci-star4"
              name="rate2"
              value="4"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star4" class="fas fa-star"></label>
            <input
              type="radio"
              id="ci-star3"
              name="rate2"
              value="3"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star3" class="fas fa-star"></label>
            <input
              type="radio"
              id="ci-star2"
              name="rate2"
              value="2"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star2" class="fas fa-star"></label>
            <input
              type="radio"
              id="ci-star1"
              name="rate2"
              value="1"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star1" class="fas fa-star"></label>
          </div>
        </div>
        <div className="cr-rating-block">
          <div className="cr-label">Communication</div>
          <div className="cl-block">
            <input
              type="radio"
              id="cm-star5"
              name="rate3"
              value="5"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star5" class="fas fa-star"></label>
            <input
              type="radio"
              id="cm-star4"
              name="rate3"
              value="4"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star4" class="fas fa-star"></label>
            <input
              type="radio"
              id="cm-star3"
              name="rate3"
              value="3"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star3" class="fas fa-star"></label>
            <input
              type="radio"
              id="cm-star2"
              name="rate3"
              value="2"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star2" class="fas fa-star"></label>
            <input
              type="radio"
              id="cm-star1"
              name="rate3"
              value="1"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star1" class="fas fa-star"></label>
          </div>
        </div>
        <div className="cr-rating-block">
          <div className="cr-label">Value</div>
          <div className="cl-block">
            <input
              type="radio"
              id="va-star5"
              name="rate4"
              value="5"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star5" class="fas fa-star"></label>
            <input
              type="radio"
              id="va-star4"
              name="rate4"
              value="4"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star4" class="fas fa-star"></label>
            <input
              type="radio"
              id="va-star3"
              name="rate4"
              value="3"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star3" class="fas fa-star"></label>
            <input
              type="radio"
              id="va-star2"
              name="rate4"
              value="2"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star2" class="fas fa-star"></label>
            <input
              type="radio"
              id="va-star1"
              name="rate4"
              value="1"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star1" class="fas fa-star"></label>
          </div>
        </div>
        <div className="cr-rating-block">
          <div className="cr-label">Location</div>
          <div className="cl-block">
            <input
              type="radio"
              id="lo-star5"
              name="rate5"
              value="5"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star5" class="fas fa-star"></label>
            <input
              type="radio"
              id="lo-star4"
              name="rate5"
              value="4"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star4" class="fas fa-star"></label>
            <input
              type="radio"
              id="lo-star3"
              name="rate5"
              value="3"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star3" class="fas fa-star"></label>
            <input
              type="radio"
              id="lo-star2"
              name="rate5"
              value="2"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star2" class="fas fa-star"></label>
            <input
              type="radio"
              id="lo-star1"
              name="rate5"
              value="1"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star1" class="fas fa-star"></label>
          </div>
        </div>
        <div className="cr-rating-block">
          <div className="cr-label">Accuracy</div>
          <div className="cl-block">
            <input
              type="radio"
              id="ac-star5"
              name="rate6"
              value="5"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star5" class="fas fa-star"></label>
            <input
              type="radio"
              id="ac-star4"
              name="rate6"
              value="4"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star4" class="fas fa-star"></label>
            <input
              type="radio"
              id="ac-star3"
              name="rate6"
              value="3"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star3" class="fas fa-star"></label>
            <input
              type="radio"
              id="ac-star2"
              name="rate6"
              value="2"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star2" class="fas fa-star"></label>
            <input
              type="radio"
              id="ac-star1"
              name="rate6"
              value="1"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star1" class="fas fa-star"></label>
          </div>
        </div>
        <div className="cr-content-block">
          <div className="cr-content-label">Review</div>
          <textarea
            className="cr-content-text"
            // cols="30"
            rows={5}
            placeholder="Describe your experience"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="cr-bt-block">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
