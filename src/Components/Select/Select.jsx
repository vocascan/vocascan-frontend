import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactSelect from "react-select";

import "./Select.scss";

const Select = ({
  noOptionsMessage = false,
  defaultValue = "",
  multi = false,
  onChange = () => null,
  required = false,
  options = [],
  label = "",
  value,
  ...props
}) => {
  const { t } = useTranslation();

  const [flow, setFlow] = useState(false);

  const handleChange = useCallback(
    (newValue) => {
      onChange(newValue);
    },
    [onChange]
  );

  const handleFocus = () => setFlow(true);

  useEffect(() => {
    setFlow(!!value);
  }, [value]);

  return (
    <div className="select-input-container">
      <span className={`select-label ${flow ? "flow" : ""}`}>{`${label}${
        required ? " *" : ""
      }`}</span>
      <ReactSelect
        required={required}
        isMulti={multi}
        className="react-select"
        classNamePrefix="react-select"
        options={options}
        onChange={handleChange}
        onFocus={handleFocus}
        value={value}
        placeholder={false}
        noOptionsMessage={() =>
          noOptionsMessage ? noOptionsMessage : t("global.noOptionMessage")
        }
        styles={{
          input: (provided) => ({
            ...provided,
            margin: 0,
          }),
        }}
        {...props}
      />
    </div>
  );
};

export default Select;
