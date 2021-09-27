import { CancelToken, Cancel } from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { gte } from "semver";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator.jsx";

import useDebounce from "../../../hooks/useDebounce.js";
import { setServerRegistrationLocked } from "../../../redux/Actions/setting.js";
import { getInfo } from "../../../utils/api.js";
import { minServerVersion } from "../../../utils/constants.js";

import "./ServerValidIndicator.scss";

const ServerValidIndicator = ({ setValid, setLocked = null }) => {
  const serverAddress = useSelector((state) => state.login.serverAddress);
  const debouncedServerAddress = useDebounce(serverAddress, 500);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isValidServer, setIsValidServer] = useState(null);
  const [isValidVersion, setIsValidVersion] = useState(null);
  const [isLockValid, setIsLockValid] = useState(false);
  const [isServerResponding, setIsServerResponding] = useState(null);
  const [serverVersion, setServerVersion] = useState(null);

  const timer = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    setIsValidServer(null);
    setIsValidVersion(null);
    setServerVersion(null);
    setIsLockValid(null);

    const cancelToken = CancelToken.source();

    getInfo(cancelToken.token)
      .then((res) => {
        setIsValidServer(res?.data?.identifier === "vocascan-server");
        setIsLockValid(res?.data?.locked);
        setIsValidVersion(gte(res?.data?.version, minServerVersion));
        setServerVersion(res?.data?.version);
        setIsServerResponding(true);
        dispatch(
          setServerRegistrationLocked({
            serverRegistrationLocked: res.data.locked,
          })
        );
      })
      .catch((err) => {
        if (!(err instanceof Cancel)) {
          setIsServerResponding(false);
        }
      })
      .finally(() => {
        timer.current = setTimeout(() => setIsLoading(false), 500);
      });

    return () => {
      cancelToken.cancel();
    };
  }, [debouncedServerAddress, dispatch]);

  useEffect(() => {
    setValid(
      isValidServer === true &&
        isValidVersion === true &&
        isServerResponding === true
    );
    // make this query, because Login Page is not sending a setLocked param
    if (setLocked) {
      setLocked(isLockValid);
    }
  }, [
    setValid,
    isValidServer,
    isValidVersion,
    isServerResponding,
    setLocked,
    isLockValid,
  ]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  if (isLoading && serverAddress !== "") {
    return <LoadingIndicator position="center" />;
  }

  return (
    <div className="server-valid-indicator">
      {isValidServer === true &&
        isValidVersion === true &&
        isServerResponding === true && (
          <p className="success">
            {t("components.validServerIndicator.validServer", {
              version: `${serverVersion} ${isLockValid ? "locked" : ""}`,
            })}
          </p>
        )}

      {isValidServer === false && (
        <p className="error">
          {t("components.validServerIndicator.serverNotVocascanServer")}
        </p>
      )}

      {isValidVersion === false && (
        <p className="error">
          {t("components.validServerIndicator.versionToOld", {
            version: serverVersion,
            minVersion: minServerVersion,
          })}
        </p>
      )}

      {isServerResponding === false && serverAddress !== "" && (
        <p className="error">
          {t("components.validServerIndicator.serverNotResponding")}
        </p>
      )}
    </div>
  );
};

export default ServerValidIndicator;
