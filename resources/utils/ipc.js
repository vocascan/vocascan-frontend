const { ipcMain, dialog, clipboard } = require("electron");
const { autoUpdater } = require("electron-updater");

const { getVersionString } = require("./util");

const RegisterIpcHandler = () => {
  ipcMain.on("checkForUpdates", () => {
    autoUpdater.checkForUpdates();
  });

  ipcMain.on("openAbout", async () => {
    const versionString = getVersionString();

    const { response } = await dialog.showMessageBox({
      type: "info",
      title: "Vocascan",
      message: versionString,
      noLink: true,
      buttons: ["Ok", "Copy"],
    });

    if (response === 1) {
      clipboard.writeText(versionString);
    }
  });
};

module.exports = {
  RegisterIpcHandler,
};
