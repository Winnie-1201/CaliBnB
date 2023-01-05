import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createReviewThunk,
  editReviewThunk,
  getUserReviewsThunk,
} from "../../../store/reviews";

function ReviewForm({ review, type, spotId, setEditModal }) {
  const dispatch = useDispatch();
  const history = useDispatch();

  const [content, setContent] = useState(review.content);
  const [cleanliness, setCleanliness] = useState(review.cleanliness);
  const [check_in, setCheckin] = useState(review.check_in);
  const [communicatoin, setCommunication] = useState(review.communicatoin);
  const [value, setValue] = useState(review.value);
  const [location, setLocation] = useState(review.location);
  const [accuracy, setAccuracy] = useState(review.accuracy);

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
        history.push(`/users/profile`);
      });
    } else if (type === "edit") {
      await dispatch(editReviewThunk(review))
        .then(() => dispatch(getUserReviewsThunk()))
        .then(() => setEditModal(false));
    }
    // const newReview = type === "create"
    // ? await dispatch(createReviewThunk(spotId, review))
    // : await dispatch(editReviewThunk(review))

    // if (newReview) {
    //     // close the modal and re-render the page
    // }
  };

  return <div>index</div>;
}

export default ReviewForm;
