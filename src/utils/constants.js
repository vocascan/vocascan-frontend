import ReactCountryFlag from "react-country-flag";

export const languages = [
  {
    id: 0,
    name: "Deutsch",
    icon: (
      <ReactCountryFlag
        className="flag"
        style={{
          width: null,
          height: null,
        }}
        countryCode="DE"
        svg
      />
    ),
  },
  {
    id: 1,
    name: "Englisch",
    icon: (
      <ReactCountryFlag
        className="flag"
        style={{
          width: null,
          height: null,
        }}
        countryCode="GB"
        svg
      />
    ),
  },
  {
    id: 2,
    name: "Spanisch",
    icon: (
      <ReactCountryFlag
        className="flag"
        style={{
          width: null,
          height: null,
        }}
        countryCode="ES"
        svg
      />
    ),
  },
  {
    id: 3,
    name: "Portugisisch",
    icon: (
      <ReactCountryFlag
        className="flag"
        style={{
          width: null,
          height: null,
        }}
        countryCode="PT"
        svg
      />
    ),
  },
  {
    id: 4,
    name: "Türkisch",
    icon: (
      <ReactCountryFlag
        className="flag"
        style={{
          width: null,
          height: null,
        }}
        countryCode="TR"
        svg
      />
    ),
  },
  {
    id: 5,
    name: "Russisch",
    icon: (
      <ReactCountryFlag
        className="flag"
        style={{
          width: null,
          height: null,
        }}
        countryCode="RU"
        svg
      />
    ),
  },
  {
    id: 6,
    name: "Französisch",
    icon: (
      <ReactCountryFlag
        className="flag"
        style={{
          width: null,
          height: null,
        }}
        countryCode="FR"
        svg
      />
    ),
  },
];

export const vocascanServer = "https://vocascan.com"; // TODO: add domain later

export const maxTranslations = 10;

export const defaultLimit = 100;
