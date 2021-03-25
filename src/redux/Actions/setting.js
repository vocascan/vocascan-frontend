import { SET_MENU_STYLE } from "./index";

export const setMenuStyle = ({ menuStyle }) => {
  return {
    type: SET_MENU_STYLE,
    payload: {
      menuStyle,
    },
  };
};
