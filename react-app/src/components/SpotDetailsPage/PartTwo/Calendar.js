import React, { useState } from "react";
// import Calendar from "react-calendar";
import "react-dates/initialize";
import { DayPickerRangeController, isInclusivelyAfterDay } from "react-dates";

import moment from "moment";
// import "react-dates/lib/css/_datepicker.css";

// import "./Calendar.css";
import "./DatePicker.css";

function CalendarForm({
  start,
  end,
  setStartDate,
  setEndDate,
  setStartSelected,
  setEndSelected,
}) {
  //   const [startDate, setStartDate] = useState(moment());
  //   const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState("startDate");

  const onDatesChange = (dates) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
    setStartSelected(dates.startDate);
    setEndSelected(dates.endDate);
    // console.log("start and end date", dates.startDate, dates.endDate);
  };

  const onFocusChange = (focusedInput) => {
    console.log("focus", focusedInput);
    setFocusedInput(focusedInput);
  };

  //   console.log("startdate", start);
  //   console.log("enddate", end);
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
