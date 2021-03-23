import React, { useCallback, useState } from "react";
import ReactSelect from "react-select";

import "./Select.scss";

const Select = ({
  defaultValue = "",
  multi = false,
  onChange = () => null,
  required = false,
  options = [],
  label = "",
  value,
  ...props
}) => {
  const [flow, setFlow] = useState(false);
  const [val, setVal] = useState(value);

  const handleChange = useCallback(
    (e) => {
      onChange(e.id);
      setVal(e.value);
    },
    [onChange]
  );

  const handleFocus = () => setFlow(true);

  const handleBlur = useCallback(() => {
    setFlow(val !== "");
  }, [val]);

  return (
    <div className="select-input-container">
      <span className={`select-label ${flow ? "flow" : ""}`}>{`${label}${required ? " *" : ""}`}</span>
      <ReactSelect
        required={required}
        isMulti={multi}
        className="react-select"
        classNamePrefix="react-select"
        options={options}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={false}
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
