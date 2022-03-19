import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import LoadingIndicator from "../../../Components/Indicators/LoadingIndicator/LoadingIndicator.jsx";
import PackageOverview from "../../../Components/PackageOverview/PackageOverview.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getPackages } from "../../../utils/api.js";

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
      <div className="w-full h-screen p-0 flex justify-center items-center md:w-full md:p-12 md:max-w-4xl md:m-auto">
        <LoadingIndicator size="large" position="center" />
      </div>
    );
  }
  //if language package array is empty, show empty screen
  else if (languagePackages.length === 0) {
    return (
      <div className="w-full h-full p-0 flex justify-center items-center md:p-12 md:max-w-4xl md:m-auto">
        <h1 className="text-2xl uppercase">{t("screens.dashboard.empty")}</h1>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center md:p-12 md:max-w-4xl md:m-auto">
        <div className="w-5/6 mt-20 md:mt-0">
          {languagePackages.map((languagePackage, index) => (
            <PackageOverview key={index} data={languagePackage} />
          ))}
        </div>
      </div>
    );
  }
};

export default Dashboard;
