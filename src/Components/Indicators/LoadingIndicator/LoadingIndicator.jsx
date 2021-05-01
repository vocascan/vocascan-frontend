import React from "react";

import "./LoadingIndicator.scss";

const LoadingIndicator = ({ size, position }) => {
  return (
    <div className={`loadingIndicator ${position ? position : ""}`}>
      <div className={`${size ? size : ""}`}></div>
    </div>
  );
};

export default LoadingIndicator;
