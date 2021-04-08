import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "./AllGroups.scss";

import Table from "../../Components/Table/Table";
import { getGroups } from "../../utils/api";

const AllGroups = () => {
  const { packageId } = useParams();
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "",
        accessor: "action",
      },
    ],
    []
  );

  useEffect(() => {
    getGroups(packageId).then((response) => {
      setData(() =>
        response.data.map((elem) => {
          return {
            ...elem,
            action: (
              <div style={{ textAlign: "right" }}>
                <Link to={`/editGroup/${elem.id}`}>
                  <EditIcon />
                </Link>
                <Link to={`/allVocabs/${elem.id}`}>
                  <KeyboardArrowRightIcon />
                </Link>
              </div>
            ),
          };
        })
      );
    });
  }, [packageId]);

  return (
    <div className="all-groups-wrapper">
      <div class="header-wrapper">
        <ArrowBackIcon className="back" />
        <h1 className="heading">All groups</h1>
      </div>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AllGroups;
