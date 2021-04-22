import React from "react";

import "./UnauthenticatedLayout.scss";

const UnauthenticatedLayout = ({ children }) => {
  return <div className={`unauthenicated-container`}>{children}</div>;
};

export default UnauthenticatedLayout;
