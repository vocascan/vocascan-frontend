import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useHistory } from "react-router-dom";

import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import Button from "../../../Components/Button/Button.jsx";
import ConfirmDialog from "../../../Components/ConfirmDialog/ConfirmDialog.jsx";
import { SelectOptionWithFlag } from "../../../Components/Form/Select/Select.jsx";
import Modal from "../../../Components/Modal/Modal.jsx";
import Table from "../../../Components/Table/Table.jsx";
import Tooltip from "../../../Components/Tooltip/Tooltip.jsx";
import GroupForm from "../../../Forms/GroupForm/GroupForm.jsx";
import ImportPreviewForm from "../../../Forms/ImportPreviewForm/ImportPreviewForm.jsx";

import useFeature, { FEATURES } from "../../../hooks/useFeature.js";
import useSnack from "../../../hooks/useSnack.js";
import { parseFile, saveFile } from "../../../modules/fileOperations.js";
import {
  getGroups,
  getPackages,
  deleteGroup,
  exportGroup,
} from "../../../utils/api.js";

import "./AllGroups.scss";

const AllGroups = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const history = useHistory();
  const { packageId } = useParams();

  const inputFile = useRef(null);

  const [data, setData] = useState([]);
  const [importedData, setImportedData] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showExportConfirmationModal, setShowExportConfirmationModal] =
    useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const { isSupported } = useFeature(FEATURES.IMPORT_EXPORT);

  const openExportGroup = useCallback((pack) => {
    setCurrentGroup(pack);
    setShowExportConfirmationModal(true);
  }, []);

  const editGroup = useCallback(
    (grp) => {
      getPackages()
        .then(({ data }) => {
          const currPack = data.find((ele) => ele.id === packageId);

          setCurrentPackage({
            value: currPack.id,
            label: (
              <SelectOptionWithFlag
                name={currPack.name}
                foreignLanguageCode={currPack.foreignWordLanguage}
                translatedLanguageCode={currPack.translatedWordLanguage}
              />
            ),
          });
        })
        .then(() => {
          setCurrentGroup(grp);
          setShowGroupModal(true);
        });
    },
    [packageId]
  );

  const addGroup = useCallback(() => {
    getPackages()
      .then(({ data }) => {
        const currPack = data.find((ele) => ele.id === packageId);

        setCurrentPackage({
          value: currPack.id,
          label: (
            <SelectOptionWithFlag
              name={currPack.name}
              foreignLanguageCode={currPack.foreignWordLanguage}
              translatedLanguageCode={currPack.translatedWordLanguage}
            />
          ),
        });
      })
      .then(() => {
        setCurrentGroup(null);
        setShowGroupModal(true);
      });
  }, [packageId]);

  const groupSubmitted = useCallback(() => {
    getGroups(packageId, false, false).then((response) => {
      setShowGroupModal(false);
      setData(response.data);
    });
  }, [packageId]);

  const onDeleteGroup = useCallback((grp) => {
    setCurrentGroup(grp);
    setShowDeleteConfirmationModal(true);
  }, []);

  const deleteGrp = useCallback(() => {
    if (currentGroup) {
      deleteGroup(currentGroup.id)
        .then(() => {
          setCurrentGroup(null);
          getGroups(packageId, false, false).then((response) => {
            setData(response.data);
          });
          setShowDeleteConfirmationModal(false);
          showSnack("success", t("screens.allGroups.deleteSuccessMessage"));
        })
        .catch((e) => {
          showSnack("error", t("screens.allGroups.deleteFailMessage"));
        });
    }
  }, [currentGroup, packageId, showSnack, t]);

  const groupImported = useCallback(() => {
    setShowImportModal(false);
    history.go(0);
  }, [history]);

  const submitExportGroup = useCallback(() => {
    if (currentGroup) {
      exportGroup(currentGroup.id)
        .then((response) =>
          saveFile({
            input: response.data,
            name: response.data.name,
            type: "application/json",
          })
        )
        .then(() => {
          setShowExportConfirmationModal(false);
          showSnack("success", t("screens.allGroups.exportSuccessMessage"));
        })
        .catch(() => {
          showSnack("error", t("screens.allGroups.exportFailMessage"));
        });
    }
  }, [currentGroup, showSnack, t]);

  const onOpenFileClick = useCallback(() => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  }, []);

  const submitImport = useCallback(
    async (event) => {
      try {
        const parsedOutput = await parseFile(event);
        const type = parsedOutput?.type?.match(/vocascan\/(\w*)/);

        if (!type) {
          showSnack("error", t("global.fileImportError"));
          return;
        }

        if (type[1] !== "group") {
          showSnack("error", t("screens.allGroups.importWrongTypeFailMessage"));
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
        Header: t("screens.allGroups.groupName"),
        accessor: "name",
        Cell: ({ row }) => (
          <Link
            className="text-normal"
            to={`/library/allVocabs/${packageId}/${row.original.id}`}
          >
            {row.original.name}
          </Link>
        ),
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
      {
        Header: "",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="action-col">
            <Button
              appearance="primary"
              variant="link"
              className="action-col-btn"
              onClick={() => openExportGroup(row.original)}
              disabled={!isSupported}
            >
              <ArrowDownwardIcon />
            </Button>
            <Button
              variant="link"
              className="action-col-btn"
              onClick={() => editGroup(row.original)}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              appearance="red"
              variant="link"
              className="action-col-btn"
              onClick={() => onDeleteGroup(row.original)}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        ),
      },
    ],
    [editGroup, isSupported, onDeleteGroup, openExportGroup, packageId, t]
  );

  useEffect(() => {
    //set default package in order to render default package in import form
    getPackages().then(({ data }) => {
      const currPack = data.find((ele) => ele.id === packageId);

      setCurrentPackage({
        value: currPack.id,
        label: (
          <SelectOptionWithFlag
            name={currPack.name}
            foreignLanguageCode={currPack.foreignWordLanguage}
            translatedLanguageCode={currPack.translatedWordLanguage}
          />
        ),
      });
    });
    getGroups(packageId, false, false).then((response) => {
      setData(response.data);
    });
  }, [packageId]);

  return (
    <>
      <div className="all-groups-wrapper">
        <div className="header-wrapper">
          <Button
            className="back"
            variant="transparent"
            onClick={history.goBack}
          >
            <ArrowBackIcon />
          </Button>
          <h2 className="heading">{t("screens.allGroups.title")}</h2>
          <Button className="add" variant="transparent">
            <AddCircleOutlinedIcon onClick={addGroup} />
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
          currentGroup
            ? t("screens.allGroups.editGroup")
            : t("screens.allGroups.addGroup")
        }
        open={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        size="large"
      >
        <GroupForm
          fixedPackage
          defaultData={currentGroup}
          selectedPackage={currentPackage}
          onSubmitCallback={groupSubmitted}
        />
      </Modal>

      <Modal
        title={t("global.import")}
        size={"large"}
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
      >
        <ImportPreviewForm
          onSubmitCallback={groupImported}
          defaultPackage={currentPackage}
          importedData={importedData}
        />
      </Modal>

      <ConfirmDialog
        title={t("components.importExport.exportGroup")}
        description={t("screens.allPackages.deleteDescription", {
          name: currentPackage?.name,
        })}
        submitText={t("global.export")}
        onSubmit={submitExportGroup}
        onClose={() => setShowExportConfirmationModal(false)}
        show={showExportConfirmationModal}
      />

      {currentGroup && (
        <ConfirmDialog
          title={t("screens.allGroups.deleteTitle")}
          description={t("screens.allGroups.deleteDescription", {
            name: currentGroup.name,
          })}
          onSubmit={deleteGrp}
          onClose={() => setShowDeleteConfirmationModal(false)}
          show={showDeleteConfirmationModal}
        />
      )}
    </>
  );
};

export default AllGroups;
