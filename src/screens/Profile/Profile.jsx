import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import PersonIcon from "@material-ui/icons/Person";

import Button from "../../Components/Button/Button.jsx";
import ConfirmDialog from "../../Components/ConfirmDialog/ConfirmDialog.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import StatsTable from "../../Components/StatsTable/StatsTable.jsx";

import { signOut } from "../../redux/Actions/login.js";
import { deleteUser } from "../../utils/api.js";

import "./Profile.scss";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.login.user.username);

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
    setDeleteConfirmation("");
    setShowDeleteAccountModal(false);
  }, []);

  const onDelete = useCallback(() => {
    deleteUser()
      .then((response) => {
        dispatch(signOut());
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch]);

  useEffect(() => {
    setCanSubmitDelete(deleteConfirmation === username);
  }, [deleteConfirmation, username]);

  return (
    <>
      <div className="profile-screen">
        <div className="profile-avatar-wrapper">
          <PersonIcon className="profile-avatar" />
        </div>
        <h1 className="profile-username">{username}</h1>
        <StatsTable />
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

      <ConfirmDialog
        title={t("screens.profile.modals.deleteAccount.heading")}
        onSubmit={onDelete}
        onClose={closeDeleteAccountModal}
        show={showDeleteAccountModal}
        canSubmit={canSubmitDelete}
        showAbortButton={false}
      >
        <TextInput
          required
          placeholder={t("screens.profile.modals.deleteAccount.input")}
          onChange={(value) => {
            setDeleteConfirmation(value);
          }}
          value={deleteConfirmation}
        />
      </ConfirmDialog>
    </>
  );
};

export default Profile;
