import {
  SET_LEARNED_PACKAGE,
  SET_QUERY_CORRECT,
  SET_QUERY_WRONG,
  CLEAR_QUERY,
  SET_GROUP_IDS,
  SET_ACTUAL_PROGRESS,
} from "../Actions/index.js";

const initialState = {
  foreignWordLanguage: "",
  translatedWordLanguage: "",
  languagePackageId: "",
  vocabsToday: 0,
  staged: false,
  groupIds: [],
  correct: 0,
  wrong: 0,
  actualProgress: 0,
};

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEARNED_PACKAGE:
      return {
        ...state,
        foreignWordLanguage: action.payload.foreignWordLanguage,
        translatedWordLanguage: action.payload.translatedWordLanguage,
        languagePackageId: action.payload.languagePackageId,
        groupIds: action.payload.groupIds,
        vocabsToday: action.payload.vocabsToday,
        staged: action.payload.staged,
      };

    case SET_QUERY_CORRECT:
      return {
        ...state,
        correct: state.correct + 1,
      };

    case SET_QUERY_WRONG:
      return {
        ...state,
        wrong: state.wrong + 1,
      };
    case SET_ACTUAL_PROGRESS:
      return {
        ...state,
        actualProgress: state.actualProgress + 1,
      };

    case CLEAR_QUERY:
      return {
        ...initialState,
      };

    case SET_GROUP_IDS:
      return {
        ...state,
        groupIds: action.payload.groupIds,
      };

    default:
      return state;
  }
};

export default queryReducer;
