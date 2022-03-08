import { CancelToken } from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator.jsx";

import useDebounce from "../../../hooks/useDebounce.js";
import { checkInviteCode } from "../../../utils/api.js";

const ServerValidIndicator = ({ inviteCode, setValid }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [inviteCodeState, setInviteCodeState] = useState(null);

  const debouncedInviteCode = useDebounce(inviteCode, 500);
  const timer = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    setInviteCodeState(null);
  }, [inviteCode]);

  useEffect(() => {
    setInviteCodeState(null);

    if (debouncedInviteCode === "") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const cancelToken = CancelToken.source();

    checkInviteCode(debouncedInviteCode, cancelToken.token)
      .then(() => {
        setInviteCodeState("valid");
      })
      .catch((err) => {
        const field = err.response.data?.fields?.[0]?.field;

        if (["notExisting", "used", "expired"].includes(field)) {
          setInviteCodeState(field);
        } else {
          setInviteCodeState("error");
        }
      })
      .finally(() => {
        timer.current = setTimeout(() => setIsLoading(false), 500);
      });

    return () => {
      cancelToken.cancel();
      setIsLoading(false);
    };
  }, [debouncedInviteCode]);

  useEffect(() => {
    setValid(inviteCodeState === "valid" && debouncedInviteCode !== "");
  }, [debouncedInviteCode, inviteCodeState, setValid]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  if (isLoading && inviteCode !== "") {
    return <LoadingIndicator position="center" />;
  }

  return (
    <div className="-mt-1 text-xs">
      {inviteCodeState === "valid" && (
        <p className="h-7 text-right text-green-dark">
          {t("components.inviteCodeValidIndicator.valid")}
        </p>
      )}

      {["notExisting", "used", "expired", "error"].includes(
        inviteCodeState
      ) && (
        <p className="h-7 text-right text-red-dark">
          {t(`components.inviteCodeValidIndicator.${inviteCodeState}`)}
        </p>
      )}
    </div>
  );
};

export default ServerValidIndicator;
