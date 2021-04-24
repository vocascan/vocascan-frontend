import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../Button/Button.jsx";

import "../../redux/Actions/learn.js";
import { setLearnedPackage } from "../../redux/Actions/learn.js";

import "./PackageOverview.scss";

const PackageOverview = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submitLearn = useCallback(() => {
    dispatch(
      setLearnedPackage({
        foreignWordLanguage: data.foreignWordLanguage,
        translatedWordLanguage: data.translatedWordLanguage,
      })
    );
    history.push("learn/direction/");
  }, [
    data.foreignWordLanguage,
    data.translatedWordLanguage,
    dispatch,
    history,
  ]);

  return (
    <div className="package-overview">
      <h1 className="package-heading">{data?.name}</h1>
      <p className="package-unresolved">
        {t("components.packageOverview.unresolved")}{" "}
        {data?.stats?.vocabularies?.unresolved}
      </p>
      <p className="package-today">
        {t("components.packageOverview.today")} 100
      </p>
      <p className="package-unactivated">
        {t("components.packageOverview.unactivated")}{" "}
        {data?.stats?.vocabularies?.unactivated}
      </p>
      <div className="package-btn-wrapper">
        <Button block uppercase onClick={submitLearn}>
          {t("global.learn")}
        </Button>
      </div>
      <div className="package-btn-wrapper">
        <Button variant="outline" uppercase block>
          {t("global.activate")}
        </Button>
      </div>
    </div>
  );
};

export default PackageOverview;
