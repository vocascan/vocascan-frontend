import React from "react";

import "./Button.scss";

const Button = ({
  uppercase = false,
  variant = "default",
  disabled = false,
  appearance = "primary",
  block = false,
  onClick = () => null,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${appearance}${disabled ? " btn-disabled" : ""} btn-${variant}${
        uppercase ? " btn-uppercase" : ""
      }${block ? " btn-block" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
