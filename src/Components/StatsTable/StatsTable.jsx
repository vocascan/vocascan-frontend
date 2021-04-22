import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "../Table/Table.jsx";

import useSnack from "../../hooks/useSnack.js";
import { getStats } from "../../utils/api.js";

const StatsTable = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const [stats, setStats] = useState({});

  useEffect(() => {
    getProfileStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //make api call to login
  const getProfileStats = useCallback(() => {
    getStats()
      .then((response) => {
        //store stats in variables
        setStats(response.data);
      })
      .catch((event) => {
        if (event.response?.status === 401 || event.response?.status === 404) {
          showSnack("error", "Error fetching stats");
          return;
        }

        showSnack("error", "Internal Server Error");
      });
  }, [showSnack]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.profile.stats.stats"),
        accessor: "stats", // accessor is the "key" in the data
      },
      {
        Header: t("global.packages"),
        accessor: "packages",
      },
      {
        Header: t("global.groups"),
        accessor: "groups",
      },
      {
        Header: t("global.vocabs"),
        accessor: "vocabs",
      },
    ],
    [t]
  );

  const data = useMemo(
    () => [
      {
        stats: t("screens.profile.stats.total"),
        packages: stats.languagePackages || "-",
        groups: stats.inactiveGroups + stats.activeGroups || "-",
        vocabs: stats.inactiveVocabulary + stats.activeVocabulary || "-",
      },
      {
        stats: t("screens.profile.stats.active"),
        packages: "-",
        groups: stats.activeGroups || "-",
        vocabs: stats.activeVocabulary || "-",
      },
      {
        stats: t("screens.profile.stats.inactive"),
        packages: "-",
        groups: stats.inactiveGroups || "-",
        vocabs: stats.inactiveVocabulary || "-",
      },
    ],
    [
      stats.activeGroups,
      stats.activeVocabulary,
      stats.inactiveGroups,
      stats.inactiveVocabulary,
      stats.languagePackages,
      t,
    ]
  );

  return <Table columns={columns} data={data} pagination={false} />;
};

export default StatsTable;
