import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./End.scss";

import GuideContext from "../../../../context/GuideContext";

const End = () => {
  const { t } = useTranslation();
  const { setCanContinue } = useContext(GuideContext);

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  return (
    <div className={"end"}>
      <div className={"end-heading"}>
        <h1>{t("screens.guide.end.heading")}</h1>
        <p>{t("screens.guide.end.description")}</p>
      </div>
    </div>
  );
};

export default End;
