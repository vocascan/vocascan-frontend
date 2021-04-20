import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import PersonIcon from "@material-ui/icons/Person";

import Button from "../../Components/Button/Button.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import Table from "../../Components/Table/Table.jsx";

import useSnack from "../../hooks/useSnack.js";
import { signOut } from "../../redux/Actions/login.js";
import { getStats, deleteUser } from "../../utils/api.js";

import "./Profile.scss";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showSnack } = useSnack();

  const username = useSelector((state) => state.login.user.username);
  const [stats, setStats] = useState({});

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [canSubmitDelete, setCanSubmitDelete] = useState(false);

  const openPasswordModal = useCallback(() => {
    setShowPasswordModal(true);
  }, []);

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
  }, []);

  const openEmailModal = useCallback(() => {
    setShowEmailModal(true);
  }, []);

  const closeEmailModal = useCallback(() => {
    setShowEmailModal(false);
  }, []);

  const openDeleteAccountModal = useCallback(() => {
    setShowDeleteAccountModal(true);
  }, []);

  const closeDeleteAccountModal = useCallback(() => {
    setShowDeleteAccountModal(false);
  }, []);

  useEffect(() => {
    getProfileStats();
  });

  //make api call to login
  const getProfileStats = useCallback(() => {
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
  }, []);

  const checkDeleteConfirmation = (value) => {
    if (value === "delete") {
      setCanSubmitDelete(true);
    } else {
      setCanSubmitDelete(false);
    }
  };

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

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
              <Button
                block
                uppercase
                appearance="red"
                onClick={openPasswordModal}
              >
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
              <Button block uppercase appearance="red" onClick={openEmailModal}>
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
                onClick={openDeleteAccountModal}
              >
                {t("screens.profile.accountSettings.delete.title")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={t("screens.profile.modals.changePassword.heading")}
        open={showPasswordModal}
        onClose={closePasswordModal}
      >
        <h1 style={{ margin: "auto" }}>Hello World</h1>
      </Modal>
      <Modal
        title={t("screens.profile.modals.changeEmail.heading")}
        open={showEmailModal}
        onClose={closeEmailModal}
      >
        <h1 style={{ margin: "auto" }}>Hello World</h1>
      </Modal>
      <Modal
        title={t("screens.profile.modals.deleteAccount.heading")}
        open={showDeleteAccountModal}
        onClose={closeDeleteAccountModal}
      >
        <div className="deletion-modal">
          <TextInput
            required
            placeholder={t("screens.profile.modals.deleteAccount.input")}
            onChange={(value) => {
              setDeleteConfirmation(value);
              checkDeleteConfirmation(value);
            }}
            value={deleteConfirmation}
          />
          <Button
            block
            uppercase
            appearance={"red"}
            onClick={() => {
              deleteUser();
              handleLogout();
            }}
            disabled={!canSubmitDelete}
          >
            {t("global.delete")}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
