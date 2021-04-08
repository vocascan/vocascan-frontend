import React, { useMemo } from "react";

import "./AllVocabulary.scss";

import Table from "../../Components/Table/Table";

const AllVocabulary = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Count",
        accessor: "count",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        name: "Hello",
        count: 2,
      },
      {
        name: "react-table",
        count: 3,
      },
      {
        name: "whatever",
        count: 12,
      },
    ],
    []
  );

  return (
    <div className="all-vocab-wrapper">
      <h1 className="heading">All vocabulary</h1>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AllVocabulary;
