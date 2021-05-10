import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import DirectionBox from "../../../Components/DirectionBox/DirectionBox.jsx";

import "./Direction.scss";

const Direction = () => {
  const { t } = useTranslation();

  const foreignWordLanguage = useSelector(
    (state) => state.learn.foreignWordLanguage
  );
  const translatedWordLanguage = useSelector(
    (state) => state.learn.translatedWordLanguage
  );
  return (
    <div className="direction">
      <h1 className="box-title">{t("screens.direction.title")}</h1>
      <div className="box-wrapper">
        <DirectionBox
          foreignWordLanguage={foreignWordLanguage}
          translatedWordLanguage={translatedWordLanguage}
        />
        <DirectionBox
          direction="backwards"
          foreignWordLanguage={foreignWordLanguage}
          translatedWordLanguage={translatedWordLanguage}
        />
        <DirectionBox
          direction="random"
          foreignWordLanguage={foreignWordLanguage}
          translatedWordLanguage={translatedWordLanguage}
        />
      </div>
    </div>
  );
};

export default Direction;
