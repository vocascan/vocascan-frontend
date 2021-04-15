import { SET_VOCAB_ACTIVE, SET_VOCAB_ACTIVATE } from "./index.js";

export const setVocabActive = ({ active }) => {
  return {
    type: SET_VOCAB_ACTIVE,
    payload: {
      active,
    },
  };
};

export const setVocabActivate = ({ activate }) => {
  return {
    type: SET_VOCAB_ACTIVATE,
    payload: {
      activate,
    },
  };
};
