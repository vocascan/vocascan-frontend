import i18n from "i18next";
import React from "react";
import { initReactI18next, I18nextProvider } from "react-i18next";

import de from "./locales/de/default.json";
import en from "./locales/en/default.json";

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
  },
});

function I18nProvider({ children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default I18nProvider;
