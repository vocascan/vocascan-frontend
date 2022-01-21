let getDesktopVersions = () => Promise.resolve();

if (window.VOCASCAN_CONFIG.ENV === "electron") {
  getDesktopVersions = () => {
    return window.electron.invoke("getVersions");
  };
}

export { getDesktopVersions };
