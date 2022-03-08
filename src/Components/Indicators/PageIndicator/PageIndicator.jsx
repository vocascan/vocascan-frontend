import React from "react";

const PageIndicator = ({ max, pageNumber }) => {
  const dots = [...Array(max)].map((_, i) => (
    <div
      key={i}
      className={`w-3 h-3 rounded-full my-0 mx-1 ${
        i === pageNumber ? "bg-primary-standard" : "bg-grey"
      }`}
    />
  ));

  return <div className="w-auto flex flex-row justify-between">{dots}</div>;
};

export default PageIndicator;
