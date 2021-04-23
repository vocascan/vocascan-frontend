import React, { useEffect, useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../../Components/Button/Button.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getPackages } from "../../../utils/api.js";

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
    <div>
      <h1>Hello World</h1>
      {languagePackages.map((languagePackage) => (
        <h1>{languagePackage?.stats?.vocabularies?.all}</h1>
      ))}
    </div>
  );
};

export default Dashboard;
