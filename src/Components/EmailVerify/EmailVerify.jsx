import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button.jsx";

import useHumanizer from "../../hooks/useHumanizer.js";
import useSnack from "../../hooks/useSnack.js";
import { requestEmailVerification } from "../../utils/api.js";

import "./EmailVerify.scss";

const EmailVerify = ({ onNext = () => {}, serverInfo, user }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const dontReceived = t("screens.emailVerify.dontReceivedEmail");
  const [dontReceivedBefore, dontReceivedLink, ...dontReceivedAfter] = useMemo(
    () => dontReceived.split(/[[\]]/),
    [dontReceived]
  );
  const { durationHumanizer } = useHumanizer(t);
  const secondsLeft = useMemo(
    () =>
      (new Date(user?.user?.createdAt).getTime() +
        serverInfo?.email_confirm?.time -
        Date.now()) /
      1000,
    [serverInfo?.email_confirm?.time, user?.user?.createdAt]
  );

  // divide by an hour and round to exclude seconds and minutes
  const time = durationHumanizer({
    duration: ~~(secondsLeft / 3600) * 3600,
  });

  const resend = useCallback(() => {
    requestEmailVerification(
      { email: user.user.email },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then(() => {
        showSnack("success", t("screens.emailVerify.resendEmailSuccess"));
      })
      .catch(() => {
        showSnack("error", t("screens.emailVerify.resendEmailError"));
      });
  }, [showSnack, t, user?.token, user?.user?.email]);

  return (
    <div className="email-verify">
      <div className="form-input">
        <h2>
          {t("screens.emailVerify.greeting", { name: user.user.username })}
        </h2>
        <p>{t("screens.emailVerify.description")}</p>
        {serverInfo?.email_confirm?.level === "high" || secondsLeft <= 0 ? (
          <p>{t("screens.emailVerify.levelHigh")}</p>
        ) : (
          <p>{t("screens.emailVerify.levelMedium", { time })}</p>
        )}
      </div>
      <div className="login-footer">
        {serverInfo?.email_confirm?.level !== "high" && secondsLeft > 0 && (
          <Button block uppercase onClick={onNext} variant="outline">
            {t("screens.emailVerify.skip")}
          </Button>
        )}
        <div className="dont-received">
          {dontReceivedBefore} <span onClick={resend}>{dontReceivedLink}</span>
          {dontReceivedAfter}
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
