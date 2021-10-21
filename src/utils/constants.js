export const vocascanServer = "https://server.vocascan.com";

export const maxTranslations = 10;

export const defaultLimit = 100;

export const minServerVersion = "1.0.0";

export const maxTextareaLength = 255;
export const maxUsernameLength = 32;
export const maxNameLength = 55;
export const maxTextfieldLength = 255;
export const maxDescriptionLength = 255;
export const rightVocabs = [1, 10];
export const numberField = [1, 255];

export const contributors = {
  desktop: [
    { name: "noctera", description: "25.11.2020" },
    { name: "luwol03", description: "17.03.2021" },
    { name: "zikowang", description: "16.03.2021" },
  ],
  server: [
    { name: "noctera", description: "25.11.2020" },
    { name: "luwol03", description: "16.12.2020" },
    { name: "retfloww", description: "08.01.2021" },
  ],
  translator: [
    { name: "noctera", description: "Deutsch" },
    { name: "luwol03", description: "Deutsch" },
    { name: "retfloww", description: "Polski" },
    { name: "FlorianJSa", description: "Deutsch" },
  ],
  miscellaneous: [
    { name: "rgabisch", description: "Logo" },
    { name: "DevMimas", description: "Management, Docs" },
  ],
};

export const additionalDependencies = {
  "flag-icon-css": "Flags are copied from this great package",
};

export const timeSpans = [
  {
    value: 30,
    format: "m",
    label: "30 Minutes",
  },
  {
    value: 1,
    format: "h",
    label: "1 Hour",
  },
  {
    value: 6,
    format: "h",
    label: "6 Hours",
  },
  {
    value: 12,
    format: "h",
    label: "12 Hours",
  },
  {
    value: 1,
    format: "d",
    label: "1 Day",
  },
  {
    value: 7,
    format: "d",
    label: "7 Days",
  },
  {
    value: null,
    format: "d",
    label: "never",
  },
];
