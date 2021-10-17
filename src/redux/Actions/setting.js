import { SET_MENU_STYLE, SET_LANGUAGE } from "./index.js";

export const setMenuStyle = ({ menuStyle }) => {
  return {
    type: SET_MENU_STYLE,
    payload: {
      menuStyle,
    },
  };
};

export const setLanguage = ({ language }) => {
  return {
    type: SET_LANGUAGE,
    payload: {
      language,
    },
  };
};
