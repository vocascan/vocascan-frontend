import React from "react";
import { useTranslation } from "react-i18next";

import "./VocabDescription.scss";

const VocabDescription = () => {
  const { t } = useTranslation();
  const bulletPoints = t("screens.guide.vocabDescription.bulletPoints", {
    returnObjects: true,
  });
  return (
    <div className="vocabDescription">
      <div className="images"></div>
      <div className="description">
        <p>{t("screens.guide.vocabDescription.heading")}</p>
        <ul>
          {bulletPoints.map((bulletPoint, index) => (
            <li key={index}>{bulletPoint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VocabDescription;
