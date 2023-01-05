import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  createReviewThunk,
  editReviewThunk,
  getUserReviewsThunk,
} from "../../../store/reviews";
import "./index.css";

function ReviewForm({ review, type, setReviewModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  //   const [content, setContent] = useState(review.content);
  //   const [cleanliness, setCleanliness] = useState(review.cleanliness);
  //   const [check_in, setCheckin] = useState(review.check_in);
  //   const [communicatoin, setCommunication] = useState(review.communicatoin);
  //   const [value, setValue] = useState(review.value);
  //   const [location, setLocation] = useState(review.location);
  //   const [accuracy, setAccuracy] = useState(review.accuracy);

  const [content, setContent] = useState("");
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

    // console.log("cleaness in use effect", cleanliness);
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
    // console.log("not error", Object.values(errors).length);
    if (Object.values(errors).length === 0) {
      const cl = parseInt(cleanliness);
      const ch = parseInt(check_in);
      const cm = parseInt(communicatoin);
      const va = parseInt(value);
      const lo = parseInt(location);
      const ac = parseInt(accuracy);

      review = {
        content: content,
        cleanliness: cl,
        check_in: ch,
        communicatoin: cm,
        value: va,
        location: lo,
        accuracy: ac,
      };

      if (type === "create") {
        await dispatch(createReviewThunk(spotId, review)).then(() => {
          setReviewModal(false);
          history.push(`/users/profile`);
        });
      } else if (type === "edit") {
        await dispatch(editReviewThunk(review))
          .then(() => dispatch(getUserReviewsThunk()))
          .then(() => setReviewModal(false));
      } else {
        await dispatch(createReviewThunk(spotId, review)).then(() => {
          // setReviewModal(false);
          history.push(`/users/profile`);
        });
      }
    }
  };

  // const hangleClean = (e) => {
  //   e.preventDefault();
  //   console.log("e.target.value", e.target.value, e.target);
  //   setCleanliness(e.target.value);
  // };

  // const handleContent = (e) => {
  //   e.preventDefault();
  //   console.log("e content", e.target.value);
  //   setContent(e.target.value);
  // };
  // console.log(
  //   "clean rating",
  //   cleanliness,
  //   check_in,
  //   communicatoin,
  //   value,
  //   location,
  //   accuracy
  // );
  // console.log("errors", errors);

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
              // onChange={(e) => {
              //   console.log("e.target.value", e.target.value, cleanliness);
              //   setCleanliness(e.target.value);
              // }}
            />
            <label htmlFor="cl-star5" className="fas fa-star"></label>
            <input
              type="radio"
              id="cl-star4"
              name="rate1"
              value="4"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star4" className="fas fa-star">
              {/* 4 stars */}
            </label>
            <input
              type="radio"
              id="cl-star3"
              name="rate1"
              value="3"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star3" className="fas fa-star"></label>
            <input
              type="radio"
              id="cl-star2"
              name="rate1"
              value="2"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star2" className="fas fa-star"></label>
            <input
              type="radio"
              id="cl-star1"
              name="rate1"
              value="1"
              onChange={(e) => setCleanliness(e.target.value)}
            />
            <label htmlFor="cl-star1" className="fas fa-star"></label>
          </div>
          {submit && errors.noCleanliness && (
            <div className="cr-form-error">
              <span>{errors.noCleanliness}</span>
            </div>
          )}
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
            <label htmlFor="ci-star5" className="fas fa-star"></label>
            <input
              type="radio"
              id="ci-star4"
              name="rate2"
              value="4"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star4" className="fas fa-star"></label>
            <input
              type="radio"
              id="ci-star3"
              name="rate2"
              value="3"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star3" className="fas fa-star"></label>
            <input
              type="radio"
              id="ci-star2"
              name="rate2"
              value="2"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star2" className="fas fa-star"></label>
            <input
              type="radio"
              id="ci-star1"
              name="rate2"
              value="1"
              onChange={(e) => setCheckin(e.target.value)}
            />
            <label htmlFor="ci-star1" className="fas fa-star"></label>
          </div>
          {submit && errors.noCheckin && (
            <div className="cr-form-error">
              <span>{errors.noCheckin}</span>
            </div>
          )}
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
            <label htmlFor="cm-star5" className="fas fa-star"></label>
            <input
              type="radio"
              id="cm-star4"
              name="rate3"
              value="4"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star4" className="fas fa-star"></label>
            <input
              type="radio"
              id="cm-star3"
              name="rate3"
              value="3"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star3" className="fas fa-star"></label>
            <input
              type="radio"
              id="cm-star2"
              name="rate3"
              value="2"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star2" className="fas fa-star"></label>
            <input
              type="radio"
              id="cm-star1"
              name="rate3"
              value="1"
              onChange={(e) => setCommunication(e.target.value)}
            />
            <label htmlFor="cm-star1" className="fas fa-star"></label>
          </div>
          {submit && errors.noCommunication && (
            <div className="cr-form-error">
              <span>{errors.noCommunication}</span>
            </div>
          )}
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
            <label htmlFor="va-star5" className="fas fa-star"></label>
            <input
              type="radio"
              id="va-star4"
              name="rate4"
              value="4"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star4" className="fas fa-star"></label>
            <input
              type="radio"
              id="va-star3"
              name="rate4"
              value="3"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star3" className="fas fa-star"></label>
            <input
              type="radio"
              id="va-star2"
              name="rate4"
              value="2"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star2" className="fas fa-star"></label>
            <input
              type="radio"
              id="va-star1"
              name="rate4"
              value="1"
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="va-star1" className="fas fa-star"></label>
          </div>
          {submit && errors.noValue && (
            <div className="cr-form-error">
              <span>{errors.noValue}</span>
            </div>
          )}
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
            <label htmlFor="lo-star5" className="fas fa-star"></label>
            <input
              type="radio"
              id="lo-star4"
              name="rate5"
              value="4"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star4" className="fas fa-star"></label>
            <input
              type="radio"
              id="lo-star3"
              name="rate5"
              value="3"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star3" className="fas fa-star"></label>
            <input
              type="radio"
              id="lo-star2"
              name="rate5"
              value="2"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star2" className="fas fa-star"></label>
            <input
              type="radio"
              id="lo-star1"
              name="rate5"
              value="1"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="lo-star1" className="fas fa-star"></label>
          </div>
          {submit && errors.noLocation && (
            <div className="cr-form-error">
              <span>{errors.noLocation}</span>
            </div>
          )}
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
            <label htmlFor="ac-star5" className="fas fa-star"></label>
            <input
              type="radio"
              id="ac-star4"
              name="rate6"
              value="4"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star4" className="fas fa-star"></label>
            <input
              type="radio"
              id="ac-star3"
              name="rate6"
              value="3"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star3" className="fas fa-star"></label>
            <input
              type="radio"
              id="ac-star2"
              name="rate6"
              value="2"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star2" className="fas fa-star"></label>
            <input
              type="radio"
              id="ac-star1"
              name="rate6"
              value="1"
              onChange={(e) => setAccuracy(e.target.value)}
            />
            <label htmlFor="ac-star1" className="fas fa-star"></label>
          </div>
          {submit && errors.noAccuracy && (
            <div className="cr-form-error">
              <span>{errors.noAccuracy}</span>
            </div>
          )}
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

          {submit && errors.noContent && (
            <div className="cr-form-error">
              <span>{errors.noContent}</span>
            </div>
          )}
        </div>
        <div className="flex s-b plr-8">
          <button className="cr-bt-block" onClick={() => setReviewModal(false)}>
            <span>Cancel</span>
          </button>
          <button className="cr-bt-block" onClick={handleSubmit}>
            <span>Submit</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
