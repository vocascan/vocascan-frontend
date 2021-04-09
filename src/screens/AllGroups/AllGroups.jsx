import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "./AllGroups.scss";

import Table from "../../Components/Table/Table";
import { getGroups } from "../../utils/api";

const AllGroups = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { packageId } = useParams();
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allGroups.groupName"),
        accessor: "name",
        Cell: ({ row }) => (
          <Link to={`/editGroup/${row.original.id}`}>{row.original.name}</Link>
        ),
      },
      {
        Header: "",
        accessor: "action",
        Cell: ({ row }) => (
          <div style={{ textAlign: "right" }}>
            <Link to={`/allVocabs/${row.original.id}`}>
              <KeyboardArrowRightIcon />
            </Link>
          </div>
        ),
      },
    ],
    [t]
  );

  useEffect(() => {
    getGroups(packageId).then((response) => {
      setData(response.data);
    });
  }, [packageId]);

  return (
    <div className="all-groups-wrapper">
      <div className="header-wrapper">
        <ArrowBackIcon className="back" onClick={history.goBack} />
        <h1 className="heading">{t("screens.allGroups.title")}</h1>
      </div>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AllGroups;
