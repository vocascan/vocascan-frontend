import {
  SET_MENU_STYLE,
  SET_LANGUAGE,
  SET_SERVER_REGISTRATION_LOCKED,
} from "./index.js";

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

export const setServerRegistrationLocked = ({ serverRegistrationLocked }) => {
  return {
    type: SET_SERVER_REGISTRATION_LOCKED,
    payload: {
      serverRegistrationLocked,
    },
  };
};
