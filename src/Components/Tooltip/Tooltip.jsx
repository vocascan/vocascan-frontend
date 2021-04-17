import React from "react";
import ReactTooltip from "react-tooltip";

import "./Tooltip.scss";

const Tooltip = ({
  place = "bottom",
  effect = "solid",
  type = "default",
  id = null,
  children,
}) => {
  return (
    <ReactTooltip
      id={id}
      place={place}
      effect={effect}
      className={`tooltip tooltip-${type}`}
    >
      {children}
    </ReactTooltip>
  );
};

export default Tooltip;
