import React from "react";
import { useTranslation } from "react-i18next";

import "./Custom.scss";

const Custom = () => {
  const { t } = useTranslation();

  return (
    <div className="custom">
      <div>
        <h1>{t("screens.custom.title")}</h1>
        <h3>{t("global.comingSoon")}</h3>
      </div>
    </div>
  );
};

export default Custom;
