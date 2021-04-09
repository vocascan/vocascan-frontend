import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "./AllPackages.scss";

import Table from "../../Components/Table/Table";
import { getPackages } from "../../utils/api";

const AllPackages = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allPackages.packageName"),
        accessor: "name",
        Cell: ({ row }) => (
          <Link to={`/editPackage/${row.original.id}`}>
            {row.original.name}
          </Link>
        ),
      },
      {
        Header: t("screens.allPackages.foreignLanguage"),
        accessor: "foreignWordLanguage",
      },
      {
        Header: t("screens.allPackages.translatedLanguage"),
        accessor: "translatedWordLanguage",
      },
      {
        Header: "",
        accessor: "action",
        Cell: ({ row }) => (
          <div style={{ textAlign: "right" }}>
            <Link to={`/allGroups/${row.original.id}`}>
              <KeyboardArrowRightIcon />
            </Link>
          </div>
        ),
      },
    ],
    [t]
  );

  useEffect(() => {
    getPackages().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="all-packages-wrapper">
      <div className="header-wrapper">
        <h1 className="heading">{t("screens.allPackages.title")}</h1>
      </div>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AllPackages;
