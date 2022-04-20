import { defineState } from "redux-localstore";

import { defaultTheme } from "../../utils/constants.js";
import { SET_LANGUAGE, SET_THEME } from "../Actions/index.js";

const defaultState = {
  language: "en",
  theme: defaultTheme,
};

const initialState = defineState(defaultState)("setting");

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload.language,
      };

    case SET_THEME:
      return {
        ...state,
        theme: action.payload.theme,
      };

    default:
      return state;
  }
};

export default loginReducer;
