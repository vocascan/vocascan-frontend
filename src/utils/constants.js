import ReactCountryFlag from "react-country-flag";

import store from "../redux/Store/index";

function getLanguages() {
  // grab current state
  const state = store.getState();

  // get the JWT token out of it
  // (obviously depends on how your store is structured)
  return state.language.languages;
}

export const languages = getLanguages().map((language) => ({
  ...language,
  icon: (
    <ReactCountryFlag
      className="flag"
      style={{
        width: null,
        height: null,
      }}
      countryCode={language.code}
      svg
    />
  ),
}));

export const vocascanServer = "https://vocascan.com"; // TODO: add domain later

export const maxTranslations = 10;

export const defaultLimit = 100;

export const minServerVersion = "0.1.0";
