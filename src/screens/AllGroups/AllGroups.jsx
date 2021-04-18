import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import "./AllGroups.scss";

import Button from "../../Components/Button/Button";
import { CustomPackageSelectOption } from "../../Components/Form/Select/Select";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import GroupForm from "../../Forms/GroupForm/GroupForm";
import { getGroups, getPackages } from "../../utils/api";
import { languages } from "../../utils/constants";

const AllGroups = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { packageId } = useParams();
  const [data, setData] = useState([]);

  const [currentPackage, setCurrentPackage] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

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

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allGroups.groupName"),
        accessor: "name",
        Cell: ({ row }) => (
          <Link className="text-normal" to={`/allVocabs/${row.original.id}`}>
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="link" onClick={() => editGroup(row.original)}>
              <EditIcon />
            </Button>
            <Button
              appearance="red"
              variant="link"
              onClick={() => console.log("deleting group")}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        ),
      },
    ],
    [editGroup, t]
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
    </>
  );
};

export default AllGroups;
