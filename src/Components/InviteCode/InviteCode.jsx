import React, { useCallback } from "react";
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
          Uses: {data.used} / {data.maxUses ? data.maxUses : "∞"}
        </p>
        <p>
          Expiration Date:{" "}
          {data.expirationDate ? (
            <CountdownTimer callQueuedTime={data.expirationDate} />
          ) : (
            "Never"
          )}
        </p>
      </div>
    </div>
  );
};

export default InviteCode;
