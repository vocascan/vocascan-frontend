import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <p>Expired</p>;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};
const CountdownTimer = ({ callQueuedTime }) => {
  return <Countdown date={callQueuedTime} renderer={renderer} />;
};

export default CountdownTimer;
