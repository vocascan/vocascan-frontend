import React from "react";

import InfoIcon from "@material-ui/icons/Info";

import "./Switch.scss";

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
  return (
    <div className="switch-wrapper">
      {label && <label className="label-top">{label}</label>}
      <div
        className={`switch-wrapper-inner ${
          switcher && optionRight ? "switcher-left" : ""
        }`}
      >
        {optionLeft && (
          <div className="label-wrapper">
            <label className="label-left">{optionLeft}</label>
            {infoLeft && (
              <div className="info-sign info-left">
                <InfoIcon />
                <div className="tooltip-wrapper tooltip-left">{infoLeft}</div>
              </div>
            )}
          </div>
        )}
        <label className={`switch ${disabled ? "disabled" : ""}`}>
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className={`slider slider-${appearance}`}></span>
        </label>
        {switcher && optionRight && (
          <div className="label-wrapper">
            {infoRight && (
              <div className="info-sign info-right">
                <InfoIcon />
                <div className="tooltip-wrapper tooltip-right">{infoRight}</div>
              </div>
            )}
            <label className="label-right">{optionRight}</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Switch;
