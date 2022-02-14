import React from "react";
import { useSelector, useDispatch } from "react-redux";

import LightModeIcon from "@material-ui/icons/Brightness7";
import DarkModeIcon from "@material-ui/icons/NightsStay";

import { setTheme } from "../../redux/Actions/setting.js";

import "./ThemeSwitch.scss";

const ThemeSwitch = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.setting.theme);

  const toggleTheme = () => {
    dispatch(
      setTheme({
        theme: theme === "dark" ? "light" : "dark",
      })
    );
  };

  return (
    <div className="theme-switch" onClick={toggleTheme}>
      {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </div>
  );
};

export default ThemeSwitch;
