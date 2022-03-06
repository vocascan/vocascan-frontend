import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useRouteMatch } from "react-router";

import AllGroups from "./AllGroups/AllGroups.jsx";
import AllPackages from "./AllPackages/AllPackages.jsx";
import AllVocabs from "./AllVocabs/AllVocabs.jsx";

const Library = () => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();

  return (
    <div className="py-12 px-3 md:p-12">
      <h1 className="mb-5">{t("global.library")}</h1>
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
