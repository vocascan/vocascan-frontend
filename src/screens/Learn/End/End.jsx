import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../../../Components/Button/Button.jsx";
import Table from "../../../Components/Table/Table.jsx";

import { clearQuery } from "../../../redux/Actions/query.js";
import { scaleValue } from "../../../utils/index.js";

import "./End.scss";

const End = () => {
  const correctVocabs = useSelector((state) => state.query.correct);
  const wrongVocabs = useSelector((state) => state.query.wrong);
  const [percentage] = useState(
    ((correctVocabs / (correctVocabs + wrongVocabs)) * 100).toFixed(0)
  );
  const [congratulation, setCongratulations] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    //get size of congratulation array and calculate the message with the given percentage
    const translations = t("screens.endScreen.congratulations", {
      returnObjects: true,
    });

    setCongratulations(
      translations[scaleValue(percentage, [0, 100], [0, translations.length])]
    );
  }, [percentage, t]);

  const submitEndQuery = () => {
    dispatch(clearQuery());
    history.push(`/learn/`);
  };

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "query", // accessor is the "key" in the data
      },
      {
        Header: t("global.total"),
        accessor: "total",
      },
      {
        Header: t("global.correct"),
        accessor: "correct",
      },
      {
        Header: t("global.wrong"),
        accessor: "wrong",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        query: t("global.query"),
        total: correctVocabs + wrongVocabs,
        correct: correctVocabs,
        wrong: wrongVocabs,
      },
    ],
    [correctVocabs, t, wrongVocabs]
  );
  return (
    <div className="end-screen">
      <div>
        <h1>{congratulation}</h1>
        <p className="percentage-text">
          {t("screens.endScreen.percentageText", {
            percentage: percentage,
          })}
        </p>
      </div>

      <Table columns={columns} data={data} pagination={false} />
      <Button block uppercase onClick={submitEndQuery}>
        {t("screens.endScreen.dashboard")}
      </Button>
    </div>
  );
};

export default End;
