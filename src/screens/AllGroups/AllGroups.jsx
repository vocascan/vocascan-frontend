import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import "./AllGroups.scss";

import Button from "../../Components/Button/Button";
import ConfirmDialog from "../../Components/ConfirmDialog/ConfirmDialog";
import { CustomPackageSelectOption } from "../../Components/Form/Select/Select";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import GroupForm from "../../Forms/GroupForm/GroupForm";
import useSnack from "../../hooks/useSnack";
import { getGroups, getPackages, deleteGroup } from "../../utils/api";
import { languages } from "../../utils/constants";

const AllGroups = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const history = useHistory();
  const { packageId } = useParams();

  const [data, setData] = useState([]);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [
    showDeleteConfirmationModal,
    setShowDeleteConfirmationModal,
  ] = useState(false);

  const editGroup = useCallback(
    (grp) => {
      getPackages()
        .then(({ data }) => {
          const currPack = data.find((ele) => ele.id === packageId);

          const foreignIcon = languages.find(
            (x) => x.name === currPack.foreignWordLanguage
          ).icon;
          const translatedIcon = languages.find(
            (x) => x.name === currPack.translatedWordLanguage
          ).icon;

          setCurrentPackage({
            value: currPack.id,
            label: (
              <CustomPackageSelectOption
                name={currPack.name}
                postfix={foreignIcon + " - " + translatedIcon}
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

  const groupSubmitted = useCallback(() => {
    getGroups(packageId).then((response) => {
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
          getGroups(packageId).then((response) => {
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

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allGroups.groupName"),
        accessor: "name",
        Cell: ({ row }) => (
          <Link
            className="text-normal"
            to={`/allVocabs/${packageId}/${row.original.id}`}
          >
            {row.original.name}
          </Link>
        ),
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
            <Button variant="link" onClick={() => editGroup(row.original)}>
              <EditOutlinedIcon />
            </Button>
            <Button
              appearance="red"
              variant="link"
              onClick={() => onDeleteGroup(row.original)}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        ),
      },
    ],
    [editGroup, onDeleteGroup, packageId, t]
  );

  useEffect(() => {
    getGroups(packageId).then((response) => {
      setData(response.data);
    });
  }, [packageId]);

  return (
    <>
      <div className="all-groups-wrapper">
        <div className="header-wrapper">
          <ArrowBackIcon className="back" onClick={history.goBack} />
          <h1 className="heading">{t("screens.allGroups.title")}</h1>
        </div>
        <div>
          <Table columns={columns} data={data} />
        </div>
      </div>

      <Modal
        title={"Edit Group"}
        open={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      >
        <GroupForm
          fixedPackage
          defaultData={currentGroup}
          selectedPackage={currentPackage}
          onSubmitCallback={groupSubmitted}
        />
      </Modal>

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
