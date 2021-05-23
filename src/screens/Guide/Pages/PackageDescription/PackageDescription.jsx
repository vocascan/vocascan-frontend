import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import image1 from "./addPackage1.png";
import image2 from "./addPackage2.png";

import "./PackageDescription.scss";

const PackageDescription = ({ setCanContinue }) => {
  const { t } = useTranslation();

  const bulletPoints = t("screens.guide.packageDescription.bulletPoints", {
    returnObjects: true,
  });

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  return (
    <div className="package-description">
      <div className="images">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
      </div>
      <div className="description">
        <h1>{t("global.packages")}</h1>
        <ul>
          {bulletPoints.map((bulletPoint, index) => (
            <li key={index}>{bulletPoint}</li>
          ))}
        </ul>
        <p>{t("screens.guide.packageDescription.endText")}</p>
      </div>
    </div>
  );
};

export default PackageDescription;
