import React, { useState, useCallback, useEffect } from "react";

import "./TextInput.scss";

const TextInput = ({
  type = "text",
  placeholder = null,
  onChange = () => null,
  error = false,
  errorText = null,
  required = false,
  value = "",
  ...props
}) => {
  const [flow, setFlow] = useState(false);

  const handleFocus = useCallback(() => {
    setFlow(true);
  }, []);

  const onBlur = useCallback(() => {
    setFlow(!!value);
  }, [value]);

  useEffect(() => {
    setFlow(!!value || props.autofocus);
    // only trigger once the component renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-input-wrapper">
      <span
        className={`text-input-label${flow ? " flow" : ""}`}
      >{`${placeholder}${required ? " *" : ""}`}</span>
      <input
        className={`text-input ${error && "input-error"}`}
        type={type}
        placeholder=""
        onChange={(e) => onChange(e.target.value)}
        required={required}
        value={value}
        onBlur={onBlur}
        onFocus={handleFocus}
        {...props}
      />
      {error && errorText && <p className="text-input-error">{errorText}</p>}
    </div>
  );
};

export default TextInput;
