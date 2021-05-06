import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../../../Components/Button/Button.jsx";
import Table from "../../../Components/Table/Table.jsx";

import { clearQuery } from "../../../redux/Actions/query.js";

const End = () => {
  const correctVocabs = useSelector((state) => state.query.correct);
  const wrongVocabs = useSelector((state) => state.query.wrong);
  const percentage = (correctVocabs / (correctVocabs + wrongVocabs)) * 100;
  const dispatch = useDispatch();
  const history = useHistory();

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
      {percentage > 50 ? (
        <h1>Glückwunsch</h1>
      ) : (
        <h1>Schade, beim nächsten Mal wird es bestimmt besser</h1>
      )}
      <p>{`Du hast ${percentage}% der Vokabeln richtig gehabt`}</p>
      <Table columns={columns} data={data} pagination={false} />
      <Button block uppercase onClick={submitEndQuery}>
        Zurück zum Dashboard
      </Button>
    </div>
  );
};

export default End;
