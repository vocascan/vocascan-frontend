import { useCallback } from "react";

import { languages } from "../utils/constants.js";

const useCountryFlag = () => {
  const getCountryFlag = useCallback((language) => {
    return languages.find((x) => x.name === language).icon;
  }, []);

  return {
    getCountryFlag,
  };
};

export default useCountryFlag;
