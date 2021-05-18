import React from "react";

import "./PackageDescription.scss";

import image1 from "./addPackage1.PNG";
import image2 from "./addPackage2.PNG";

const PackageDescription = () => {
  return (
    <div className="packageDescription">
      <div className="images">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
      </div>
      <div className="description">
        <h1>Description</h1>
      </div>
    </div>
  );
};

export default PackageDescription;
