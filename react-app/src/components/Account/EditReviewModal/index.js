import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editReviewThunk, getUserReviewsThunk } from "../../../store/reviews";

function EditReviewModal({ setEditReviewModal, review }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState(review.content);
  const [cleanliness, setCleanliness] = useState(review.cleanliness);
  const [check_in, setCheckin] = useState(review.check_in);
  const [communication, setCommunication] = useState(review.communication);
  const [value, setValue] = useState(review.value);
  const [location, setLocation] = useState(review.location);
  const [accuracy, setAccuracy] = useState(review.accuracy);

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
    if (!communication)
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
    communication,
    value,
    location,
    accuracy,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);
    const newReview = {
      content,
      cleanliness,
      check_in,
      communication,
      value,
      location,
      accuracy,
    };

    if (Object.values(errors).length === 0) {
      await dispatch(editReviewThunk(newReview, review.id))
        .then(async () => await dispatch(getUserReviewsThunk()))
        .then(() => setEditReviewModal(false));
    }
  };

  const rating = [5, 4, 3, 2, 1];
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="cr-form-box">
          <div className="cr-form-body flex-column">
            <div className="cr-rating-block">
              <div className="cr-label">
                Cleanliness
                <select
                  name="cleanRate"
                  value={cleanliness}
                  onChange={(e) => setCleanliness(parseInt(e.target.value))}
                >
                  {rating.map((r) => (
                    <option key={"cl" + r}>{r}</option>
                  ))}
                </select>
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
                <select
                  name="checkinRate"
                  value={check_in}
                  onChange={(e) => setCheckin(parseInt(e.target.value))}
                >
                  {rating.map((r) => (
                    <option key={"ch" + r}>{r}</option>
                  ))}
                </select>
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
                <select
                  name="commuRate"
                  value={communication}
                  onChange={(e) => setCommunication(parseInt(e.target.value))}
                >
                  {rating.map((r) => (
                    <option key={"cm" + r}>{r}</option>
                  ))}
                </select>
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
                <select
                  name="valueRate"
                  value={value}
                  onChange={(e) => setValue(parseInt(e.target.value))}
                >
                  {rating.map((r) => (
                    <option key={"va" + r}>{r}</option>
                  ))}
                </select>
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
                <select
                  name="locaRate"
                  value={location}
                  onChange={(e) => setLocation(parseInt(e.target.value))}
                >
                  {rating.map((r) => (
                    <option key={"lo" + r}>{r}</option>
                  ))}
                </select>
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
                <select
                  name="accRate"
                  value={accuracy}
                  onChange={(e) => setAccuracy(parseInt(e.target.value))}
                >
                  {rating.map((r) => (
                    <option key={"ac" + r}>{r}</option>
                  ))}
                </select>
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
              <button
                className="cr-bt-block"
                onClick={() => setEditReviewModal(false)}
              >
                <span>Cancel</span>
              </button>
              <button className="cr-bt-block" onClick={handleSubmit}>
                <span>Submit</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditReviewModal;
