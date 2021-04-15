import React from "react";
import ReactTooltip from "react-tooltip";

import "./Tooltip.scss";

const Tooltip = ({
  place = "bottom",
  effect = "solid",
  type = "default",
  children,
}) => {
  return (
    <ReactTooltip
      place={place}
      effect={effect}
      className={`tooltip tooltip-${type}`}
    >
      {children}
    </ReactTooltip>
  );
};

export default Tooltip;
