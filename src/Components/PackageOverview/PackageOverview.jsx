import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import Button from "../Button/Button.jsx";

import "./PackageOverview.scss";

const PackageOverview = ({ data }) => {
  const history = useHistory();

  const submitLearn = useCallback(() => history.push("/direction/"), [history]);

  return (
    <div className="package-overview">
      <h1 className="package-heading">{data?.name}</h1>
      <p className="package-unresolved">
        Total to learn: {data?.stats?.vocabularies?.unresolved}
      </p>
      <p className="package-today">Today: 100</p>
      <p className="package-unactivated">
        Not activated: {data?.stats?.vocabularies?.unactivated}
      </p>
      <div className="package-btn-wrapper">
        <Button block uppercase onClick={submitLearn}>
          Learn
        </Button>
      </div>
      <div className="package-btn-wrapper">
        <Button variant={"outline"} uppercase block>
          Activate
        </Button>
      </div>
    </div>
  );
};

export default PackageOverview;
