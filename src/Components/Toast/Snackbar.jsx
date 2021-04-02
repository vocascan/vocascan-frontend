import clsx from "clsx";
import React from "react";

import "./Snackbar.scss";

const Snackbar = ({ text, show = false, variant = "success" }) => {
  const classes = clsx("snackbar", `snackbar-${variant}`, show && "show");

  return (
    <div className={classes}>
      <span className="snackbar-text">{text}</span>
    </div>
  );
};

export default Snackbar;
