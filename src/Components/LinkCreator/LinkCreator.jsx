import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { checkUrlAvailable } from "../../utils/api.js";
import { vocascanServer } from "../../utils/constants.js";

import "./LinkCreator.scss";

const LinkCreator = ({ path, setValid, electronFix = false, children }) => {
  const selfHosted = useSelector((state) => state.login.selfHosted);
  const serverAddress = useSelector((state) => state.login.serverAddress);
  const appLanguage = useSelector((state) => state.setting.language);

  const [url, setUrl] = useState("");

  const { BASE_URL: baseURL, ENV: env } = window.VOCASCAN_CONFIG;

  //initialize url with the needed url for the servers
  useEffect(() => {
    setUrl(
      baseURL || selfHosted
        ? electronFix && env === "electron"
          ? vocascanServer + `${path}?lang=` + appLanguage
          : (serverAddress ? serverAddress : baseURL) +
            `${path}?lang=` +
            appLanguage
        : vocascanServer + `${path}?lang=` + appLanguage
    );
  }, [appLanguage, baseURL, electronFix, env, path, selfHosted, serverAddress]);

  //check if url is available
  useEffect(() => {
    checkUrlAvailable(url)
      .then((response) => {
        return setValid(true);
      })
      .catch((error) => {
        return setValid(false);
      });
  }, [setValid, url]);

  return (
    <a className="link-creator" href={url}>
      {children}
    </a>
  );
};

export default LinkCreator;
