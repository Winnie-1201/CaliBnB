import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import { DayPickerRangeController, isInclusivelyAfterDay } from "react-dates";
import Moment from "moment";
import { extendMoment } from "moment-range";
import "./DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
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
  const [unvaliable, setUnvaliable] = useState([]);

  // console.log("bookings", bookings);
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
    // <div className="flex calender-container w-100">
    //   <div className="flex-column w-100">
    //     <div className="cal-top flex">
    //       <Calendar calendarType="US" minDetail="month" />
    //       <Calendar calendarType="US" minDetail="month" />
    //     </div>
    //     <div className="cal-bottom flex center s-b">
    //       <div className="cal-clear">
    //         <button className="cal-clear-button">Clear dates</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="app">
    //   <h1>React Calendar with Range</h1>
    //   <div>
    //     <Calendar onChange={setDate} value={date} selectRange={true} />
    //   </div>
    //   {date.length > 0 ? (
    //     <p>
    //       <span>Start:</span> {date[0].toDateString()}
    //       &nbsp; to &nbsp;
    //       <span>End:</span> {date[1].toDateString()}
    //     </p>
    //   ) : (
    //     <p>
    //       <span>Default selected date:</span> {date.toDateString()}
    //     </p>
    //   )}
    // </div>
  );
}

export default CalendarForm;
