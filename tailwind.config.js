module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        nav: "calc(100vh - 64px)",
      },
      fontFamily: {
        sans: ["Roboto"],
      },
      colors: {
        background: {
          standard: "#fff",
          inverse: "#2a2e36",
          muted: "#eceeee",
          modal: "#00000066",
        },
        alternative: "#1c1c1a",
        form: "#252421",
        boxShadow: "#212121",
        mainText: {
          standard: "#212121",
          light: "#383838",
          inverse: "#fff",
          90: "#363746",
          80: "#4d4d5b",
          70: "#63636f",
          60: "#797984",
          50: "#8f8f98",
          40: "#a6a6ad",
          30: "#bbbbc1",
          20: "#d2d2d6",
          10: "#e8e8ea",
        },
        primary: {
          standard: "#727cf5",
          light: "#bec2f3",
          90: "#7f88f5",
          80: "#8e96f7",
          70: "#9ca3f7",
          60: "#aab0f9",
          50: "#b8bdf9",
          40: "#c6cafb",
          30: "#d4d7fb",
          20: "#e2e4fd",
          10: "#f0f1fd",
          dark: {
            standard: "#4c51ec",
            90: "#6469ee",
            80: "#767af0",
            70: "#868af2",
            60: "#989bf4",
            50: "#a9abf5",
            40: "#babcf7",
            30: "#cbccf9",
            20: "#dcddfb",
            10: "#edeefd",
          },
        },
        white: "#fff",
        grey: "#cbcbcb",
        red: {
          standard: "#ff586e",
          light: "#f9c5cc",
          dark: "#fd334e",
        },
        green: {
          standard: "#0acf97",
          light: "#c8f1e5",
          dark: "#06b483",
        },
      },
    },
  },
  plugins: [],
};
