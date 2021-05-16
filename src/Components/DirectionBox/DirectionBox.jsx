import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

import Flag from "../Flag/Flag.jsx";

import { findLanguageByCode, getLanguageString } from "../../utils/index.js";

import "./DirectionBox.scss";

const DirectionBox = ({
  direction = "default",
  foreignWordLanguage,
  translatedWordLanguage,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const languages = useSelector((state) => state.language.languages);

  const submitDirection = () => {
    history.push(`/learn/query/${direction}`);
  };

  return (
    <div className="direction-box" onClick={submitDirection}>
      <div className="flags">
        <Flag languageCode={foreignWordLanguage} size="large" />
        {direction === "random" ? (
          <SyncAltIcon className="direction-arrow" />
        ) : direction === "backwards" ? (
          <ArrowRightAltIcon className="direction-arrow invert" />
        ) : (
          <ArrowRightAltIcon className="direction-arrow" />
        )}
        <Flag languageCode={translatedWordLanguage} size="large" />
      </div>
      <div className="languages">
        {direction === "random"
          ? t("global.random")
          : direction === "backwards"
          ? `${getLanguageString(
              findLanguageByCode(translatedWordLanguage, languages)
            )} - ${getLanguageString(
              findLanguageByCode(foreignWordLanguage, languages)
            )}`
          : `${getLanguageString(
              findLanguageByCode(foreignWordLanguage, languages)
            )} - ${getLanguageString(
              findLanguageByCode(translatedWordLanguage, languages)
            )}`}
      </div>
    </div>
  );
};

export default DirectionBox;
