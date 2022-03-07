import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../Button/Button.jsx";

import { clearQuery } from "../../redux/Actions/query.js";
import { setLearnedPackage } from "../../redux/Actions/query.js";

const PackageOverview = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submitLearn = useCallback(
    (staged) => {
      dispatch(clearQuery());
      dispatch(
        setLearnedPackage({
          foreignWordLanguage: data.foreignWordLanguage,
          translatedWordLanguage: data.translatedWordLanguage,
          //using fixed value until server gives us this property
          languagePackageId: data.id,
          vocabsToday: data.stats.vocabularies.learnedToday.dueToday,
          staged,
        })
      );
      history.push("/learn/direction/");
    },
    [
      data.foreignWordLanguage,
      data.id,
      data.stats.vocabularies.learnedToday.dueToday,
      data.translatedWordLanguage,
      dispatch,
      history,
    ]
  );

  return (
    <div className="w-full h-32 m-0 overflow-x-hidden bg-background-inverse mb-10 rounded-2xl flex justify-center items-center">
      <div className="w-11/12 h-4/5 grid grid-cols-[40%_25%_35%] grid-rows-[50%_50%]">
        <h1 className="text-mainText-inverse m-auto text-left w-10/12 col-start-1 col-end-1 row-start-1 row-end-1 text-base whitespace-nowrap overflow-hidden overflow-ellipsis md:text-2xl">
          {data?.name}
        </h1>
        <p className="text-mainText-inverse text-xs m-auto text-left md:text-sm w-10/12 col-start-1 col-end-1 row-start-2 row-end-2">
          {t("components.packageOverview.unresolved")}{" "}
          {data?.stats?.vocabularies?.unresolved}
        </p>
        <p className="text-mainText-inverse text-xs m-auto text-left md:text-sm w-10/12 col-start-2 col-end-2 row-start-1 row-end-1">
          {t("components.packageOverview.today")}{" "}
          {data?.stats?.vocabularies?.learnedToday?.dueToday}
        </p>
        <p className="text-mainText-inverse text-xs m-auto text-left md:text-sm w-10/12 col-start-2 col-end-2 row-start-2 row-end-2">
          {t("components.packageOverview.unactivated")}{" "}
          {data?.stats?.vocabularies?.unactivated}
        </p>
        <div className="w-10/12 h-full flex flex-end justify-end items-center learn-btn col-start-3 col-end-3 row-start-1 row-end-1">
          <div className="w-full md:w-1/2">
            <Button
              block
              uppercase
              disabled={!data.stats.vocabularies.learnedToday.dueToday}
              onClick={() => submitLearn(false)}
            >
              {t("global.learn")}
            </Button>
          </div>
        </div>
        <div className="w-10/12 h-full flex flex-end justify-end items-center learn-btn col-start-3 col-end-3 row-start-2 row-end-2">
          <div className="w-full md:w-1/2">
            <Button
              variant="outline"
              appearance="primary-light"
              uppercase
              block
              disabled={!data?.stats?.vocabularies?.unactivated}
              onClick={() => submitLearn(true)}
            >
              {t("global.activate")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageOverview;
