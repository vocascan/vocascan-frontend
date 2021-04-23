import React from "react";

import Button from "../Button/Button.jsx";

import "./PackageOverview.scss";

const PackageOverview = ({ data }) => {
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
      <Button block uppercase>
        Learn
      </Button>
      <Button variant={"outline"} uppercase>
        Activate
      </Button>
    </div>
  );
};

export default PackageOverview;
