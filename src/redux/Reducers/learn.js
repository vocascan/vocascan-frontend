import { SET_LEARNED_PACKAGE } from "../Actions/index.js";

const initialState = {
  foreignWordLanguage: "",
  translatedWordLanguage: "",
};

const learnReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEARNED_PACKAGE:
      return {
        ...state,
        foreignWordLanguage: action.payload.foreignWordLanguage,
        translatedWordLanguage: action.payload.translatedWordLanguage,
      };

    default:
      return state;
  }
};

export default learnReducer;
