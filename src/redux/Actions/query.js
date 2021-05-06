import {
  SET_LEARNED_PACKAGE,
  SET_QUERY_CORRECT,
  SET_QUERY_WRONG,
  CLEAR_QUERY,
} from "./index.js";

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

export const setQueryCorrect = () => {
  return {
    type: SET_QUERY_CORRECT,
    payload: {},
  };
};

export const setQueryWrong = () => {
  return {
    type: SET_QUERY_WRONG,
    payload: {},
  };
};

export const clearQuery = () => {
  return {
    type: CLEAR_QUERY,
    payload: {},
  };
};
