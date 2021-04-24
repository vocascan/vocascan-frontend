import { SET_LEARNED_PACKAGE } from "./index.js";

export const setLearnedPackage = ({
  foreignWordLanguage,
  translatedWordLanguage,
}) => {
  return {
    type: SET_LEARNED_PACKAGE,
    payload: {
      foreignWordLanguage,
      translatedWordLanguage,
    },
  };
};
