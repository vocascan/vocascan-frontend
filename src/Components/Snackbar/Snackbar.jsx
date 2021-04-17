import clsx from "clsx";
import React, { useContext } from "react";

import SnackbarContext from "../../context/SnackbarContext.jsx";

import "./Snackbar.scss";

const Snackbar = () => {
  const { snack } = useContext(SnackbarContext);

  const classes = clsx(
    "snackbar",
    `snackbar-${snack.variant}`,
    snack.show && "show"
  );

  return (
    <div className={classes}>
      <span className="snackbar-text">{snack.text}</span>
    </div>
  );
};

export default Snackbar;
