import clsx from "clsx";
import React from "react";

const LoadingIndicator = ({ size, position }) => {
  const positionClass = clsx(
    position === "center" && "items-center justify-center"
  );

  const sizeClass = clsx(
    size === "large" && "w-32 h-32",
    size !== "large" && "w-5 h-5"
  );

  return (
    <div className={`w-full flex ${positionClass}`}>
      <div
        className={`rounded-[50%] animate-spinCustom border-2 border-solid border-primary-light border-t-2 border-t-solid border-t-primary-dark-standard ${sizeClass}`}
      ></div>
    </div>
  );
};

export default LoadingIndicator;
