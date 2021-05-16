import React, { useState, useCallback, useEffect } from "react";

import "./Textarea.scss";

const Textarea = ({
  type = "textarea",
  placeholder = null,
  onChange = () => null,
  error = false,
  errorText = null,
  required = false,
  value = "",
  autoFocus = false,
  rows = 5,
  maxLength,
  ...props
}) => {
  const [flow, setFlow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [indicator, setIndicator] = useState(false);

  const handleFocus = useCallback(() => {
    setFocused(true);
    setFlow(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
    setFlow(!!value);
  }, [value]);

  useEffect(() => {
    setFlow(!!value || autoFocus);
    setFocused(autoFocus);
    // only trigger once the component renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFlow(!!value || focused);
  }, [value, focused]);

  useEffect(() => {
    setIndicator(maxLength - value.length);
  }, [maxLength, value]);

  return (
    <div className="text-area-wrapper">
      <span
        className={`text-area-label${flow ? " flow" : ""}`}
      >{`${placeholder}${required ? " *" : ""}`}</span>
      <textarea
        className={`text-area ${error && "area-error"}`}
        type={type}
        placeholder=""
        onChange={(e) => onChange(e.target.value)}
        required={required}
        value={value}
        onBlur={onBlur}
        onFocus={handleFocus}
        autoFocus={autoFocus}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />
      {!error && maxLength && (
        <p className="text-area-indicator">{`${indicator}/${maxLength}`}</p>
      )}
      {error && errorText && <p className="text-area-error">{errorText}</p>}
    </div>
  );
};

export default Textarea;
