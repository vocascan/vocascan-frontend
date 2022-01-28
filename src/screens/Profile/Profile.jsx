import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import PersonIcon from "@material-ui/icons/Person";

import Button from "../../Components/Button/Button.jsx";
import ConfirmDialog from "../../Components/ConfirmDialog/ConfirmDialog.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";
import PasswordComplexityIndicator from "../../Components/Indicators/PasswordComplexityIndicator/PasswordComplexityIndicator.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import StatsTable from "../../Components/StatsTable/StatsTable.jsx";

import useSnack from "../../hooks/useSnack.js";
import { signOut } from "../../redux/Actions/login.js";
import { deleteUser, changePassword } from "../../utils/api.js";
import { bytesLength } from "../../utils/index.js";

import "./Profile.scss";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showSnack } = useSnack();

  const username = useSelector((state) => state.login.user.username);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [canSubmitDelete, setCanSubmitDelete] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordComplexity, setPasswordComplexity] = useState(0);
  const [isPasswordComplexityOk, setIsPasswordComplexityOk] = useState(false);
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [canSubmitPasswordChange, setCanSubmitPasswordChange] = useState(false);

  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);

  const openPasswordModal = useCallback(() => {
    setShowPasswordModal(true);
  }, []);

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setRepeatedNewPassword("");
    setPasswordComplexity(0);
    setIsPasswordComplexityOk(false);
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

  const onPasswordChange = useCallback(() => {
    changePassword({ newPassword, oldPassword })
      .then((response) => {
        if (response.status === 204) {
          closePasswordModal();
        }
      })
      .catch((event) => {
        if (event.response?.status === 401 || event.response?.status === 404) {
          setOldPasswordError(true);
          return;
        }

        showSnack("error", t("global.fetchError"));
      });
  }, [closePasswordModal, newPassword, oldPassword, showSnack, t]);

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
    const passwordLength = bytesLength(newPassword);

    setIsPasswordComplexityOk(
      passwordLength >= 8 && passwordLength <= 72 && passwordComplexity >= 4
    );
  }, [newPassword, passwordComplexity]);

  useEffect(() => {
    setCanSubmitPasswordChange(
      newPassword === repeatedNewPassword &&
        newPassword !== "" &&
        repeatedNewPassword !== "" &&
        oldPassword !== "" &&
        isPasswordComplexityOk
    );
    setNewPasswordError(newPassword !== repeatedNewPassword);
  }, [isPasswordComplexityOk, newPassword, oldPassword, repeatedNewPassword]);

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

      <ConfirmDialog
        title={t("modal.changePassword.heading")}
        onSubmit={onPasswordChange}
        onClose={closePasswordModal}
        show={showPasswordModal}
        canSubmit={canSubmitPasswordChange}
        showAbortButton={false}
        submitText={t("modal.changePassword.change")}
      >
        <TextInput
          required
          type="password"
          placeholder={t("modal.changePassword.oldPassword")}
          onChange={(value) => {
            setOldPassword(value);
          }}
          value={oldPassword}
          error={oldPasswordError}
          errorText={t("modal.changePassword.oldPasswordError")}
        />
        <TextInput
          required
          type="password"
          placeholder={t("modal.changePassword.newPassword")}
          onChange={(value) => {
            setNewPassword(value);
          }}
          value={newPassword}
          error={newPassword !== "" && !isPasswordComplexityOk}
          errorText={t("screens.register.passwordsNotComplex")}
        />
        <PasswordComplexityIndicator
          password={newPassword}
          complexity={passwordComplexity}
          setComplexity={setPasswordComplexity}
        />
        <TextInput
          required
          type="password"
          placeholder={t("modal.changePassword.repeatNewPassword")}
          onChange={(value) => {
            setRepeatedNewPassword(value);
          }}
          value={repeatedNewPassword}
          error={newPasswordError}
          errorText={t("modal.changePassword.newPasswordError")}
        />
      </ConfirmDialog>
      <Modal
        title={t("modal.changeEmail.heading")}
        open={showEmailModal}
        onClose={closeEmailModal}
      >
        <h1 style={{ margin: "auto" }}>Hello World</h1>
      </Modal>

      <ConfirmDialog
        title={t("modal.deleteAccount.heading")}
        onSubmit={onDelete}
        onClose={closeDeleteAccountModal}
        show={showDeleteAccountModal}
        canSubmit={canSubmitDelete}
        showAbortButton={false}
      >
        <TextInput
          required
          placeholder={t("modal.deleteAccount.input")}
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
