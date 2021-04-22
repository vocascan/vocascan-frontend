import { defineState } from "redux-localstore";

import { SET_TABLE_PAGE_SIZE } from "../Actions/index.js";

const defaultState = {
  pageSize: 10,
};

const initialState = defineState(defaultState)("table");

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload.pageSize,
      };

    default:
      return state;
  }
};

export default tableReducer;
