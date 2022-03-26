export const vocascanServer = "https://web.vocascan.com";

export const pages = {
  legalNotice: "/p/legal-notice",
  privacyPolicy: "/p/privacy-policy",
  termsAndConditions: "/p/terms-and-conditions",
};

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
    {
      name: "noctera",
      description: "25.11.2020",
      url: "https://github.com/noctera",
      imageUrl: "https://github.com/noctera.png",
    },
    {
      name: "luwol03",
      description: "17.03.2021",
      url: "https://github.com/luwol03",
      imageUrl: "https://github.com/luwol03.png",
    },
    {
      name: "zikowang",
      description: "16.03.2021",
      url: "https://github.com/zikowang",
      imageUrl: "https://github.com/zikowang.png",
    },
  ],
  server: [
    {
      name: "noctera",
      description: "25.11.2020",
      url: "https://github.com/noctera",
      imageUrl: "https://github.com/noctera.png",
    },
    {
      name: "luwol03",
      description: "16.12.2020",
      url: "https://github.com/luwol03",
      imageUrl: "https://github.com/luwol03.png",
    },
    { name: "retfloww", description: `08.01.2021\n-\n10.03.2021` },
  ],
  translator: [
    {
      name: "noctera",
      description: "Deutsch",
      url: "https://github.com/noctera",
      imageUrl: "https://github.com/noctera.png",
    },
    {
      name: "luwol03",
      description: "Deutsch",
      url: "https://github.com/luwol03",
      imageUrl: "https://github.com/luwol03.png",
    },
    { name: "retfloww", description: "Polski" },
    {
      name: "Florian-Sabonchi",
      description: "Deutsch",
      url: "https://github.com/Florian-Sabonchi",
      imageUrl: "https://github.com/Florian-Sabonchi.png",
    },
    {
      name: "Dimbel Me",
      description: "español",
      url: "https://localazy.com/p/vocascan/contributors/dimbel-me",
      imageUrl: "https://cdn.localazy.com/user-images/_a8279093027763773803",
    },
  ],
  miscellaneous: [
    {
      name: "rgabisch",
      description: "Logo",
      url: "https://github.com/rgabisch",
      imageUrl: "https://github.com/rgabisch.png",
    },
    {
      name: "DevMimas",
      description: "Management, Docs",
      url: "https://github.com/DevMimas",
      imageUrl: "https://github.com/DevMimas.png",
    },
  ],
};

export const additionalDependencies = {
  "flag-icon-css": "Flags are copied from this great package",
};

export const inviteTimeSpans = [
  1 * 1 * 30 * 60, // 30 minutes
  1 * 1 * 60 * 60, // 60 minutes
  1 * 6 * 60 * 60, // 6 hours
  1 * 12 * 60 * 60, // 12 hours
  1 * 24 * 60 * 60, // 1 day
  7 * 24 * 60 * 60, // 7 days
  null, // infinity
];
