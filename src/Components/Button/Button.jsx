import clsx from "clsx";
import React from "react";

const Button = ({
  uppercase = false,
  variant = "default",
  disabled = false,
  appearance = "primary",
  block = false,
  onClick = () => null,
  children,
  className = "",
  ...props
}) => {
  const defaultStyleClass = clsx(
    appearance === "primary" &&
      "bg-primary-standard hover:cursor-pointer hover:bg-primary-dark-standard",
    appearance === "primary-light" &&
      "bg-primary-light hover:cursor-pointer hover:bg-primary-standard hover:text-white",
    appearance === "red" &&
      "bg-red-standard hover:cursor-pointer hover:bg-red-dark",
    appearance === "green" &&
      "bg-green-standard hover:cursor-pointer hover:bg-green-dark",
    appearance === "dark" &&
      "bg-background-inverse hover:cursor-pointer hover:bg-alternative"
  );

  const outlineStyleClass = clsx(
    appearance === "primary" &&
      "bg-transparent text-primary-standard border border-solid border-primary-standard hover:bg-primary-standard hover:text-white hover:cursor-pointer",
    appearance === "primary-light" &&
      "bg-transparent text-primary-light border border-solid border-primary-light hover:bg-primary-light hover:text-white hover:cursor-pointer",
    appearance === "red" &&
      "bg-transparent text-red-standard border border-solid border-red-standard hover:bg-red-standard hover:text-white hover:cursor-pointer",
    appearance === "green" &&
      "bg-transparent text-green-standard border border-solid border-green-standard hover:bg-green-standard hover:text-white hover:cursor-pointer"
  );

  const transparentStyleClass = clsx(
    appearance === "primary" &&
      "bg-transparent text-primary-standard hover:bg-background-muted hover:text-primary-dark hover:cursor-pointer",
    appearance === "primary-light" &&
      "bg-transparent text-primary-light hover:bg-background-muted hover:text-primary-light hover:cursor-pointer",
    appearance === "red" &&
      "bg-transparent text-red-standard hover:bg-background-muted hover:text-red-dark hover:cursor-pointer",
    appearance === "green" &&
      "bg-transparent text-green-standard hover:bg-background-muted hover:text-green-dark hover:cursor-pointer"
  );

  const linkStyleClass = clsx(
    appearance === "primary" &&
      "bg-transparent p-0 text-primary-standard hover:text-primary-light hover:cursor-pointer",
    appearance === "primary-light" &&
      "bg-transparent p-0 text-primary-light hover:text-primary-light hover:cursor-pointer",
    appearance === "red" &&
      "bg-transparent p-0 text-red-standard hover:text-red-light hover:cursor-pointer",
    appearance === "green" &&
      "bg-transparent p-0 text-green-standard hover:text-green-light hover:cursor-pointer"
  );
  const classes = clsx(
    "flex py-2 px-3 text-base normal-case text-white justify-center items-center rounded-2xl ease-in duration-300",
    variant === "default" && defaultStyleClass,
    variant === "outline" && outlineStyleClass,
    variant === "transparent" && transparentStyleClass,
    variant === "link" && linkStyleClass,
    uppercase && "uppercase",
    block && "w-full",
    disabled && "pointer-events-none opacity-50",
    className
  );

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
