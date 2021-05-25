import React from "react";
import Collapsible from "react-collapsible";

import Counter from "../Counter/Counter.jsx";

import "./Details.scss";

const Details = ({ summary, count, children, ...props }) => {
  return (
    <Collapsible
      trigger={
        <div className="trigger-wrapper">
          <div className="summary">{summary}</div>
          {count && <Counter count={count} color="primary" />}
        </div>
      }
      transitionTime={200}
      easing="ease-in-out"
      {...props}
    >
      {children}
    </Collapsible>
  );
};

export default Details;
