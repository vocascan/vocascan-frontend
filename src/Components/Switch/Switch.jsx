import React from "react";

import "./Switch.scss";

const Switch = ({
  disabled = false,
  onChange = () => null,
  optionRight = "insert a label",
  switcher = false,
  optionLeft = null,
  checked = false,
  label = null,
  appearance = "default",
}) => {
  return (
    <div className="switch-wrapper">
      <h3>{label}</h3>
      <div className="switch-wrapper-inner">
        {optionLeft && <label className="label-left">{optionLeft}</label>}
        <label className={`switch ${disabled ? "disabled" : ""}`}>
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className={`slider slider-${appearance}`}></span>
        </label>
        {switcher && optionRight && (
          <label className="label-right">{optionRight}</label>
        )}
      </div>
    </div>
  );
};

export default Switch;
