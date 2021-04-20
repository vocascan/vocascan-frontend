import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useRouteMatch } from "react-router";

import AllGroups from "../AllGroups/AllGroups.jsx";
import AllVocabs from "../AllVocabs/AllVocabs.jsx";
import AllPackages from "./AllPackages/AllPackages.jsx";

import "./Library.scss";

const Library = () => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();

  return (
    <div className="library-wrapper">
      <h1 className="title">{t("global.library")}</h1>
      <Switch>
        <Route exact path={`${path}/`} component={AllPackages} />
        <Route path={`${path}/allGroups/:packageId`} component={AllGroups} />
        <Route
          path={`${path}/allVocabs/:packageId/:groupId`}
          component={AllVocabs}
        />
      </Switch>
    </div>
  );
};

export default Library;
