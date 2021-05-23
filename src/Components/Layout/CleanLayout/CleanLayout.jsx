import React from "react";

import "./CleanLayout.scss";

const CleanLayout = ({ children }) => {
  return <div className={`clean-container`}>{children}</div>;
};

export default CleanLayout;
