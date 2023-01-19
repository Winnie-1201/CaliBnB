import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import { DayPickerRangeController, isInclusivelyAfterDay } from "react-dates";
import { extendMoment } from "moment-range";
import "./DatePicker.css";
import { getSpotBookingsThunk } from "../../../store/bookings";

function CalendarForm({
  start,
  end,
  setStartDate,
  setEndDate,
  setStartSelected,
  setEndSelected,
}) {
  const dispatch = useDispatch();
  const moment = extendMoment(Moment);

  const spot = useSelector((state) => state.spots.singleSpot);
  const bookings = useSelector((state) => state.bookings.spotBookings);

  const [focusedInput, setFocusedInput] = useState("startDate");
  // const [unvaliable, setUnvaliable] = useState([]);

  useEffect(() => {
    dispatch(getSpotBookingsThunk(spot.id));
  }, [dispatch]);

  const isDayBlocked = (date) => {
    let bookedDate = [];

    // console.log("date in isdayblock", date);

    // if the start date selected before the most recent unavaliable date
    // the dates after that date should be unavaliable
    const bookingArr = Object.values(bookings);

    bookingArr.forEach((b) => {
      const unvaliableRange = moment.range(b.start, b.end);
      bookedDate.push(unvaliableRange);
      // console.log("bookedDate", unvaliableRange);
    });
    // console.log("booked date in cal", bookedDate);

    const blockedDates = bookedDate.find((dateRange) =>
      dateRange.contains(date)
    );
    return blockedDates;
  };

  const onDatesChange = (dates) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
    setStartSelected(dates.startDate);
    setEndSelected(dates.endDate);
  };

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  return (
    <DayPickerRangeController
      numberOfMonths={2}
      minimumNights={2}
      isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
      onDatesChange={onDatesChange}
      onFocusChange={onFocusChange}
      focusedInput={focusedInput || "startDate"}
      startDate={start}
      endDate={end}
      isDayBlocked={isDayBlocked}
      //   initialVisibleMonth={() => moment().add(2, "M")} // PropTypes.func or null,
      //   startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      //   startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      //   endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      //   endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      //   onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
      //   focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      //   onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
    />
  );
}

export default CalendarForm;
