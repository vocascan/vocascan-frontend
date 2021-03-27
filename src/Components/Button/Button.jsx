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
  const classes = ["btn", `btn-${appearance}`, `btn-${variant}`];

  uppercase && classes.push("btn-uppercase");
  block && classes.push("btn-block");
  disabled && classes.push("btn-disabled");


  return (
    <button
      onClick={onClick}
      className={classes.join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
