import { defineState } from "redux-localstore";

import {
  SET_LANGUAGE,
  SET_MENU_STYLE,
  SET_SERVER_REGISTRATION_LOCKED,
} from "../Actions/index.js";

const defaultState = {
  menuStyle: "default", // fancy, default
  language: "en",
  serverRegistrationLocked: false,
};

const initialState = defineState(defaultState)("setting");

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_STYLE:
      return {
        ...state,
        menuStyle: action.payload.menuStyle,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload.language,
      };
    case SET_SERVER_REGISTRATION_LOCKED:
      return {
        ...state,
        serverRegistrationLocked: action.payload.serverRegistrationLocked,
      };

    default:
      return state;
  }
};

export default loginReducer;
