import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

import "./AllVocabs.scss";

import Table from "../../Components/Table/Table";
import { getGroupVocabulary } from "../../utils/api";

const AllVocabs = () => {
  const { groupId } = useParams();
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Translations",
        accessor: "translations",
      },
      {
        Header: "",
        accessor: "action",
      },
    ],
    []
  );

  useEffect(() => {
    getGroupVocabulary(groupId).then((response) => {
      setData(() =>
        response.data.map((elem) => {
          return {
            ...elem,
            translations: elem.Translations.map((el) => el.name).join(", "),
            action: (
              <div style={{ textAlign: "right" }}>
                <Link to={`/editVocab/${elem.id}`}>
                  <EditIcon />
                </Link>
              </div>
            ),
          };
        })
      );
    });
  }, [groupId]);

  return (
    <div className="all-vocabs-wrapper">
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

export default AllVocabs;
