import { SET_LANGUAGES } from "./index.js";

export const setLanguages = ({ languages }) => {
  return {
    type: SET_LANGUAGES,
    payload: {
      languages,
    },
  };
};
