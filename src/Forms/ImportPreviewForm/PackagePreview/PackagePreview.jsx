import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../Components/Button/Button.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { importLanguagePackage } from "../../../utils/api.js";

import "./PackagePreview.scss";

const PackagePreview = ({ data }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const [languagePackage, setLanguagePackage] = useState(data);

  const submitImport = () => {
    importLanguagePackage(languagePackage)
      .then((response) => {
        showSnack("success", t("screens.allPackages.exportSuccessMessage"));
      })
      .catch((e) => {
        showSnack("error", t("screens.allPackages.exportFailMessage"));
      });
  };

  return (
    <div className="package-preview">
      <p>{data.name}</p>
      <p>{data.foreignWordLanguage}</p>
      <Button block uppercase onClick={submitImport}>
        {t("global.signIn")}
      </Button>
    </div>
  );
};

export default PackagePreview;
