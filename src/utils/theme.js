import { useEffect } from "react";
import { useSelector } from "react-redux";

const themeStyleComponent = document.createElement("link");
themeStyleComponent.rel = "stylesheet";
document.head.appendChild(themeStyleComponent);

export const useTheme = () => {
  const theme = useSelector((state) => state.setting.theme);
  useEffect(() => {
    themeStyleComponent.href = window.VOCASCAN_CONFIG.themes[theme];
  }, [theme]);
};
