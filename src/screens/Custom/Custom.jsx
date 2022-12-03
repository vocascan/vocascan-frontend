import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Switch from "../../Components/Form/Switch/Switch.jsx";

import { clearQuery } from "../../redux/Actions/query.js";
import { setLearnedPackage } from "../../redux/Actions/query.js";

import "./Custom.scss";

import Button from "../../Components/Button/Button";
import { getPackages } from "../../utils/api";

const CustomLearningPackageOverview = ({ data, onlyActivated }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectPackage = useCallback(() => {
    dispatch(clearQuery());
    dispatch(
      setLearnedPackage({
        foreignWordLanguage: data.foreignWordLanguage,
        translatedWordLanguage: data.translatedWordLanguage,
        //using fixed value until server gives us this property
        languagePackageId: data.id,
        groupIds: [],
        vocabsToday: 0,
        staged: false,
        onlyActivated: onlyActivated,
        customLearning: true,
      })
    );

    history.push("/learn/selection/custom/");
  }, [
    data.foreignWordLanguage,
    data.id,
    data.translatedWordLanguage,
    dispatch,
    history,
    onlyActivated,
  ]);

  return (
    <div>
      <h1>{data.name}</h1>
      <Button block uppercase onClick={selectPackage}>
        {"Select Package"}
      </Button>
    </div>
  );
};

const Custom = () => {
  const { t } = useTranslation();

  const [onlyActivated, setOnlyActivated] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages(false, false, onlyActivated).then((response) => {
      setPackages(response.data);
    });
  }, [onlyActivated]);

  const onChangeOnlyActivated = useCallback(() => {
    setOnlyActivated(!onlyActivated);

    // refetch packages
    getPackages(false, false, onlyActivated).then((response) => {
      setPackages(response.data);
    });
  }, [onlyActivated]);

  return (
    <div className="custom">
      <div>
        <h1>{t("screens.custom.title")}</h1>
        <Switch
          appearance="on-off"
          optionLeft={"Only Active Vocabs"}
          onChange={onChangeOnlyActivated}
          checked={onlyActivated}
        />
        {packages.map((languagePackage, index) => (
          <CustomLearningPackageOverview
            key={index}
            data={languagePackage}
            onlyActivated={onlyActivated}
          />
        ))}
      </div>
    </div>
  );
};

export default Custom;
