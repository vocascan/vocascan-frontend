import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import image1 from "./addPackage1.png";
import image2 from "./addPackage2.png";

import "./PackageDescription.scss";

import GuideContext from "../../../../context/GuideContext";

const PackageDescription = () => {
  const { t } = useTranslation();
  const { setCanContinue } = useContext(GuideContext);

  const bulletPoints = t("screens.guide.packageDescription.bulletPoints", {
    returnObjects: true,
  });

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  return (
    <div className="packageDescription">
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
