import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";

import Dashboard from "./Dashboard/Dashboard.jsx";
import Direction from "./Direction/Direction.jsx";
import End from "./End/End.jsx";
import Query from "./Query/Query.jsx";

import "./Learn.scss";

const Learn = () => {
  const { path } = useRouteMatch();

  return (
    <div className="learn-wrapper">
      <Switch>
        <Route exact path={`${path}/`} component={Dashboard} />
        <Route path={`${path}/direction/`} component={Direction} />
        <Route path={`${path}/query/:direction`} component={Query} />
        <Route path={`${path}/end/`} component={End} />
      </Switch>
    </div>
  );
};

export default Learn;
