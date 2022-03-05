import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import Button from "../../Components/Button/Button.jsx";
import LanguageSelector from "../../Components/LanguageSelector/LanguageSelector.jsx";
import VersionTable from "../../Components/VersionTable/VersionTable.jsx";

import { openGuide } from "../../redux/Actions/login.js";

const Settings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const reopenGuide = useCallback(() => {
    dispatch(openGuide());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-12 max-w-4xl justify-center my-0 mx-auto">
      <h1 className="mb-5">{t("screens.settings.title")}</h1>

      <LanguageSelector />

      <div className="my-10 mx-auto w-1/2">
        <h3 className="mb-1">{t("screens.settings.guide.title")}</h3>
        <Button block uppercase onClick={reopenGuide}>
          {t("screens.settings.guide.button")}
        </Button>
      </div>

      <h2>{t("screens.settings.versions")}</h2>

      <VersionTable />
    </div>
  );
};

export default Settings;
