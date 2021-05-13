import ReactCountryFlag from "react-country-flag";

export const languages = [
  { name: "German", countryCode: "DE" },
  { name: "English", countryCode: "GB" },
  { name: "Spanisch", countryCode: "ES" },
  { name: "Portuguese", countryCode: "PT" },
  { name: "Turkish", countryCode: "TR" },
  { name: "Russian", countryCode: "RU" },
  { name: "French", countryCode: "FR" },
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
