window.VOCASCAN_CONFIG = {
  // inject default config options
  ENV: "web",

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
