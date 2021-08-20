import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import Button from "../../../Components/Button/Button.jsx";
import ConfirmDialog from "../../../Components/ConfirmDialog/ConfirmDialog.jsx";
import Modal from "../../../Components/Modal/Modal.jsx";
import Table from "../../../Components/Table/Table.jsx";
import VocabForm from "../../../Forms/VocabForm/VocabForm.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getGroupVocabulary, deleteVocabulary } from "../../../utils/api.js";

import "./AllVocabs.scss";

const AllVocabs = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const history = useHistory();
  const { packageId, groupId } = useParams();

  const [data, setData] = useState([]);
  const [currentVocab, setCurrentVocab] = useState(null);
  const [showVocabModal, setShowVocabModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const fetchVocabs = useCallback(() => {
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

  const editVocab = useCallback((voc) => {
    setCurrentVocab(voc);
    setShowVocabModal(true);
  }, []);

  const addVocab = useCallback(() => {
    setCurrentVocab(null);
    setShowVocabModal(true);
  }, []);

  const onDeleteVocab = useCallback((voc) => {
    setCurrentVocab(voc);
    setShowDeleteConfirmationModal(true);
  }, []);

  const deleteVocab = useCallback(() => {
    if (currentVocab) {
      deleteVocabulary(currentVocab.id)
        .then(() => {
          setCurrentVocab(null);
          fetchVocabs();
          setShowDeleteConfirmationModal(false);
          showSnack("success", t("screens.allVocabs.deleteSuccessMessage"));
        })
        .catch((e) => {
          showSnack("error", t("screens.allVocabs.deleteFailMessage"));
        });
    }
  }, [currentVocab, fetchVocabs, showSnack, t]);

  const vocabSubmitted = useCallback(() => {
    fetchVocabs();
    if (currentVocab) {
      setShowVocabModal(false);
    }
  }, [currentVocab, fetchVocabs]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allVocabs.vocabel"),
        accessor: "name",
        Cell: ({ row }) => (
          <Button
            className="text-normal"
            variant="link"
            onClick={() => editVocab(row.original)}
          >
            {row.original.name}
          </Button>
        ),
      },
      {
        Header: t("screens.allVocabs.description"),
        accessor: "description",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            <p>{row.original.description}</p>
          </div>
        ),
      },
      {
        Header: t("screens.allVocabs.translations"),
        accessor: "translations",
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
            <Button variant="link" onClick={() => editVocab(row.original)}>
              <EditOutlinedIcon />
            </Button>
            <Button
              appearance="red"
              variant="link"
              onClick={() => onDeleteVocab(row.original)}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        ),
      },
    ],
    [editVocab, onDeleteVocab, t]
  );

  useEffect(() => {
    fetchVocabs();
  }, [fetchVocabs]);

  return (
    <>
      <div className="all-vocabs-wrapper">
        <div className="header-wrapper">
          <Button
            className="back"
            variant="transparent"
            onClick={history.goBack}
          >
            <ArrowBackIcon />
          </Button>
          <h2 className="heading">{t("screens.allVocabs.title")}</h2>
          <Button className="add" variant="transparent">
            <AddCircleOutlinedIcon onClick={addVocab} />
          </Button>
        </div>
        <div>
          <Table columns={columns} data={data} />
        </div>
      </div>

      <Modal
        title={
          currentVocab
            ? t("screens.allVocabs.editVocab")
            : t("screens.allVocabs.addVocab")
        }
        open={showVocabModal}
        onClose={() => setShowVocabModal(false)}
        size="xl"
      >
        <VocabForm
          packageId={packageId}
          groupId={groupId}
          defaultData={currentVocab}
          onSubmitCallback={vocabSubmitted}
        />
      </Modal>

      {currentVocab && (
        <ConfirmDialog
          title={t("screens.allVocabs.deleteTitle")}
          description={t("screens.allVocabs.deleteDescription", {
            name: currentVocab.name,
          })}
          onSubmit={deleteVocab}
          onClose={() => setShowDeleteConfirmationModal(false)}
          show={showDeleteConfirmationModal}
        />
      )}
    </>
  );
};

export default AllVocabs;
