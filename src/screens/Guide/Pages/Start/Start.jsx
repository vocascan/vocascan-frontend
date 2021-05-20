import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./Start.scss";

import GuideContext from "../../../../context/GuideContext";

const Start = () => {
  const { t } = useTranslation();
  const { setCanContinue } = useContext(GuideContext);

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

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
