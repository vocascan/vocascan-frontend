import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Select from "../Form/Select/Select.jsx";

import { setTheme } from "../../redux/Actions/setting.js";

const ThemeSelector = () => {
  const { t } = useTranslation();

  const theme = useSelector((state) => state.setting.theme);

  const dispatch = useDispatch();

  const mapTheme = (key) => ({ label: t(`themes.${key}`), value: key });

  return (
    <div>
      <Select
        label={t("components.themeSelector.label")}
        value={mapTheme(theme)}
        options={Object.keys(window.VOCASCAN_CONFIG.themes).map(mapTheme)}
        onChange={({ value }) => {
          dispatch(setTheme({ theme: value }));
        }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default ThemeSelector;
