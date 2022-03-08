import clsx from "clsx";
import React from "react";

const Counter = ({ count, color }) => {
  const colorClass = clsx(
    color === "primary" && "bg-primary-standard",
    color === "primary-dark" && "bg-primary-dark-standard",
    color === "background-inverse" && "bg-background-inverse"
  );
  return (
    <span
      className={`inline-block text-white min-w-[7px] h-5 py-0 px-2 text-xs leading-5 text-center align-middle rounded-xl ${colorClass}`}
    >
      {count}
    </span>
  );
};

export default Counter;
