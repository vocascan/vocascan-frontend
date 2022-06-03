import {
  REGISTER,
  SIGN_IN,
  SIGN_OUT,
  SET_SELF_HOSTED,
  SET_SERVER_URL,
  OPEN_GUIDE,
  CLOSE_GUIDE,
  SET_SERVER_INFO,
} from "./index.js";

export const register = ({
  username,
  email,
  token,
  isAdmin,
  emailVerified,
}) => {
  return {
    type: REGISTER,
    payload: {
      username,
      email,
      token,
      isAdmin,
      emailVerified,
    },
  };
};

export const signIn = ({ username, email, token, isAdmin, emailVerified }) => {
  return {
    type: SIGN_IN,
    payload: {
      username,
      email,
      token,
      isAdmin,
      emailVerified,
    },
  };
};

export const setServerUrl = ({ serverAddress }) => {
  return {
    type: SET_SERVER_URL,
    payload: {
      serverAddress,
    },
  };
};

export const setSelfHosted = ({ selfHosted }) => {
  return {
    type: SET_SELF_HOSTED,
    payload: {
      selfHosted,
    },
  };
};

export const setServerInfo = ({ serverInfo }) => {
  return {
    type: SET_SERVER_INFO,
    payload: {
      serverInfo,
    },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: {},
  };
};

export const openGuide = () => {
  return {
    type: OPEN_GUIDE,
    payload: {},
  };
};

export const closeGuide = () => {
  return {
    type: CLOSE_GUIDE,
    payload: {},
  };
};
