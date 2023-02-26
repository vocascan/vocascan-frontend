import {
  SET_LEARNED_PACKAGE,
  SET_QUERY_CORRECT,
  SET_QUERY_WRONG,
  CLEAR_QUERY,
  SET_ACTUAL_PROGRESS,
  SET_GROUP_IDS,
} from "./index.js";

export const setLearnedPackage = ({
  foreignWordLanguage,
  translatedWordLanguage,
  languagePackageId,
  groupIds,
  vocabsToday,
  staged,
  onlyActivated,
  customLearning,
}) => {
  return {
    type: SET_LEARNED_PACKAGE,
    payload: {
      foreignWordLanguage,
      translatedWordLanguage,
      languagePackageId,
      groupIds,
      vocabsToday,
      staged,
      onlyActivated,
      customLearning,
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

export const setActualProgress = () => {
  return {
    type: SET_ACTUAL_PROGRESS,
    payload: {},
  };
};

export const clearQuery = () => {
  return {
    type: CLEAR_QUERY,
    payload: {},
  };
};

export const setGroupIds = ({ groupIds }) => {
  return {
    type: SET_GROUP_IDS,
    payload: {
      groupIds,
    },
  };
};
