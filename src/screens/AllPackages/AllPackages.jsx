import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import { languages } from "../../utils/constants.js";

import "./AllPackages.scss";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import PackageForm from "../../Forms/PackageForm/PackageForm";
import { getPackages } from "../../utils/api";

const AllPackages = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const [currentPackage, setCurrentPackage] = useState(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  const editPackage = useCallback((pack) => {
    setCurrentPackage(pack);
    setShowPackageModal(true);
  }, []);

  const packageSubmitted = useCallback(() => {
    getPackages().then((response) => {
      setShowPackageModal(false);
      setData(response.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allPackages.packageName"),
        accessor: "name",
        Cell: ({ row }) => (
          <Button variant="link" onClick={() => editPackage(row.original)}>
            {row.original.name}
          </Button>
        ),
      },
      {
        Header: t("screens.allPackages.foreignLanguage"),
        accessor: "foreignWordLanguage",
        Cell: ({ row }) => (
          <span>
            {languages.find(
              (ele) => ele.name === row.original.foreignWordLanguage
            )?.icon +
              " " +
              row.original.foreignWordLanguage}
          </span>
        ),
      },
      {
        Header: t("screens.allPackages.translatedLanguage"),
        accessor: "translatedWordLanguage",
        Cell: ({ row }) => (
          <span>
            {languages.find(
              (ele) => ele.name === row.original.translatedWordLanguage
            )?.icon +
              " " +
              row.original.translatedWordLanguage}
          </span>
        ),
      },
      {
        Header: t("screens.allPackages.vocabsPerDay"),
        accessor: "vocabsPerDay",
      },
      {
        Header: t("screens.allPackages.rightWords"),
        accessor: "rightWords",
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
    [editPackage, t]
  );

  useEffect(() => {
    getPackages().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <>
      <div className="all-packages-wrapper">
        <div className="header-wrapper">
          <h1 className="heading">{t("screens.allPackages.title")}</h1>
        </div>
        <div>
          <Table columns={columns} data={data} />
        </div>
      </div>

      <Modal
        title={"Edit Package"}
        open={showPackageModal}
        onClose={() => setShowPackageModal(false)}
      >
        <PackageForm
          defaultData={currentPackage}
          onSubmitCallback={packageSubmitted}
        />
      </Modal>
    </>
  );
};

export default AllPackages;
