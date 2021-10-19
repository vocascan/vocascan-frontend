import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

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

  const isUsesValid = useMemo(
    () => data.uses < (data.maxUses || Infinity),
    [data]
  );
  const isDateValid = useMemo(
    () => (new Date(data.expirationDate).getTime() || Infinity) > new Date(),
    [data]
  );

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
      className={clsx("invite-code", {
        expired: !isUsesValid || !isDateValid,
      })}
    >
      <div className="delete-btn">
        <RemoveCircleOutlineIcon onClick={() => submitDeletion(data.code)} />
      </div>
      <div className="heading" onClick={copyToClip}>
        <p>{data.code}</p>
      </div>
      <hr />
      <div className="information">
        <p>
          {t("components.inviteCode.uses")}
          <span className={isUsesValid ? "uses-valid" : "uses-invalid"}>{`${
            data.uses
          } /  ${data.maxUses ? data.maxUses : "∞"}`}</span>
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
