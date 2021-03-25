import { defineState } from "redux-localstore";

import { SET_MENU_STYLE } from "../Actions";

const defaultState = {
  menuStyle: "default", // fancy, default
};

const initialState = defineState(defaultState)("setting");

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_STYLE:
      return {
        ...state,
        menuStyle: action.payload.menuStyle,
      };

    default:
      return state;
  }
};

export default loginReducer;
