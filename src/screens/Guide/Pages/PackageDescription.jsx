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
        <ul>
          <li>
            The main piece of this trainer are packages, where you can store all
            your vocabs from a language
          </li>
          <li>
            Packages can be created over package select box or in the library
            over the + icon, as you can see on the left images
          </li>
          <li>In the next step we will create your first package</li>
        </ul>
      </div>
    </div>
  );
};

export default PackageDescription;
