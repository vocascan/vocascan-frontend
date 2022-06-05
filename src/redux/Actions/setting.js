import { SET_LANGUAGE, SET_THEME } from "./index.js";

export const setLanguage = ({ language }) => {
  return {
    type: SET_LANGUAGE,
    payload: {
      language,
    },
  };
};

export const setTheme = ({ theme }) => {
  return {
    type: SET_THEME,
    payload: {
      theme,
    },
  };
};
