import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import image1 from "./addGroup1.png";
import image2 from "./addGroup2.png";

import "./GroupDescription.scss";

import GuideContext from "../../../../context/GuideContext";

const GroupDescription = () => {
  const { t } = useTranslation();
  const { setCanContinue } = useContext(GuideContext);

  const bulletPoints = t("screens.guide.groupDescription.bulletPoints", {
    returnObjects: true,
  });

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  return (
    <div className="groupDescription">
      <div className="images">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
      </div>
      <div className="description">
        <h1>{t("global.groups")}</h1>
        <ul>
          {bulletPoints.map((bulletPoint, index) => (
            <li key={index}>{bulletPoint}</li>
          ))}
        </ul>
        <p>{t("screens.guide.groupDescription.endText")}</p>
      </div>
    </div>
  );
};

export default GroupDescription;
