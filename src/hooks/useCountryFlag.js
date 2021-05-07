import { useCallback } from "react";

import { languages } from "../utils/constants.js";

const useCountryFlag = () => {
  const getCountryFlagByCode = useCallback((countryCode) => {
    let origCode = countryCode;

    if (countryCode === "en") {
      origCode = "gb";
    }

    const toFindLanguage = languages.find(
      (x) => x.countryCode.toLowerCase() === origCode.toLowerCase()
    );

    if (!toFindLanguage?.icon) {
      return "";
    }

    return toFindLanguage.icon;
  }, []);

  const getCountryFlagByLanguage = useCallback((language) => {
    const toFindLanguage = languages.find(
      (x) => x.name.toLowerCase() === language.toLowerCase()
    );

    if (!toFindLanguage?.icon) {
      return "";
    }

    return toFindLanguage.icon;
  }, []);

  return {
    getCountryFlagByCode,
    getCountryFlagByLanguage,
  };
};

export default useCountryFlag;
