import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import Button from "../../Components/Button/Button.jsx";
import CountdownTimer from "../Timer/CountdownTimer.jsx";

import useSnack from "../../hooks/useSnack.js";
import { deleteInviteCode } from "../../utils/api.js";
import { nodeRequire } from "../../utils/index.js";

import "./InviteCode.scss";

const { ipcRenderer } = nodeRequire("electron");

const InviteCode = ({ data }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { showSnack } = useSnack();

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const submitDeletion = useCallback(
    (inviteCode) => {
      deleteInviteCode(inviteCode)
        .then((res) => {
          history.go(0);
        })
        .catch((err) => {
          console.log("Error");
        });
    },
    [history]
  );

  const copyToClip = useCallback(() => {
    try {
      ipcRenderer.invoke("copy-to-clip", { text: data.code }).then((result) => {
        showSnack("success", t("components.inviteCode.copyToClip"));
      });
    } catch {
      showSnack("error", t("global.fileImportError"));
    }
  }, [data.code, showSnack, t]);

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
        <p onClick={copyToClip}>{data.code}</p>
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
