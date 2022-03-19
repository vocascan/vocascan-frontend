import React from "react";

const CleanLayout = ({ children }) => {
  return <div className="flex w-screen h-screen md:w-full">{children}</div>;
};

export default CleanLayout;
