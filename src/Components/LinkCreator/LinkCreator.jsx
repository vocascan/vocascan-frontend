import React from "react";
import { useSelector } from "react-redux";

import { vocascanServer } from "../../utils/constants.js";

import "./LinkCreator.scss";

const LinkCreator = ({ path, electronFix = false, children }) => {
  const selfHosted = useSelector((state) => state.login.selfHosted);
  const serverAddress = useSelector((state) => state.login.serverAddress);
  const appLanguage = useSelector((state) => state.setting.language);

  return (
    <a
      className="link-creator"
      href={
        window.VOCASCAN_CONFIG.BASE_URL || selfHosted
          ? electronFix && window.VOCASCAN_CONFIG.ENV === "electron"
            ? vocascanServer`${path}?lang=` + appLanguage
            : (serverAddress
                ? serverAddress
                : window.VOCASCAN_CONFIG.BASE_URL) +
              `${path}?lang=` +
              appLanguage
          : vocascanServer + `${path}?lang=` + appLanguage
      }
    >
      {children}
    </a>
  );
};

export default LinkCreator;
