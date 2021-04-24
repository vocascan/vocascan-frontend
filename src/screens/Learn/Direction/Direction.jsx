import React from "react";
import { useTranslation } from "react-i18next";

import DirectionBox from "../../../Components/DirectionBox/DirectionBox.jsx";

import "./Direction.scss";

const Direction = () => {
  const { t } = useTranslation();
  return (
    <div className="direction">
      <h1 className="box-title">{t("screens.direction.title")}</h1>
      <div className="box-wrapper">
        <DirectionBox />
        <DirectionBox direction="backwards" />
        <DirectionBox direction="random" />
      </div>
    </div>
  );
};

export default Direction;
