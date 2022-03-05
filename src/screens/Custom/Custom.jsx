import React from "react";
import { useTranslation } from "react-i18next";

const Custom = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen flex justify-center items-center text-center md:h-full">
      <div>
        <h1>{t("screens.custom.title")}</h1>
        <h3>{t("global.comingSoon")}</h3>
      </div>
    </div>
  );
};

export default Custom;
