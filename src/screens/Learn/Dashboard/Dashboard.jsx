import React, { useEffect, useCallback, useState } from "react";

import PackageOverview from "../../../Components/PackageOverview/PackageOverview.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getPackages } from "../../../utils/api.js";

import "./Dashboard.scss";

const Dashboard = () => {
  const { showSnack } = useSnack();

  const [languagePackages, setLanguagePackages] = useState([]);

  useEffect(() => {
    getLanguagePackages();
  }, []);

  const getLanguagePackages = useCallback(() => {
    getPackages(false, true)
      .then((response) => {
        //store stats in variables
        console.log(response.data);
        setLanguagePackages(response.data);
      })
      .catch((event) => {
        if (event.response?.status === 401 || event.response?.status === 404) {
          showSnack("error", "Error fetching stats");
          return;
        }

        showSnack("error", "Internal Server Error");
      });
  }, [showSnack]);

  return (
    <div className="dashboard">
      <div className="package-views">
        {languagePackages.map((languagePackage) => (
          <PackageOverview data={languagePackage} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
