import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Table from "../Table/Table.jsx";

import { getDesktopVersions } from "../../modules/about.js";
import { dayDateDiff } from "../../utils/index.js";

import {
  version as webVersion,
  metadata as webInfo,
} from "../../../package.json";

import "./VersionTable.scss";

const VersionTable = () => {
  const { t } = useTranslation();

  const serverInfo = useSelector((state) => state.login.serverInfo);
  const [desktopInfo, setDesktopInfo] = useState(null);

  useEffect(() => {
    if (window.VOCASCAN_CONFIG.ENV === "electron") {
      getDesktopVersions().then((versions) => {
        setDesktopInfo(versions);
      });
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t("components.versionTable.headers.component"),
        accessor: "component",
        Cell: ({ row, value }) => (
          <a
            href={`https://github.com/vocascan/${row.original.component}`}
            rel="noreferrer"
            target="_blank"
          >
            {value}
          </a>
        ),
      },
      {
        Header: t("components.versionTable.headers.version"),
        accessor: ({ version }) => `v${version}`,
      },
      {
        Header: t("components.versionTable.headers.commit"),
        accessor: "commit",
        Cell: ({ row, value }) =>
          value ? (
            <a
              href={`https://github.com/vocascan/${row.original.component}/tree/${value}`}
              rel="noreferrer"
              target="_blank"
            >
              #{value.slice(0, 7)}
            </a>
          ) : (
            "-"
          ),
      },
      {
        Header: t("components.versionTable.headers.build"),
        accessor: "",
        Cell: ({ row }) =>
          row.original.runId && row.original.runNumber ? (
            <a
              href={`https://github.com/vocascan/${
                row.original.runRepo || row.original.component
              }/actions/runs/${row.original.runId}`}
              rel="noreferrer"
              target="_blank"
            >
              #{row.original.runId}-{row.original.runNumber}
            </a>
          ) : (
            "-"
          ),
      },
      {
        Header: t("components.versionTable.headers.date"),
        accessor: ({ date }) =>
          date
            ? `${date}\n(${t("global.daysAgo", {
                count: dayDateDiff(new Date(date), new Date()),
              })})`
            : "-",
        Cell: ({ value }) => <p className="table-cell">{value}</p>,
      },
      {
        Header: t("components.versionTable.headers.extra"),
        accessor: ({ extra }) =>
          extra
            ? Object.entries(extra)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")
            : "-",
        Cell: ({ value }) => <p className="table-cell">{value}</p>,
      },
    ],
    [t]
  );

  const data = useMemo(
    () => [
      {
        component: "vocascan-frontend",
        version: webVersion,
        ...webInfo,
      },
      ...(window.VOCASCAN_CONFIG.ENV === "electron"
        ? [
            {
              component: "vocascan-desktop",
              version: desktopInfo?.version,
              commit: desktopInfo?.commit,
              runRepo: desktopInfo?.runRepo,
              runId: desktopInfo?.runId,
              runNumber: desktopInfo?.runNumber,
              date: desktopInfo?.date,
              extra: {
                Electron: desktopInfo?.versions?.electron,
                Chrome: desktopInfo?.versions?.chrome,
                "Node.js": desktopInfo?.versions?.nodeJS,
                V8: desktopInfo?.versions?.v8,
                OS: desktopInfo?.versions?.os,
              },
            },
          ]
        : []),
      {
        component: "vocascan-server",
        version: serverInfo?.version || "",
        commit: serverInfo?.commitRef || "",
      },
    ],
    [desktopInfo, serverInfo]
  );

  return (
    <div className="version-table">
      <Table columns={columns} data={data} pagination={false} />
    </div>
  );
};

export default VersionTable;
