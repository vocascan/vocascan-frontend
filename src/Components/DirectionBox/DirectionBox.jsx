import React from "react";
import { useTranslation } from "react-i18next";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

import { languages } from "../../utils/constants.js";

import "./DirectionBox.scss";

const DirectionBox = ({
  direction = "default",
  foreignWordLanguage,
  translatedWordLanguage,
}) => {
  const { t } = useTranslation();
  return (
    <div className="direction-box">
      <div className="flags">
        {direction === "random" ? (
          <>
            {languages.find((ele) => ele.name === foreignWordLanguage)?.icon}
            <SyncAltIcon className="direction-arrow" />
            {languages.find((ele) => ele.name === translatedWordLanguage)?.icon}
          </>
        ) : direction === "backwards" ? (
          <>
            {languages.find((ele) => ele.name === translatedWordLanguage)?.icon}
            <ArrowRightAltIcon className="direction-arrow" />
            {languages.find((ele) => ele.name === foreignWordLanguage)?.icon}
          </>
        ) : (
          <>
            {languages.find((ele) => ele.name === foreignWordLanguage)?.icon}
            <ArrowRightAltIcon className="direction-arrow" />
            {languages.find((ele) => ele.name === translatedWordLanguage)?.icon}
          </>
        )}
      </div>
      <div className="languages">
        {direction === "random"
          ? t("global.random")
          : direction === "backwards"
          ? `${translatedWordLanguage} - ${foreignWordLanguage}`
          : `${foreignWordLanguage} - ${translatedWordLanguage}`}
      </div>
    </div>
  );
};

export default DirectionBox;
