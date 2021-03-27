import React from "react";

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
  return (
    <div className="text-input-wrapper">
      {value.length > 0 && (
        <span className="text-input-label">{`${placeholder}${
          required && " *"
        }`}</span>
      )}
      <input
        className={`text-input ${error && "input-error"}`}
        type={type}
        placeholder={`${placeholder}${required ? " *" : ""}`}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        value={value}
        {...props}
      />
      {error && errorText && <p className="text-input-error">{errorText}</p>}
    </div>
  );
};

export default TextInput;
