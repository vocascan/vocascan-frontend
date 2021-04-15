import { SET_VOCAB_ACTIVE, SET_VOCAB_ACTIVATE } from "./index.js";

export const setVocabActive = ({ active }) => {
  return {
    type: SET_VOCAB_ACTIVE,
    payload: {
      vocab: {
        active,
      },
    },
  };
};

export const setVocabActivate = ({ activate }) => {
  return {
    type: SET_VOCAB_ACTIVATE,
    payload: {
      vocab: {
        activate,
      },
    },
  };
};
