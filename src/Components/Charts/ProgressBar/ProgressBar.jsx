import React, { useEffect, useState } from "react";

import "./ProgressBar.scss";

const calcProgress = (value, max, round) => {
  if (value > max) {
    return 100;
  }

  if (round) {
    return ((value / max) * 100).toFixed(0);
  }

  return (value / max) * 100;
};

const ProgressBar = ({
  showPercentage = false,
  value = 0,
  min = 0,
  max = 100,
  round = true,
  bottomText = false,
}) => {
  const [progress, setProgress] = useState(calcProgress(value, max, round));

  useEffect(() => {
    setProgress(calcProgress(value, max, round));
  }, [value, max, round]);

  return (
    <div className="progress-bar">
      <div
        className="wrapper"
        style={{
          width: `${progress}%`,
        }}
      >
        {showPercentage && <span className="percentage">{`${progress}%`}</span>}
      </div>
      {bottomText && (
        <div className="bottom-text">
          <span>{`${value} / ${max}`}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
