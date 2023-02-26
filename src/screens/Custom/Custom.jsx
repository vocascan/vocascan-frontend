import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Switch from "../../Components/Form/Switch/Switch.jsx";
import Table from "../../Components/Table/Table.jsx";
import Tooltip from "../../Components/Tooltip/Tooltip.jsx";

import { clearQuery } from "../../redux/Actions/query.js";
import { setLearnedPackage } from "../../redux/Actions/query.js";

import "./Custom.scss";

import Button from "../../Components/Button/Button";
import { getPackages } from "../../utils/api";

const Custom = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [onlyActivated, setOnlyActivated] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages(false, false, onlyActivated).then((response) => {
      setPackages(response.data);
    });
  }, [onlyActivated]);

  const selectPackage = useCallback(
    (languagePackage) => {
      dispatch(clearQuery());
      dispatch(
        setLearnedPackage({
          foreignWordLanguage: languagePackage.foreignWordLanguage,
          translatedWordLanguage: languagePackage.translatedWordLanguage,
          //using fixed value until server gives us this property
          languagePackageId: languagePackage.id,
          groupIds: [],
          vocabsToday: 0,
          staged: false,
          onlyActivated: onlyActivated,
          customLearning: true,
        })
      );

      history.push("/learn/selection/custom/");
    },
    [dispatch, history, onlyActivated]
  );

  const onChangeOnlyActivated = useCallback(() => {
    setOnlyActivated(!onlyActivated);

    // refetch packages
    getPackages(false, false, onlyActivated).then((response) => {
      console.log(response.data);
      setPackages(response.data);
    });
  }, [onlyActivated]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allGroups.groupName"),
        accessor: "name",
        Cell: ({ row }) => row.original.name,
        headerClassName: "w-25",
      },
      {
        Header: t("screens.allGroups.groupDescription"),
        accessor: "description",
        Cell: ({ row }) => (
          <>
            <p
              className="group-description-cell"
              data-tip={row.original.description}
              data-for={`description-tooltip-${row.original.id}`}
            >
              {row.original.description}
            </p>
            <Tooltip id={`description-tooltip-${row.original.id}`} />
          </>
        ),
        headerClassName: "w-50",
      },
      {
        Header: "",
        accessor: "select",
        Cell: ({ row }) => (
          <Button
            block
            uppercase
            onClick={() => {
              selectPackage(row.original);
            }}
          >
            Start
          </Button>
        ),
      },
    ],
    [selectPackage, t]
  );

  return (
    <div className="custom-learning">
      <div className="custom-learning-wrapper">
        <div className="custom-learning-switch-wrapper">
          <Switch
            appearance="on-off"
            optionLeft={t("screens.custom.onlyActivatedVocabs")}
            onChange={onChangeOnlyActivated}
            checked={onlyActivated}
          />
        </div>
        <div className="table-wrapper">
          <Table columns={columns} data={packages} />
        </div>
      </div>
    </div>
  );
};

export default Custom;
