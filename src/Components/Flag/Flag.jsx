import React from "react";

import { countryFlags, languageCountryMap } from "./language-country-map.js";

import "./Flag.scss";

const Flag = ({ languageCode }) => {
  let code = null;

  if (countryFlags.includes(languageCode)) {
    code = languageCode;
  } else if (languageCountryMap[languageCode]) {
    code = languageCountryMap[languageCode];
  }

  return <span className={`flag flag-${code || "unknown"}`} />;
};

export default Flag;
