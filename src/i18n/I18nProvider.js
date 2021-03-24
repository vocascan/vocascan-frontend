import React from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";

import en from "./locales/en.json";
import de from "./locales/de.json";

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: ["en"],
  interpolation: { escapeValue: false },
  lng: "en-EN",
  load: "all",
  react: { useSuspense: true },
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
});

function I18nProvider({ children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default I18nProvider;
