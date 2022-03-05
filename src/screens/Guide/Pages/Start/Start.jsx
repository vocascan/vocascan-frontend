import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Start = ({ setCanContinue }) => {
  const { t } = useTranslation();

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="m-auto uppercase">
        <h1 className="mb-3">Vocascan</h1>
        <p>{t("screens.guide.start.slogan")}</p>
      </div>
    </div>
  );
};

export default Start;
