import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import LoadingIndicator from "../../../Components/Indicators/LoadingIndicator/LoadingIndicator.jsx";
import PackageOverview from "../../../Components/PackageOverview/PackageOverview.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getPackages } from "../../../utils/api.js";

import "./Dashboard.scss";

const Dashboard = () => {
  const { showSnack } = useSnack();
  const { t } = useTranslation();

  const [languagePackages, setLanguagePackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLanguagePackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLanguagePackages = useCallback(() => {
    setIsLoading(true);
    getPackages(false, true)
      .then((response) => {
        //store stats
        setLanguagePackages(response.data);
        setIsLoading(false);
      })
      .catch((event) => {
        setIsLoading(false);

        if (event.response?.status === 401 || event.response?.status === 404) {
          showSnack("error", "Error fetching stats");
          return;
        }

        showSnack("error", "Internal Server Error");
      });
  }, [showSnack]);

  if (isLoading) {
    return (
      <div className="dashboard empty">
        <LoadingIndicator size="large" position="center" />
      </div>
    );
  }
  //if language package array is empty, show empty screen
  else if (languagePackages.length === 0) {
    return (
      <div className="dashboard empty">
        <h1>{t("screens.dashboard.empty")}</h1>
      </div>
    );
  } else {
    return (
      <div className="dashboard">
        <div className="dashboard-inner">
          {languagePackages.map((languagePackage, index) => (
            <PackageOverview key={index} data={languagePackage} />
          ))}
        </div>
      </div>
    );
  }
};

export default Dashboard;
