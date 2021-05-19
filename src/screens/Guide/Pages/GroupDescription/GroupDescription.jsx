import React from "react";
import { useTranslation } from "react-i18next";

import "./GroupDescription.scss";

const GroupDescription = () => {
  const { t } = useTranslation();
  const bulletPoints = t("screens.guide.groupDescription.bulletPoints", {
    returnObjects: true,
  });

  return (
    <div className="groupDescription">
      <div className="images"></div>
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

export default GroupDescription;
