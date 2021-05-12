import { useCallback } from "react";

//import { languages } from "../utils/constants.js";
import useCreateCountryFlags from "./useCreateCountryFlags.js";

const useCountryFlag = () => {
  const { createCountryFlags } = useCreateCountryFlags();
  const languages = createCountryFlags();
  const getCountryFlagByCode = useCallback((code) => {
    let origCode = code;

    if (code === "en") {
      origCode = "gb";
    }

    const toFindLanguage = languages.find(
      (x) => x.code.toLowerCase() === origCode.toLowerCase()
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
