import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "./AllPackages.scss";

import Table from "../../Components/Table/Table";
import { getPackages } from "../../utils/api";

const AllPackages = () => {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Foreign language",
        accessor: "foreignWordLanguage",
      },
      {
        Header: "Translated language",
        accessor: "translatedWordLanguage",
      },
      {
        Header: "",
        accessor: "action",
      },
    ],
    []
  );

  useEffect(() => {
    getPackages().then((response) => {
      setData(() =>
        response.data.map((elem) => {
          return {
            ...elem,
            action: (
              <div style={{ textAlign: "right" }}>
                <Link to={`/allGroups/${elem.id}`}>
                  <KeyboardArrowRightIcon />
                </Link>
              </div>
            ),
          };
        })
      );
    });
  }, []);

  return (
    <div className="all-packages-wrapper">
      <div className="header-wrapper">
        <h1 className="heading">All packages</h1>
      </div>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AllPackages;
