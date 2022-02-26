import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";

const Expired = () => {
  const { t } = useTranslation();
  return (
    <span className="text-red-standard">
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
      <span className="text-green-standard">
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
