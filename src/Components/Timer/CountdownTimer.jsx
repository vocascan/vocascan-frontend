import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";

import "./CountdownTimer.scss";

const Expired = () => {
  const { t } = useTranslation();
  return (
    <span className="countdown-timer-expired">
      {t("components.inviteCode.expired")}
    </span>
  );
};

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Expired />;
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
