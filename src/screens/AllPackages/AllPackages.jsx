import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import ConfirmDialog from "../../Components/ConfirmDialog/ConfirmDialog.jsx";
import useSnack from "../../hooks/useSnack.jsx";

import { languages } from "../../utils/constants.js";

import "./AllPackages.scss";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import PackageForm from "../../Forms/PackageForm/PackageForm";
import { getPackages, deletePackage } from "../../utils/api";

const AllPackages = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const [data, setData] = useState([]);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [
    showDeleteConfirmationModal,
    setShowDeleteConfirmationModal,
  ] = useState(false);

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

  const onDeletePckge = useCallback((grp) => {
    setCurrentPackage(grp);
    setShowDeleteConfirmationModal(true);
  }, []);

  const deletePckge = useCallback(() => {
    if (currentPackage) {
      deletePackage(currentPackage.id)
        .then(() => {
          setCurrentPackage(null);
          getPackages().then((response) => {
            setData(response.data);
          });
          setShowDeleteConfirmationModal(false);
          showSnack("success", t("screens.allPackages.deleteSuccessMessage"));
        })
        .catch((e) => {
          showSnack("error", t("screens.allPackages.deleteFailMessage"));
        });
    }
  }, [currentPackage, showSnack, t]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allPackages.packageName"),
        accessor: "name",
        Cell: ({ row }) => (
          <Link className="text-normal" to={`/allGroups/${row.original.id}`}>
            {row.original.name}
          </Link>
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
          <div className="action-col">
            <Button
              appearance="primary"
              variant="link"
              onClick={() => editPackage(row.original)}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              appearance="red"
              variant="link"
              onClick={() => onDeletePckge(row.original)}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        ),
      },
    ],
    [editPackage, onDeletePckge, t]
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

      {currentPackage && (
        <ConfirmDialog
          title={t("screens.allPackages.deleteTitle")}
          description={t("screens.allPackages.deleteDescription", {
            name: currentPackage.name,
          })}
          onSubmit={deletePckge}
          onClose={() => setShowDeleteConfirmationModal(false)}
          show={showDeleteConfirmationModal}
        />
      )}
    </>
  );
};

export default AllPackages;
