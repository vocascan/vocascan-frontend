import React, { useCallback, useEffect, useState, useRef } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import "./Select.scss";

const Select = ({ onChange = () => null, required = false, options = [], label = "", value, children, ...props }) => {
  const ref = useRef(null);

  const [defaultText, setDefaultText] = useState(value);
  const [showOptions, setShowOptions] = useState(false);

  const escapeKeyListener = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setShowOptions(false);
      }
    },
    // Select Input specific dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const clickOutsideListener = useCallback(
    (e) => {
      if (!ref.current?.contains(e.target)) {
        setShowOptions(false);
      }
    },
    // Select Input specific dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const toggleShowOptions = useCallback(() => {
    setShowOptions((state) => !state);
  }, []);

  const handleOptionClick = useCallback(
    (e) => {
      setDefaultText(e.target.getAttribute("data-name"));
      onChange(e.target.getAttribute("data-name"));
      setShowOptions(false);
    },
    [onChange]
  );

  useEffect(() => {
    document.addEventListener("click", clickOutsideListener);
    document.addEventListener("keyup", escapeKeyListener);

    return () => {
      document.removeEventListener("click", clickOutsideListener);
      document.removeEventListener("keyup", escapeKeyListener);
    };
    // Select Input specific dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="select-input-container" ref={ref}>
      <select className="select-input" label={label} value={value} {...props} onChange={onChange} />
      <div className={`select-text ${showOptions ? "active" : ""}`} onClick={toggleShowOptions}>
        <span className={`select-label ${showOptions || !!defaultText ? "flow" : ""}`}>{`${label}${
          required ? " *" : ""
        }`}</span>
        {defaultText}
        <ArrowDropDownIcon className="select-icon" />
      </div>
      {showOptions && (
        <ul className="select-options-list">
          {options.map((option) => (
            <li className="select-option" data-name={option.name} key={option.id} onClick={handleOptionClick}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
