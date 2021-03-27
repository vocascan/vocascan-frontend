import { defineState } from "redux-localstore";

import { setBaseUrl, setTokenHeader } from "../../utils/api.js";
import { vocascanServer } from "../../utils/constants.js";
import { REGISTER, SIGN_IN, SIGN_OUT, SET_SERVER_URL, SET_SELF_HOSTED } from "../Actions.js";

const defaultState = {
  user: {
    username: "",
    email: "",
    token: "",
  },
  selfHosted: false,
  serverAddress: "",
  isLoggedIn: false,
  firstLogin: false,
};

const initialState = {
  ...defineState(defaultState)("login"),
  isLoggedIn: false,
  firstLogin: false,
};

if (initialState.selfHosted) {
  setBaseUrl(initialState.serverAddress);
} else {
  setBaseUrl(vocascanServer);
}

setTokenHeader(initialState.user.token);

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      setTokenHeader(action.payload.token);

      return {
        ...state,
        user: {
          username: action.payload.username,
          email: action.payload.email,
          token: action.payload.token,
        },
        isLoggedIn: true,
        firstLogin: true,
      };

    case SIGN_IN:
      setTokenHeader(action.payload.token);

      return {
        ...state,
        user: {
          username: action.payload.username,
          email: action.payload.email,
          token: action.payload.token,
        },
        isLoggedIn: true,
      };

    case SIGN_OUT:
      setTokenHeader(null);

      return {
        ...state,
        user: {
          username: "",
          email: "",
          token: "",
        },
        isLoggedIn: false,
        firstLogin: false,
      };

    case SET_SERVER_URL:
      setBaseUrl(action.payload.serverAddress);

      return {
        ...state,
        serverAddress: action.payload.serverAddress,
      };

    case SET_SELF_HOSTED:
      if (!action.payload.selfHosted) {
        setBaseUrl(vocascanServer);
      } else {
        setBaseUrl(state.serverAddress);
      }

      return {
        ...state,
        selfHosted: action.payload.selfHosted,
      };

    default:
      return state;
  }
};

export default loginReducer;
