import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

import "./CountdownTimer.scss"

const renderer = ({ days, hours, minutes, seconds, completed }) => {

  if (completed) {
    // Render a completed state
    return <span className="countdown-timer-expired">Expired</span>;
  } else {
    // Render a countdown
    return (
      <span className="countdown-timer-running">
        {("00" + days).substr(-2)}:{("00" + hours).substr(-2)}:
        {("00" + minutes).substr(-2)}:{("00" + seconds).substr(-2)}
      </span>
    );
  }
};
const CountdownTimer = ({ callQueuedTime }) => {
  return <Countdown date={callQueuedTime} renderer={renderer} />;
};

export default CountdownTimer;
