import { SET_LANGUAGE } from "./index.js";

export const setLanguage = ({ language }) => {
  return {
    type: SET_LANGUAGE,
    payload: {
      language,
    },
  };
};
