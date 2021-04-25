import { SET_LEARNED_PACKAGE } from "./index.js";

export const setLearnedPackage = ({
  foreignWordLanguage,
  translatedWordLanguage,
  languagePackageId,
  vocabsToday,
  staged,
}) => {
  return {
    type: SET_LEARNED_PACKAGE,
    payload: {
      foreignWordLanguage,
      translatedWordLanguage,
      languagePackageId,
      vocabsToday,
      staged,
    },
  };
};
