import React from "react";

import "./Indicator.scss";

const Indicator = ({ max, activeState }) => {
  let dots = [];
  //render indicator dots
  for (let i = 0; i < max; ++i) {
    dots.push(
      <div
        key={i}
        className={`indicator-dot ${i === activeState ? "active" : ""}`}
      ></div>
    );
  }

  return <div className="indicator">{dots}</div>;
};

export default Indicator;
