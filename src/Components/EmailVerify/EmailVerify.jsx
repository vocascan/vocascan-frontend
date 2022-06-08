import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

import Button from "../Button/Button.jsx";

import useHumanizer from "../../hooks/useHumanizer.js";
import useSnack from "../../hooks/useSnack.js";
import { getProfile, requestEmailVerification } from "../../utils/api.js";

import "./EmailVerify.scss";

const EmailVerify = ({
  onNext = () => {},
  serverInfo,
  user,
  setUser = () => null,
}) => {
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

  const checkVerificationStatus = useCallback(async () => {
    try {
      const profileRes = await getProfile({
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setUser((d) => ({
        ...d,
        user: { ...profileRes.data, email: d?.user?.email },
      }));
    } catch (error) {
      console.error(error);
    }
  }, [setUser, user?.token]);

  const emailVerified = user?.user?.emailVerified;

  return (
    <div className="email-verify">
      <div className="form-input">
        <h2>
          {t("screens.emailVerify.greeting", { name: user.user.username })}
        </h2>

        {!emailVerified && (
          <div>
            <p>{t("screens.emailVerify.description")}</p>
            {serverInfo?.email_confirm?.level === "high" || secondsLeft <= 0 ? (
              <p>{t("screens.emailVerify.levelHigh")}</p>
            ) : (
              <p>{t("screens.emailVerify.levelMedium", { time })}</p>
            )}
          </div>
        )}

        {emailVerified && (
          <div>
            <p>{t("screens.emailVerify.emailIsVerifiedDesc")}</p>

            <CheckCircleOutlineOutlinedIcon className="checkMarkIcon" />
          </div>
        )}
      </div>
      <div className="login-footer">
        {!emailVerified && (
          <Button
            block
            uppercase
            onClick={checkVerificationStatus}
            promiseButton
          >
            {t("screens.emailVerify.checkVerificationStatus")}
          </Button>
        )}

        {!emailVerified &&
          serverInfo?.email_confirm?.level !== "high" &&
          secondsLeft > 0 && (
            <Button block uppercase onClick={onNext} variant="outline">
              {t("screens.emailVerify.skip")}
            </Button>
          )}

        {emailVerified && (
          <Button block uppercase onClick={onNext}>
            {t("screens.emailVerify.next")}
          </Button>
        )}

        {!emailVerified && (
          <div className="dont-received">
            {dontReceivedBefore}{" "}
            <span onClick={resend}>{dontReceivedLink}</span>
            {dontReceivedAfter}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
