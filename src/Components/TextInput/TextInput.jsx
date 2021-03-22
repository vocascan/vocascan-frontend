import React, { useCallback, useState } from "react";

import "./TextInput.scss";

const TextInput = ({
  type = "text",
  placeholder = null,
  onChange = () => null,
  error = false,
  errorText = null,
  required = false,
  autoComplete = null,
  ...props
}) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (v) => {
      setValue(v);
      onChange(v);
    },
    [onChange]
  );

  return (
    <div className="text-input-wrapper">
      {value.length > 0 && <span className="text-input-label">{`${placeholder}${required && " *"}`}</span>}
      <input
        className={`text-input ${error && "input-error"}`}
        type={type}
        placeholder={`${placeholder}${required && " *"}`}
        onChange={(e) => handleChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        {...props}
      />
      {error && errorText && <p className="text-input-error">{errorText}</p>}
    </div>
  );
};

export default TextInput;
