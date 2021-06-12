import { SET_TABLE_PAGE_SIZE } from "./index.js";

export const setTablePageSize = ({ pageSize }) => {
  return {
    type: SET_TABLE_PAGE_SIZE,
    payload: {
      pageSize,
    },
  };
};
