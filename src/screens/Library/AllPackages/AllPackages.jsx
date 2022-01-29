import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import Button from "../../../Components/Button/Button.jsx";
import ConfirmDialog from "../../../Components/ConfirmDialog/ConfirmDialog.jsx";
import Flag from "../../../Components/Flag/Flag.jsx";
import Switch from "../../../Components/Form/Switch/Switch.jsx";
import Modal from "../../../Components/Modal/Modal.jsx";
import Table from "../../../Components/Table/Table.jsx";
import ImportPreviewForm from "../../../Forms/ImportPreviewForm/ImportPreviewForm.jsx";
import PackageForm from "../../../Forms/PackageForm/PackageForm.jsx";

import useFeature, { FEATURES } from "../../../hooks/useFeature.js";
import useSnack from "../../../hooks/useSnack.js";
import { parseFile, saveFile } from "../../../modules/fileOperations.js";
import {
  getPackages,
  deletePackage,
  exportPackage,
} from "../../../utils/api.js";
import { findLanguageByCode, getLanguageString } from "../../../utils/index.js";

import "./AllPackages.scss";

const AllPackages = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { showSnack } = useSnack();

  const inputFile = useRef(null);

  const [data, setData] = useState([]);
  const [importedData, setImportedData] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showExportConfirmationModal, setShowExportConfirmationModal] =
    useState(false);
  const [exportPackageQueryStatus, setExportPackageQueryStatus] =
    useState(false);

  const [showImportModal, setShowImportModal] = useState(false);

  const languages = useSelector((state) => state.language.languages);

  const { isSupported } = useFeature(FEATURES.IMPORT_EXPORT);

  const editPackage = useCallback((pack) => {
    setCurrentPackage(pack);
    setShowPackageModal(true);
  }, []);

  const openExportPackage = useCallback((pack) => {
    setCurrentPackage(pack);
    setShowExportConfirmationModal(true);
  }, []);

  const addPackage = useCallback(() => {
    setCurrentPackage(null);
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

  const packageImported = useCallback(() => {
    setShowImportModal(false);
    history.go(0);
  }, [history]);

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

  const submitExportPackage = useCallback(() => {
    if (currentPackage) {
      exportPackage(currentPackage.id, exportPackageQueryStatus)
        .then((response) =>
          saveFile({
            input: response.data,
            name: response.data.name,
            type: "application/json",
          })
        )
        .then(() => {
          setShowExportConfirmationModal(false);
          showSnack("success", t("screens.allPackages.exportSuccessMessage"));
        })
        .catch((e) => {
          showSnack("error", t("screens.allPackages.exportFailMessage"));
        });
    }
  }, [currentPackage, exportPackageQueryStatus, showSnack, t]);

  const onOpenFileClick = useCallback(() => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  }, []);

  const submitImport = useCallback(
    async (event) => {
      try {
        const parsedOutput = await parseFile(event);
        const type = parsedOutput.type?.match(/vocascan\/(\w*)/);

        if (!type) {
          showSnack("error", t("global.fileImportError"));
          return;
        }

        if (type[1] !== "package") {
          showSnack(
            "error",
            t("screens.allPackages.importWrongTypeFailMessage")
          );
          return;
        }

        setImportedData(parsedOutput);
        setShowImportModal(true);
      } catch {
        showSnack("error", t("global.fileImportError"));
      }
    },
    [showSnack, t]
  );

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allPackages.packageName"),
        accessor: "name",
        Cell: ({ row }) => (
          <Link
            className="text-normal"
            to={`/library/allGroups/${row.original.id}`}
          >
            {row.original.name}
          </Link>
        ),
      },
      {
        Header: t("screens.allPackages.foreignLanguage"),
        accessor: "foreignWordLanguage",
        Cell: ({ row }) => (
          <div className="flag-cell-wrapper">
            <Flag languageCode={row.original.foreignWordLanguage} border />
            {getLanguageString(
              findLanguageByCode(row.original.foreignWordLanguage, languages)
            )}
          </div>
        ),
      },
      {
        Header: t("screens.allPackages.translatedLanguage"),
        accessor: "translatedWordLanguage",
        Cell: ({ row }) => (
          <div className="flag-cell-wrapper">
            <Flag languageCode={row.original.translatedWordLanguage} border />
            {getLanguageString(
              findLanguageByCode(row.original.translatedWordLanguage, languages)
            )}
          </div>
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
              className="action-col-btn"
              onClick={() => openExportPackage(row.original)}
              disabled={!isSupported}
            >
              <ArrowDownwardIcon />
            </Button>
            <Button
              appearance="primary"
              variant="link"
              className="action-col-btn"
              onClick={() => editPackage(row.original)}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              appearance="red"
              variant="link"
              className="action-col-btn"
              onClick={() => onDeletePckge(row.original)}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        ),
      },
    ],
    [t, languages, isSupported, openExportPackage, editPackage, onDeletePckge]
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
          <h2 className="heading">{t("screens.allPackages.title")}</h2>
          <Button className="add" variant="transparent">
            <AddCircleOutlinedIcon onClick={addPackage} />
          </Button>
          <Button
            className="import"
            variant="transparent"
            disabled={!isSupported}
          >
            <input
              type="file"
              id="file"
              ref={inputFile}
              onChange={(e) => submitImport(e)}
              style={{ display: "none" }}
            />

            <ArrowUpwardIcon onClick={onOpenFileClick} />
          </Button>
        </div>
        <div className="table-wrapper">
          <Table columns={columns} data={data} />
        </div>
      </div>

      <Modal
        title={
          currentPackage
            ? t("screens.allPackages.editPackage")
            : t("screens.allPackages.addPackage")
        }
        open={showPackageModal}
        onClose={() => setShowPackageModal(false)}
      >
        <PackageForm
          defaultData={currentPackage}
          onSubmitCallback={packageSubmitted}
        />
      </Modal>

      <Modal
        title={t("global.import")}
        size={"large"}
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
      >
        <ImportPreviewForm
          onSubmitCallback={packageImported}
          importedData={importedData}
        />
      </Modal>

      <ConfirmDialog
        title={t("components.importExport.exportPackage")}
        description={t("screens.allPackages.exportDescription", {
          name: currentPackage?.name,
        })}
        submitText={t("global.export")}
        onSubmit={submitExportPackage}
        onClose={() => setShowExportConfirmationModal(false)}
        show={showExportConfirmationModal}
      >
        <Switch
          switcher
          optionRight={t("screens.allPackages.exportQueryStatus")}
          onChange={() =>
            setExportPackageQueryStatus((prevCheck) => !prevCheck)
          }
          checked={exportPackageQueryStatus}
        />
      </ConfirmDialog>

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
