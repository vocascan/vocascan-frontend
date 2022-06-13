import deepmerge from "deepmerge";
import isElectron from "is-electron";

const defaultConfig = {
  ENV: undefined,
  BASE_URL: "",
  SHOW_PLANS: undefined,
  THEME_SELECT: "auto",
  themes: {
    dark: "default-themes/dark.css",
    light: "default-themes/light.css",
  },
};

const envVars = Object.entries(process.env).reduce((acc, [key, value]) => {
  if (key.startsWith("REACT_APP_VOCASCAN_")) {
    acc[key.replace(/^REACT_APP_VOCASCAN_/, "")] = value;
  }
  return acc;
}, {});

window.VOCASCAN_CONFIG = deepmerge.all([
  defaultConfig,
  window.VOCASCAN_CONFIG,
  envVars,
]);

// detect env automatically if not set
if (window.VOCASCAN_CONFIG.ENV === undefined) {
  window.VOCASCAN_CONFIG.ENV = isElectron() ? "electron" : "web";
}

// if SHOW_PLANS is not configured but a BASE_URL is configured -> dont show the plans
if (window.VOCASCAN_CONFIG.SHOW_PLANS === undefined) {
  window.VOCASCAN_CONFIG.SHOW_PLANS = !window.VOCASCAN_CONFIG.BASE_URL;
}
