import React from "react";

import "./ProgressBar.scss";

const ProgressBar = ({
  showPercentage = false,
  value = 0,
  min = 0,
  max = 100,
  round = true,
  bottomText = false,
}) => {
  return (
    <div className="progress-bar">
      <div
        className="wrapper"
        style={{
          width: `${
            round ? ((value / max) * 100).toFixed(0) : (value / max) * 100
          }%`,
        }}
      >
        {showPercentage && (
          <span className="percentage">{`${
            round ? value.toFixed(0) : value
          }%`}</span>
        )}
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
