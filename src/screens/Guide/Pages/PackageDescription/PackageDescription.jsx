import React from "react";
import { useTranslation } from "react-i18next";

import "./PackageDescription.scss";

import image1 from "./addPackage1.PNG";
import image2 from "./addPackage2.PNG";

const PackageDescription = () => {
  const { t } = useTranslation();
  const bulletPoints = t("screens.guide.packageDescription.bulletPoints", {
    returnObjects: true,
  });

  return (
    <div className="packageDescription">
      <div className="images">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
      </div>
      <div className="description">
        <ul>
          {bulletPoints.map((bulletPoint, index) => (
            <li key={index}>{bulletPoint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageDescription;
