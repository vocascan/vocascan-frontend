import React from "react";

import "./PageIndicator.scss";

const PageIndicator = ({ max, activeState }) => {
  const dots = [...Array(max)].map((_, i) => (
    <div
      key={i}
      className={`indicator-dot ${i === activeState ? "active" : ""}`}
    />
  ));

  return <div className="indicator">{dots}</div>;
};

export default PageIndicator;
