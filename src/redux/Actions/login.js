import { REGISTER, SIGN_IN, SIGN_OUT, SET_SELF_HOSTED, SET_SERVER_URL } from "./index.js";

export const register = ({ username, email, token }) => {
  return {
    type: REGISTER,
    payload: {
      username,
      email,
      token,
    },
  };
};

export const signIn = ({ username, email, token }) => {
  return {
    type: SIGN_IN,
    payload: {
      username,
      email,
      token,
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

export const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: {},
  };
};
