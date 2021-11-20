import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import CountdownTimer from "../Timer/CountdownTimer.jsx";

import useSnack from "../../hooks/useSnack.js";
import { nodeRequire } from "../../utils/index.js";

import "./InviteCode.scss";

const { ipcRenderer } = nodeRequire("electron");

const InviteCode = ({ data, onDelete }) => {
  const { t } = useTranslation();

  const { showSnack } = useSnack();

  const isUsesValid = useMemo(
    () => data.uses < (data.maxUses || Infinity),
    [data]
  );
  const isDateValid = useMemo(
    () => (new Date(data.expirationDate).getTime() || Infinity) > new Date(),
    [data]
  );

  const copyToClip = useCallback(() => {
    try {
      ipcRenderer.invoke("copy-to-clip", { text: data.code }).then((result) => {
        showSnack("success", t("components.inviteCode.copyToClip"));
      });
    } catch {
      showSnack("error", t("components.inviteCode.copyToClipFailed"));
    }
  }, [data.code, showSnack, t]);

  return (
    <div
      className={clsx("invite-code", {
        expired: !isUsesValid || !isDateValid,
      })}
    >
      <div className="delete-btn">
        <RemoveCircleOutlineIcon onClick={onDelete} />
      </div>
      <div className="heading">
        <p onClick={copyToClip}>{data.code}</p>
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
