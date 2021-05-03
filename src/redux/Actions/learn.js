import { SET_LEARNED_PACKAGE, SET_ENDSCREEN_STATS } from "./index.js";

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

export const setEndScreenStats = ({ correct, wrong }) => {
  return {
    type: SET_ENDSCREEN_STATS,
    payload: {
      correct,
      wrong,
    },
  };
};
