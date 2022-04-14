import clsx from "clsx";
import React from "react";

import InfoIcon from "@material-ui/icons/Info";

import Tooltip from "../../Tooltip/Tooltip.jsx";

const Switch = ({
  disabled = false,
  onChange = () => null,
  optionRight = "insert a label",
  infoRight = null,
  switcher = false,
  optionLeft = null,
  infoLeft = null,
  checked = false,
  label = null,
  appearance = "default",
}) => {
  const styleClass = clsx(
    checked &&
      appearance === "default" &&
      "bg-primary-standard before:translate-x-5",
    checked &&
      appearance === "on-off" &&
      "bg-green-standard before:translate-x-5",
    !checked && appearance === "on-off" && "bg-red-standard",
    !checked && appearance === "default" && "bg-background-inverse"
  );

  return (
    <div className="flex flex-col justify-start items-start my-4 mx-0">
      {label && <label className="mb-2 font-normal">{label}</label>}
      <div
        className={`w-full flex items-center justify-between ${
          switcher && optionRight ? "justify-start" : ""
        }`}
      >
        {optionLeft && (
          <div className="flex justify-center items-center">
            <label className="mr-5">{optionLeft}</label>
            {infoLeft && (
              <InfoIcon
                tabIndex={-1}
                data-tip={infoLeft}
                data-for="switch-tooltip"
                className="text-primary-light my-0 -mx-4 flex items-center relative hover:cursor-help"
              />
            )}
          </div>
        )}
        <label
          className={`w-12 h-7 relative inline-block ${
            disabled ? "opacity-30 pointer-events-none" : ""
          }`}
        >
          <input
            className="opacity-0 w-0 h-0"
            tabIndex={-1}
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
          <span
            className={`absolute top-0 left-0 right-0 bottom-0 cursor-pointer transition-all rounded-3xl before:rounded-[50%] before:absolute before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white before:transition-all ${styleClass}`}
          ></span>
        </label>
        {switcher && optionRight && (
          <div className="flex justify-center items-center">
            {infoRight && (
              <InfoIcon
                data-tip={infoRight}
                data-for="switch-tooltip"
                className="text-primary-light my-0 -mx-4 flex items-center relative hover:cursor-help"
              />
            )}
            <label className="ml-5">{optionRight}</label>
          </div>
        )}
      </div>
      <Tooltip id="switch-tooltip" />
    </div>
  );
};

export default Switch;
