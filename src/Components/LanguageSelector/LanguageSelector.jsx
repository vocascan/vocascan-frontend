import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Select from "../Form/Select/Select.jsx";

import { languages } from "../../i18n/I18nProvider.js";
import { setLanguage } from "../../redux/Actions/setting.js";

const LanguageSelector = () => {
  const language = useSelector((state) => state.setting.language);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div>
      <Select
        required
        label={t("components.languageSelector.label")}
        value={
          [languages.find(({ code }) => code === language)].map(
            ({ code, name }) => ({
              value: code,
              label: name,
            })
          )[0]
        }
        options={languages.map(({ code, name }) => ({
          value: code,
          label: name,
        }))}
        onChange={({ value }) => {
          dispatch(setLanguage({ language: value }));
        }}
      />
    </div>
  );
};

export default LanguageSelector;
