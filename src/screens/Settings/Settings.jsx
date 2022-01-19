import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../Components/Button/Button.jsx";
import Switch from "../../Components/Form/Switch/Switch.jsx";
import LanguageSelector from "../../Components/LanguageSelector/LanguageSelector.jsx";

import VersionTable from "../../Components/VersionTable/VersionTable.js";
import { openGuide } from "../../redux/Actions/login.js";
import { setMenuStyle } from "../../redux/Actions/setting.js";

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

  const reopenGuide = useCallback(() => {
    dispatch(openGuide());
  }, [dispatch]);

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

      <LanguageSelector />

      <div className="settings-guide">
        <h3>{t("screens.settings.guide.title")}</h3>
        <Button block uppercase onClick={reopenGuide}>
          {t("screens.settings.guide.button")}
        </Button>
      </div>

      <h2>{t("screens.settings.versions")}</h2>

      <VersionTable />
    </div>
  );
};

export default Settings;
