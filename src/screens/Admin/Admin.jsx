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
    (state) => state.login.serverInfo?.locked || false
  );

  const inviteCodeSubmitted = useCallback(() => {
    setShowInviteCodeModal(false);
    //reload windows in order to show new invite code
    history.go(0);
  }, [history]);

  useEffect(() => {
    getInviteCodes()
      .then((res) => {
        const today = Date.now();

        const sortedInviteCodes = res.data
          .sort((a, b) => {
            const aLeft = (a.maxUses || Infinity) - a.uses;
            const bLeft = (b.maxUses || Infinity) - b.uses;
            const aDate = new Date(a.expirationDate).getTime() || Infinity;
            const bDate = new Date(b.expirationDate).getTime() || Infinity;
            const dateDiff = bDate - aDate;

            if (
              (aDate <= today && bDate <= today) ||
              (aLeft <= 0 && bLeft <= 0)
            )
              return 0; // date or uses of both invites are expired

            if (aLeft <= 0 && bLeft > 0) return -1; // uses of invite a are expired
            if (bLeft <= 0 && aLeft > 0) return 1; // uses of invite b are expired

            if (aDate <= today && bDate > today) return -1; // date of invite a is expired
            if (bDate <= today && aDate > today) return 1; // date of invite b is expired

            if (dateDiff !== 0) return dateDiff; // sort by dateDiff if not zero

            return aLeft - bLeft; // sort by uses if dates are equal
          })
          .reverse(); // reverse the list, so that the expired are at the bottom
        setInviteCodes(sortedInviteCodes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="admin">
        {serverRegistrationLocked && (
          <div className="invite-codes">
            <div className="invite-code-controls">
              <Button className="add-btn" variant="transparent">
                <AddCircleOutlinedIcon
                  onClick={() => setShowInviteCodeModal(true)}
                />
              </Button>
            </div>

            <div className="invite-code-container">
              {inviteCodes.map((inviteCode) => (
                <InviteCode key={inviteCode.code} data={inviteCode} />
              ))}
            </div>
          </div>
        )}

        {!serverRegistrationLocked && (
          <div className="center-wrapper">
            <h2>{t("screens.admin.nothingToDo")}</h2>
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
