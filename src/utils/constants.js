import ReactCountryFlag from "react-country-flag";

export const languages = [
  { name: "Deutsch", countryCode: "DE" },
  { name: "Englisch", countryCode: "GB" },
  { name: "Spanisch", countryCode: "ES" },
  { name: "Portugisisch", countryCode: "PT" },
  { name: "Türkisch", countryCode: "TR" },
  { name: "Russisch", countryCode: "RU" },
  { name: "Französisch", countryCode: "FR" },
].map((language) => ({
  ...language,
  icon: (
    <ReactCountryFlag
      className="flag"
      style={{
        width: null,
        height: null,
      }}
      countryCode={language.countryCode}
      svg
    />
  ),
}));

export const vocascanServer = "https://vocascan.com"; // TODO: add domain later

export const maxTranslations = 10;

export const defaultLimit = 100;

export const minServerVersion = "0.1.0";

export const maxTextareaLength = 250;
