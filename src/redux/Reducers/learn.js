import { SET_LEARNED_PACKAGE, SET_ENDSCREEN_STATS } from "../Actions/index.js";

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

    case SET_ENDSCREEN_STATS:
      return {
        ...state,
        correct: action.payload.correct,
        wrong: action.payload.wrong,
      };

    default:
      return state;
  }
};

export default learnReducer;
