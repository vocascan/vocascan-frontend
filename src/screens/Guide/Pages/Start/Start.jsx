import React from "react";
import { useTranslation } from "react-i18next";

import "./Start.scss";

const Start = () => {
  const { t } = useTranslation();

  return (
    <div className={"start"}>
      <div className={"start-heading"}>
        <h1>Vocascan</h1>
        <p>{t("screens.guide.start.slogan")}</p>
      </div>
    </div>
  );
};

export default Start;
