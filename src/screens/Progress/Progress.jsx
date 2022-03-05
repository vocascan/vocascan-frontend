import React from "react";
import { useTranslation } from "react-i18next";

const Progress = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen flex justify-center items-center text-center md:h-full">
      <div>
        <h1>{t("screens.progress.title")}</h1>
        <h3>{t("global.comingSoon")}</h3>
      </div>
    </div>
  );
};

export default Progress;
