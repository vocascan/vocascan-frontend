import { SET_LEARNED_PACKAGE } from "../Actions/index.js";

const initialState = {
  foreignWordLanguage: "",
  translatedWordLanguage: "",
  languagePackageId: "",
  vocabsToday: 0,
  staged: false,
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

    default:
      return state;
  }
};

export default learnReducer;
