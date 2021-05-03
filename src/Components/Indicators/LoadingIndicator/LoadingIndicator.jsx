import React from "react";

import "./LoadingIndicator.scss";

const LoadingIndicator = ({ size, position }) => {
  return (
    <div className={`loading-indicator ${position ? position : ""}`}>
      <div className={`circle ${size ? size : ""}`}></div>
    </div>
  );
};

export default LoadingIndicator;
