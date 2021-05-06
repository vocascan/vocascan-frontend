import {
  SET_LEARNED_PACKAGE,
  SET_QUERY_CORRECT,
  SET_QUERY_WRONG,
} from "../Actions/index.js";

const initialState = {
  foreignWordLanguage: "",
  translatedWordLanguage: "",
  languagePackageId: "",
  vocabsToday: 0,
  staged: false,
  correct: 0,
  wrong: 0,
};

const learnReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEARNED_PACKAGE:
      return {
        ...state,
        foreignWordLanguage: action.payload.foreignWordLanguage,
        translatedWordLanguage: action.payload.translatedWordLanguage,
        languagePackageId: action.payload.languagePackageId,
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

    default:
      return state;
  }
};

export default learnReducer;
