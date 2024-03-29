import { CancelToken } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { checkUrlAvailable } from "../utils/api.js";
import { vocascanServer } from "../utils/constants.js";

const useLinkCreator = ({ path, electronFix = false }) => {
  const selfHosted = useSelector((state) => state.login.selfHosted);
  const serverAddress = useSelector((state) => state.login.serverAddress);
  const appLanguage = useSelector((state) => state.setting.language);

  const [isValid, setIsValid] = useState(false);
  const [url, setUrl] = useState("");

  const { BASE_URL: baseURL, ENV: env } = window.VOCASCAN_CONFIG;

  // initialize url with the needed url for the servers
  useEffect(() => {
    if (baseURL || selfHosted) {
      if (electronFix && env === "electron") {
        setUrl(vocascanServer + `${path}?lang=` + appLanguage);
      } else {
        setUrl((serverAddress || baseURL) + `${path}?lang=` + appLanguage);
      }
    } else {
      setUrl(vocascanServer + `${path}?lang=` + appLanguage);
    }
  }, [appLanguage, baseURL, electronFix, env, path, selfHosted, serverAddress]);

  // check if url is available
  useEffect(() => {
    const cancelToken = CancelToken.source();

    checkUrlAvailable(url, cancelToken.token)
      .then((response) => {
        setIsValid(true);
      })
      .catch((error) => {
        setIsValid(false);
      });

    return () => cancelToken.cancel();
  }, [url]);

  return { isValid, url };
};

export default useLinkCreator;
