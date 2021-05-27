import React from "react";

import "./Counter.scss";

const Counter = ({ count, color }) => {
  return <span className={`counter ${color}`}>{count}</span>;
};

export default Counter;
