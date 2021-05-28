import React from "react";

import "./PageIndicator.scss";

const PageIndicator = ({ max, pageNumber }) => {
  const dots = [...Array(max)].map((_, i) => (
    <div
      key={i}
      className={`indicator-dot ${i === pageNumber ? "active" : ""}`}
    />
  ));

  return <div className="indicator">{dots}</div>;
};

export default PageIndicator;
