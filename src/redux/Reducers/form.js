import { defineState } from "redux-localstore";

import {
  SET_VOCAB_ACTIVE,
  SET_VOCAB_ACTIVATE,
  SET_GROUP_ACTIVATE,
} from "../Actions/index.js";

const defaultState = {
  vocab: {
    active: true,
    activate: false,
  },
  group: {
    active: true,
  },
};

const initialState = defineState(defaultState)("form");

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VOCAB_ACTIVE:
      return {
        ...state,
        vocab: {
          ...state.vocab,
          active: action.payload.active,
        },
      };

    case SET_VOCAB_ACTIVATE:
      return {
        ...state,
        vocab: {
          ...state.vocab,
          activate: action.payload.activate,
        },
      };

    case SET_GROUP_ACTIVATE:
      return {
        ...state,
        group: {
          active: action.payload.active,
        },
      };

    default:
      return state;
  }
};

export default formReducer;
