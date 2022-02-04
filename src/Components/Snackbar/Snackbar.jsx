import clsx from "clsx";
import React, { useContext } from "react";

import SnackbarContext from "../../context/SnackbarContext.jsx";

import "./Snackbar.scss";

const Snackbar = () => {
  const { snack } = useContext(SnackbarContext);

  const classes = clsx(
    snack.variant === "success" && "bg-green-light text-green-dark",
    snack.variant === "error" && "bg-red-light text-red-dark",
    snack.variant === "info" && "bg-primary-light text-primary-dark-standard",
    snack.show && "select-none opacity-1 transition-all ease-in duration-400",
    !snack.show && "opacity-0"
  );

  return (
    <div
      className={`w-72 absolute bottom-4 flex left-0 right-0 ml-auto mr-auto justify-center py-2.5 px-5 rounded-lg z-50 transition-all ease-in duration-400 ${classes} md:left-auto md:right-4 md:ml-0 md:mr-0`}
    >
      <span className="font-size text-base font-normal">{snack.text}</span>
    </div>
  );
};

export default Snackbar;
