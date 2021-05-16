import { defineState } from "redux-localstore";

import { SET_LANGUAGES } from "../Actions/index.js";

const defaultState = {
  languages: [],
};

const initialState = defineState(defaultState)("language");

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGES:
      return {
        ...state,
        languages: action.payload.languages,
      };

    default:
      return state;
  }
};

export default languageReducer;
