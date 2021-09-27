import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";

import Button from "../../Components/Button/Button.jsx";
import Modal from "../../Components/Modal/Modal.jsx";

import "./Admin.scss";

import InviteCode from "../../Components/InviteCode/InviteCode";
import InviteCodeForm from "../../Forms/InviteCodeForm/InviteCodeForm";
import { getInviteCodes } from "../../utils/api";

const Admin = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [inviteCodes, setInviteCodes] = useState([]);
  const [showInviteCodeModal, setShowInviteCodeModal] = useState(false);
  const serverRegistrationLocked = useSelector(
    (state) => state.setting.serverRegistrationLocked
  );

  const inviteCodeSubmitted = useCallback(() => {
    setShowInviteCodeModal(false);
    //reload windows in order to show new invite code
    history.go(0);
  }, [history]);

  useEffect(() => {
    getInviteCodes()
      .then((res) => {
        setInviteCodes(res.data);
      })
      .catch((err) => {
        console.log("Error");
      });
  }, []);

  return (
    <>
      <div className="admin">
        <h1>{t("screens.admin.title")}</h1>
        {serverRegistrationLocked && (
          <div>
            <Button className="add" variant="transparent">
              <AddCircleOutlinedIcon
                onClick={() => setShowInviteCodeModal(true)}
              />
            </Button>
            <div className="invite-code-field">
              {inviteCodes.map((inviteCode, index) => (
                <InviteCode key={index} data={inviteCode} />
              ))}
            </div>
          </div>
        )}
      </div>
      {serverRegistrationLocked && (
        <Modal
          title={t("modal.createInviteCode.heading")}
          open={showInviteCodeModal}
          onClose={() => setShowInviteCodeModal(false)}
        >
          <InviteCodeForm onSubmitCallback={inviteCodeSubmitted} />
        </Modal>
      )}
    </>
  );
};

export default Admin;
