import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../../../Components/Button/Button.jsx";
import Congratulation from "../../../Components/Congratulation/Congratulation.jsx";
import Table from "../../../Components/Table/Table.jsx";

import "./End.scss";

const End = () => {
  const correctVocabs = useSelector((state) => state.query.correct);
  const wrongVocabs = useSelector((state) => state.query.wrong);
  const [percentage] = useState(
    ((correctVocabs / (correctVocabs + wrongVocabs)) * 100).toFixed(0)
  );
  const history = useHistory();
  const { t } = useTranslation();

  const submitEndQuery = () => {
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
    [t]
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
      <div className="end-screen-inner">
        <div>
          <Congratulation percentage={percentage} />
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
    </div>
  );
};

export default End;
