import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";

import Dashboard from "./Dashboard/Dashboard.jsx";
import Sequence from "./Direction/Direction.jsx";

import "./Learn.scss";

const Learn = () => {
  const { path } = useRouteMatch();

  return (
    <div className="learn-wrapper">
      <Switch>
        <Route exact path={`${path}/`} component={Dashboard} />
        <Route path={`${path}/sequence/`} component={Sequence} />
      </Switch>
    </div>
  );
};

export default Learn;
