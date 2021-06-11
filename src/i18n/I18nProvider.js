import i18n from "i18next";
import React, { useEffect } from "react";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { useSelector } from "react-redux";

import de from "./locales/de/default.json";
import en from "./locales/en/default.json";
import pl from "./locales/pl/default.json";
import ru from "./locales/ru/default.json";

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: ["en"],
  interpolation: { escapeValue: false },
  lng: "en",
  load: "all",
  defaultNS: "default",
  react: { useSuspense: true },
  resources: {
    de: { default: de },
    en: { default: en },
    pl: { default: pl },
    ru: { default: ru },
  },
});

function I18nProvider({ children }) {
  const language = useSelector((state) => state.setting.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default I18nProvider;

export const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch (German)" },
  { code: "pl", name: "Polski (Polish)" },
  { code: "ru", name: "Pусский (Russian)" },
];
