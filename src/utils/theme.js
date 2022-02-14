import { useEffect } from "react";
import { useSelector } from "react-redux";

const DEFAULT_THEME = "light";
const DARK_THEME_CLASS = "dark-theme";

export const applyTheme = (theme) => {
  const rootEl = document.documentElement;
  if (theme === DEFAULT_THEME) {
    rootEl.className = "";
  } else if (theme === "dark") {
    rootEl.className = DARK_THEME_CLASS;
  }
};

export const useTheme = () => {
  const theme = useSelector((state) => state.setting.theme);
  useEffect(() => applyTheme(theme), [theme]);
};
