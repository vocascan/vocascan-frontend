import React from "react";
import { useTranslation } from "react-i18next";

import "./Progress.scss";

const Progress = () => {
  const { t } = useTranslation();

  return (
    <div className="progress">
      <div>
        <h1>{t("screens.progress.title")}</h1>
        <h3>{t("global.comingSoon")}</h3>
      </div>
    </div>
  );
};

export default Progress;
