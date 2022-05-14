import { useEffect } from "react";
import { useSelector } from "react-redux";

import { defaultTheme } from "../utils/constants";

const themeStyleComponent = document.createElement("link");
themeStyleComponent.rel = "stylesheet";
document.head.appendChild(themeStyleComponent);

const useTheme = () => {
  const theme = useSelector((state) => state.setting.theme);
  useEffect(() => {
    const key = theme in window.VOCASCAN_CONFIG.themes ? theme : defaultTheme;
    themeStyleComponent.href = window.VOCASCAN_CONFIG.themes[key];
  }, [theme]);
};

export default useTheme;
