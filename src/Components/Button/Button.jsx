import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

import "./Button.scss";

import LoadingIndicator from "../Indicators/LoadingIndicator/LoadingIndicator";

const Button = ({
  uppercase = false,
  variant = "default",
  disabled = false,
  appearance = "primary",
  block = false,
  onClick = () => null,
  children,
  loading = false,
  promiseButton = false,
  promiseButtonMinTime = 500,
  className = "",
  ...props
}) => {
  const classes = clsx(
    "btn",
    `btn-${appearance}`,
    `btn-${variant}`,
    uppercase && "btn-uppercase",
    block && "btn-block",
    disabled && "btn-disabled",
    className
  );

  const [promiseLoading, setPromiseLoading] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);

  const handleClick = useCallback(
    async (event) => {
      const timeStart = Date.now();
      setPromiseLoading(true);

      await Promise.resolve(onClick(event));

      const timeLeft = -Date.now() + timeStart + promiseButtonMinTime; // calculate time left, if negative time already passed

      if (timeLeft <= 0) {
        setPromiseLoading(false);
      } else {
        timeoutId.current = setTimeout(() => {
          setPromiseLoading(false);
          timeoutId.current = null;
        }, timeLeft);
      }
    },
    [onClick, promiseButtonMinTime]
  );

  return (
    <button onClick={handleClick} className={classes} {...props}>
      {loading || (promiseButton && promiseLoading) ? (
        <div>
          <LoadingIndicator />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
