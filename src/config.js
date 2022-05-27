import isElectron from "is-electron";

window.VOCASCAN_CONFIG = {
  // inject default config options
  ENV: undefined,
  BASE_URL: "",
  SHOW_PLANS: undefined,

  // inject build variables
  ...Object.entries(process.env).reduce((acc, [key, value]) => {
    if (key.startsWith("REACT_APP_VOCASCAN_")) {
      acc[key.replace(/^REACT_APP_VOCASCAN_/, "")] = value;
    }

    return acc;
  }, {}),

  // inject already existing config options
  ...window.VOCASCAN_CONFIG,
};

// detect env automatically if not set
if (window.VOCASCAN_CONFIG.ENV === undefined) {
  window.VOCASCAN_CONFIG.ENV = isElectron() ? "electron" : "web";
}

// if SHOW_PLANS is not configured but a BASE_URL is configured -> dont show the plans
if (window.VOCASCAN_CONFIG.SHOW_PLANS === undefined) {
  window.VOCASCAN_CONFIG.SHOW_PLANS = !window.VOCASCAN_CONFIG.BASE_URL;
}

export const consumeSafeAreInsets = () => {
  if (window.VOCASCAN_CONFIG.ENV !== "mobile") {
    return true;
  }

  const insets = window.VOCASCAN_CONFIG.safeAreaInsets;

  if (insets) {
    document.documentElement.style.setProperty(
      "--safe-area-inset-top",
      `${insets.top}px`
    );
    document.documentElement.style.setProperty(
      "--safe-area-inset-right",
      `${insets.right}px`
    );
    document.documentElement.style.setProperty(
      "--safe-area-inset-bottom",
      `${insets.bottom}px`
    );
    document.documentElement.style.setProperty(
      "--safe-area-inset-left",
      `${insets.left}px`
    );
  }

  return !!insets;
};
