import React from "react";
import { useTranslation } from "react-i18next";

import CountdownTimer from "../Timer/CountdownTimer.jsx";

import "./InviteCode.scss";

const InviteCode = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="invite-code">
      <div className="heading">
        <p>{data.code}</p>
      </div>
      <hr />
      <div className="information">
        <p>
          {t("components.inviteCode.uses")}
          <span
            className={
              data.used === data.maxUses ? "uses-invalid" : "uses-valid"
            }
          >{`${data.used} /  ${data.maxUses ? data.maxUses : "∞"}`}</span>
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
