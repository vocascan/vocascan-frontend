import { defineState } from "redux-localstore";

import { SET_VOCAB_ACTIVE, SET_VOCAB_ACTIVATE } from "../Actions/index.js";

const defaultState = {
  vocab: {
    active: true,
    activate: false,
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
          active: action.payload.vocab.active,
        },
      };

    case SET_VOCAB_ACTIVATE:
      return {
        ...state,
        vocab: {
          ...state.vocab,
          activate: action.payload.vocab.activate,
        },
      };

    default:
      return state;
  }
};

export default formReducer;
