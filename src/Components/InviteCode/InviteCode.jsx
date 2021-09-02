import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import Button from "../../Components/Button/Button.jsx";
import CountdownTimer from "../Timer/CountdownTimer.jsx";

import { deleteInviteCode } from "../../utils/api.js";

import "./InviteCode.scss";

const InviteCode = ({ data }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const submitDeletion = (inviteCode) => {
    deleteInviteCode(inviteCode)
      .then((res) => {
        history.go(0);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  return (
    <div
      className="invite-code"
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      <Button
        appearance={"red"}
        className={showDeleteButton ? "delete-btn-show" : "delete-btn-hide"}
        variant="transparent"
      >
        <RemoveCircleOutlineIcon onClick={() => submitDeletion(data.code)} />
      </Button>
      <div className="heading">
        <p>{data.code}</p>
      </div>
      <hr />
      <div className="information">
        <p>
          {t("components.inviteCode.uses")}
          <span
            className={
              data.uses === data.maxUses ? "uses-invalid" : "uses-valid"
            }
          >{`${data.uses} /  ${data.maxUses ? data.maxUses : "∞"}`}</span>
        </p>
        <p>
          {t("components.inviteCode.expirationDate")}
          {data.expirationDate ? (
            <CountdownTimer callQueuedTime={data.expirationDate} />
          ) : (
            <span className="expiration-code-valid">
              {t("components.inviteCode.never")}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default InviteCode;
