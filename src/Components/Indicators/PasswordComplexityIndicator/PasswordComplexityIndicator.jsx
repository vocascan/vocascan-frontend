import React, { useEffect } from "react";

import { bytesLength } from "../../../utils/index.js";

import "./PasswordComplexityIndicator.scss";

const PasswordComplexityIndicator = ({
  password,
  complexity,
  setComplexity,
  className,
}) => {
  useEffect(() => {
    const passwordLength = bytesLength(password);

    const length = passwordLength >= 8 && passwordLength <= 72;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonAlphas = /\W/.test(password);

    setComplexity(
      length
        ? length + hasUpperCase + hasLowerCase + hasNumbers + hasNonAlphas
        : passwordLength !== 0
        ? 1
        : 0
    );
  }, [password, setComplexity]);

  return (
    <div className="password-complexity-indicator">
      <div
        style={{ width: `${(100 / 5) * complexity}%` }}
        className={`bar complexity-${complexity}`}
      ></div>
    </div>
  );
};

export default PasswordComplexityIndicator;
