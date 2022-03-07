import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { gte } from "semver";

import Button from "../../Button/Button.jsx";
import LoadingIndicator from "../../Indicators/LoadingIndicator/LoadingIndicator.jsx";
import Modal from "../../Modal/Modal.jsx";
import MobileTopNav from "../../Nav/MobileTopNav.jsx";
import Nav from "../../Nav/Nav.jsx";
import TopNav from "../../Nav/TopNav.jsx";

import {
  setServerInfo as setServerInfoDispatch,
  signOut,
} from "../../../redux/Actions/login.js";
import { getInfo } from "../../../utils/api.js";
import { minServerVersion } from "../../../utils/constants.js";

const AuthenticatedLayout = ({ children }) => {
  const [isValidServer, setIsValidServer] = useState(null);
  const [isValidVersion, setIsValidVersion] = useState(null);
  const [serverInfo, setServerInfo] = useState(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    getInfo()
      .then((res) => {
        setIsValidServer(res?.data?.identifier === "vocascan-server");
        setIsValidVersion(gte(res?.data?.version, minServerVersion));
        setServerInfo(res?.data);
      })
      .catch(() => null);
  }, []);

  // second useEffect is used to prevent multiple requests to the server if dispatch changes and effect fires
  useEffect(() => {
    dispatch(setServerInfoDispatch({ serverInfo }));
  }, [dispatch, serverInfo]);

  return (
    <div className="w-full h-screen m-0 p-0 md:grid md:grid-cols-[65px_auto] md:grid-rows-[50px_auto] md:overflow-hidden">
      <Nav />
      <TopNav />
      <MobileTopNav />
      <Modal
        open={isValidServer === false || isValidVersion === false}
        renderClose={false}
        title={t("modal.serverNotSupported.title")}
        size="small"
      >
        <div className="py-8 px-0">
          {!isValidServer && (
            <p>{t("modal.serverNotSupported.serverNotVocascanServer")}</p>
          )}

          {!isValidVersion && (
            <p>
              {t("modal.serverNotSupported.versionToOld", {
                version: serverInfo?.version,
                minVersion: minServerVersion,
              })}
            </p>
          )}
        </div>

        <Button onClick={handleLogout}>{t("nav.logout")}</Button>
      </Modal>
      {isValidServer && isValidVersion && (
        <div className="overflow-y-auto">{children}</div>
      )}

      {(isValidServer === null || isValidVersion === null) && (
        <LoadingIndicator size="large" position="center" />
      )}
    </div>
  );
};

export default AuthenticatedLayout;
