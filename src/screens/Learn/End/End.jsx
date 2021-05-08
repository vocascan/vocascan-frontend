import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../../../Components/Button/Button.jsx";
import Table from "../../../Components/Table/Table.jsx";

import { clearQuery } from "../../../redux/Actions/query.js";

import "./End.scss";

const End = () => {
  const correctVocabs = useSelector((state) => state.query.correct);
  const wrongVocabs = useSelector((state) => state.query.wrong);
  const [percentage] = useState(
    (correctVocabs / (correctVocabs + wrongVocabs)) * 100
  );
  const [congratulation, setCongratulations] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    //get size of congratulation array and calculate the message with the given percentage
    const sizeCount = t("screens.endScreen.congratulations", {
      returnObjects: true,
    }).length;
    let tempVar = 0;
    const steps = 100 / sizeCount;

    for (let i = 0; i < sizeCount; ++i) {
      if (percentage >= tempVar && percentage <= tempVar + steps) {
        setCongratulations(t(`screens.endScreen.congratulations.${i}`));
      }
      tempVar += steps;
    }
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
        Header: "Gesamt",
        accessor: "total",
      },
      {
        Header: "Richtig",
        accessor: "correct",
      },
      {
        Header: "Falsch",
        accessor: "wrong",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        query: "Query",
        total: correctVocabs + wrongVocabs || "-",
        correct: correctVocabs || "-",
        wrong: wrongVocabs || "-",
      },
    ],
    [correctVocabs, wrongVocabs]
  );
  return (
    <div className="end-screen">
      <h1>{congratulation}</h1>
      <p className="percentage-text">
        {t("screens.endScreen.percentageText", {
          percentage: percentage,
        })}
      </p>
      <Table columns={columns} data={data} pagination={false} />
      <Button block uppercase onClick={submitEndQuery}>
        Zurück zum Dashboard
      </Button>
    </div>
  );
};

export default End;
