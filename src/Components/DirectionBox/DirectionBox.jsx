import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

import Flag from "../Flag/Flag.jsx";

import "./DirectionBox.scss";

const DirectionBox = ({
  direction = "default",
  foreignWordLanguage,
  translatedWordLanguage,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const submitDirection = () => {
    history.push(`/learn/query/${direction}`);
  };
  return (
    <div className="direction-box" onClick={submitDirection}>
      <div className="flags">
        <Flag languageCode={foreignWordLanguage} />
        {direction === "random" ? (
          <SyncAltIcon className="direction-arrow" />
        ) : direction === "backwards" ? (
          <ArrowRightAltIcon className="direction-arrow" />
        ) : (
          <ArrowRightAltIcon className="direction-arrow" />
        )}
        <Flag languageCode={translatedWordLanguage} />
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
