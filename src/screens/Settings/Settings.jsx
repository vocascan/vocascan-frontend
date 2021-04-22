import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Switch from "../../Components/Form/Switch/Switch.jsx";

import { setMenuStyle } from "../../redux/Actions/setting.js";

import { version } from "../../../package.json";

import "./Settings.scss";

const Settings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const menuStyle = useSelector((state) => state.setting.menuStyle);

  const onChangeMenu = useCallback(() => {
    dispatch(
      setMenuStyle({ menuStyle: menuStyle === "default" ? "fancy" : "default" })
    );
  }, [dispatch, menuStyle]);

  return (
    <div className="settings-wrapper">
      <h1 className="heading">{t("screens.settings.title")}</h1>
      <Switch
        switcher
        label={t("screens.settings.menu.label")}
        optionLeft={t("screens.settings.menu.optionLeft")}
        optionRight={t("screens.settings.menu.optionRight")}
        onChange={onChangeMenu}
        checked={menuStyle !== "default"}
      />
      <h3>v{version}</h3>
    </div>
  );
};

export default Settings;
