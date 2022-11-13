import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import "./GroupSelection.scss";

import Table from "../../../Components/Table/Table";
import Tooltip from "../../../Components/Tooltip/Tooltip";
import useSnack from "../../../hooks/useSnack";
import { getGroups } from "../../../utils/api";

const GroupSelection = () => {
  const { showSnack } = useSnack();
  const { t } = useTranslation();

  const [groups, setGroups] = useState([]);

  const languagePackageId = useSelector(
    (state) => state.query.languagePackageId
  );
  const staged = useSelector((state) => state.query.staged);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allGroups.groupName"),
        accessor: "name",
        Cell: ({ row }) => row.original.name,
        headerClassName: "w-25",
      },
      {
        Header: t("screens.allGroups.groupDescription"),
        accessor: "description",
        Cell: ({ row }) => (
          <>
            <p
              className="group-description-cell"
              data-tip={row.original.description}
              data-for={`description-tooltip-${row.original.id}`}
            >
              {row.original.description}
            </p>
            <Tooltip id={`description-tooltip-${row.original.id}`} />
          </>
        ),
        headerClassName: "w-50",
      },
      {
        Header: t("screens.allGroups.active"),
        accessor: "active",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            {row.original.active ? (
              <CheckCircleIcon className="text-success" />
            ) : (
              <RemoveCircleIcon className="text-error" />
            )}
          </div>
        ),
      },
    ],
    [t]
  );

  useEffect(() => {
    getGroups(languagePackageId, staged)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((event) => {
        if (event.response?.status === 401 || event.response?.status === 404) {
          showSnack("error", "Error fetching stats");
          return;
        }
        showSnack("error", "Internal Server Error");
      });
  }, [languagePackageId, showSnack, staged]);

  return (
    <div className="group-selection">
      <div className="group-select-wrapper">
        <div className="table-wrapper">
          <Table columns={columns} data={groups} />
        </div>
      </div>
    </div>
  );
};

export default GroupSelection;
