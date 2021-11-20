import { useMemo } from "react";
import { useSelector } from "react-redux";
import { gte } from "semver";

export const FEATURES = {
  IMPORT_EXPORT: "1.1.0",
};

const useFeature = (feature) => {
  const serverInfo = useSelector((state) => state.login.serverInfo);
  const isSupported = useMemo(() => {
    // in case that serverVersion is not yet defined
    if (!serverInfo?.version) {
      return false;
    }

    // compare semver versions
    if (gte(serverInfo?.version, feature)) {
      return true;
    }

    // make the feature always in development versions available to allow testing
    if (process.env.NODE_ENV === "development") {
      return true;
    }

    // feature not supported
    return false;
  }, [feature, serverInfo?.version]);

  return {
    version: serverInfo?.version,
    isSupported,
  };
};

export default useFeature;
