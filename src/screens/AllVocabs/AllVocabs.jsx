import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

import "./AllVocabs.scss";

import Table from "../../Components/Table/Table";
import { getGroupVocabulary } from "../../utils/api";

const AllVocabs = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { groupId } = useParams();
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allVocabs.vocabel"),
        accessor: "name",
        Cell: ({ row }) => (
          <Link to={`/editVocab/${row.original.id}`}>{row.original.name}</Link>
        ),
      },
      {
        Header: t("screens.allVocabs.translations"),
        accessor: "translations",
      },
      {
        Header: "",
        accessor: "action",
        Cell: ({ row }) => (
          <div style={{ textAlign: "right" }}>
            <Link to={`/editVocab/${row.original.id}`}>
              <EditIcon />
            </Link>
          </div>
        ),
      },
    ],
    [t]
  );

  useEffect(() => {
    getGroupVocabulary(groupId).then((response) => {
      setData(() =>
        response.data.map((elem) => {
          return {
            ...elem,
            translations: elem.Translations.map((el) => el.name).join(", "),
          };
        })
      );
    });
  }, [groupId]);

  return (
    <div className="all-vocabs-wrapper">
      <div className="header-wrapper">
        <ArrowBackIcon className="back" onClick={history.goBack} />
        <h1 className="heading">{t("screens.allVocabs.title")}</h1>
      </div>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AllVocabs;
