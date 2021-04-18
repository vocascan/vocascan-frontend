import React, { useEffect, useState, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import PersonIcon from "@material-ui/icons/Person";

import Button from "../../Components/Button/Button.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import useSnack from "../../hooks/useSnack.jsx";

import { getStats, deleteUser } from "../../utils/api.js";

import "./Profile.scss";

import Table from "../../Components/Table/Table";

const Profile = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const username = useSelector((state) => state.login.user.username);
  const [stats, setStats] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteModal = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  useEffect(() => {
    getProfileStats();
  });

  //make api call to login
  const getProfileStats = () => {
    getStats()
      .then((response) => {
        //store stats in variables
        setStats(response.data);
      })
      .catch((event) => {
        if (event.response?.status === 401 || event.response?.status === 404) {
          showSnack("error", "Error fetching stats");
          return;
        }

        showSnack("error", "Internal Server Error");
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: t("screens.profile.stats.stats"),
        accessor: "stats", // accessor is the "key" in the data
      },
      {
        Header: t("global.packages"),
        accessor: "packages",
      },
      {
        Header: t("global.groups"),
        accessor: "groups",
      },
      {
        Header: t("global.vocabs"),
        accessor: "vocabs",
      },
    ],
    [t]
  );

  const data = React.useMemo(
    () => [
      {
        stats: t("screens.profile.stats.total"),
        packages: stats.languagePackages || "-",
        groups: stats.inactiveGroups + stats.activeGroups || "-",
        vocabs: stats.inactiveVocabulary + stats.activeVocabulary || "-",
      },
      {
        stats: t("screens.profile.stats.active"),
        packages: "-",
        groups: stats.activeGroups || "-",
        vocabs: stats.activeVocabulary || "-",
      },
      {
        stats: t("screens.profile.stats.inactive"),
        packages: "-",
        groups: stats.inactiveGroups || "-",
        vocabs: stats.inactiveVocabulary || "-",
      },
    ],
    [
      stats.activeGroups,
      stats.activeVocabulary,
      stats.inactiveGroups,
      stats.inactiveVocabulary,
      stats.languagePackages,
      t,
    ]
  );

  return (
    <>
      <div className="profile-screen">
        <div className="profile-avatar-wrapper">
          <PersonIcon className="profile-avatar" />
        </div>
        <h1 className="profile-username">{username}</h1>
        <Table columns={columns} data={data} pagination={false} />
        <h1 className="account-settings-header">
          {t("screens.profile.accountSettings.title")}
        </h1>
        <div className="account-settings">
          <div className="account-settings-fields border-bottom">
            <div className="description-wrapper">
              <h3>{t("screens.profile.accountSettings.password.title")}</h3>
              <p>{t("screens.profile.accountSettings.password.description")}</p>
            </div>
            <div className="button-wrapper">
              <Button block uppercase appearance="red">
                {t("screens.profile.accountSettings.password.title")}
              </Button>
            </div>
          </div>
          <div className="account-settings-fields border-bottom">
            <div className="description-wrapper">
              <h3>{t("screens.profile.accountSettings.email.title")}</h3>
              <p>{t("screens.profile.accountSettings.email.description")}</p>
            </div>
            <div className="button-wrapper">
              <Button block uppercase appearance="red">
                {t("screens.profile.accountSettings.email.title")}
              </Button>
            </div>
          </div>
          <div className="account-settings-fields">
            <div className="description-wrapper">
              <h3>{t("screens.profile.accountSettings.delete.title")}</h3>
              <p>{t("screens.profile.accountSettings.delete.description")}</p>
            </div>
            <div className="button-wrapper">
              <Button
                block
                uppercase
                appearance="red"
                onClick={openDeleteModal}
              >
                {t("screens.profile.accountSettings.delete.title")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={"Delete Account"}
        open={showDeleteModal}
        onClose={closeDeleteModal}
        closeOnClickOutside={false}
      >
        <h1 style={{ margin: "auto" }}>Hello World</h1>
      </Modal>
    </>
  );
};

export default Profile;
