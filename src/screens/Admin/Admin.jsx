import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";

import Button from "../../Components/Button/Button.jsx";
import Modal from "../../Components/Modal/Modal.jsx";

import "./Admin.scss";

import InviteCode from "../../Components/InviteCode/InviteCode";
import InviteCodeForm from "../../Forms/InviteCodeForm/InviteCodeForm";
import { deleteInviteCode, getInviteCodes } from "../../utils/api";

const Admin = () => {
  const { t } = useTranslation();
  const [inviteCodes, setInviteCodes] = useState([]);
  const [sortedInviteCodes, setSortedInviteCodes] = useState([]);
  const [showInviteCodeModal, setShowInviteCodeModal] = useState(false);
  const serverRegistrationLocked = useSelector(
    (state) => state.login.serverInfo?.locked || false
  );

  const inviteCodeSubmitted = useCallback((data) => {
    setInviteCodes((inviteCodes) => [...inviteCodes, data]);
    setShowInviteCodeModal(false);
  }, []);

  const handleDelete = useCallback(async (code) => {
    try {
      await deleteInviteCode(code);

      setInviteCodes((inviteCodes) =>
        inviteCodes.filter((inviteCode) => inviteCode.code !== code)
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const today = Date.now();

    const sortedInviteCodes = inviteCodes
      .sort((a, b) => {
        const aLeft = (a.maxUses || Infinity) - a.uses;
        const bLeft = (b.maxUses || Infinity) - b.uses;
        const aDate = new Date(a.expirationDate).getTime() || Infinity;
        const bDate = new Date(b.expirationDate).getTime() || Infinity;
        const dateDiff = bDate - aDate;

        if ((aDate <= today && bDate <= today) || (aLeft <= 0 && bLeft <= 0))
          return 0; // date or uses of both invites are expired

        if (aLeft <= 0 && bLeft > 0) return -1; // uses of invite a are expired
        if (bLeft <= 0 && aLeft > 0) return 1; // uses of invite b are expired

        if (aDate <= today && bDate > today) return -1; // date of invite a is expired
        if (bDate <= today && aDate > today) return 1; // date of invite b is expired

        if (dateDiff !== 0) return dateDiff; // sort by dateDiff if not zero

        return aLeft - bLeft; // sort by uses if dates are equal
      })
      .reverse(); // reverse the list, so that the expired are at the bottom

    setSortedInviteCodes(sortedInviteCodes);
  }, [inviteCodes]);

  useEffect(() => {
    getInviteCodes()
      .then((res) => {
        setInviteCodes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!serverRegistrationLocked) {
    return (
      <div className="admin">
        <div className="center-wrapper">
          <h2>{t("screens.admin.nothingToDo")}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="invite-codes">
        <div className="invite-codes-wrapper">
          <div className="invite-code-controls">
            <h2>{t("screens.admin.title")}</h2>

            <Button className="add-btn" variant="transparent">
              <AddCircleOutlinedIcon
                onClick={() => setShowInviteCodeModal(true)}
              />
            </Button>
          </div>

          <div className="invite-code-container">
            {sortedInviteCodes.map((inviteCode) => (
              <InviteCode
                key={inviteCode.code}
                data={inviteCode}
                onDelete={() => handleDelete(inviteCode.code)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        title={t("modal.createInviteCode.heading")}
        open={showInviteCodeModal}
        onClose={() => setShowInviteCodeModal(false)}
      >
        <InviteCodeForm onSubmitCallback={inviteCodeSubmitted} />
      </Modal>
    </div>
  );
};

export default Admin;
