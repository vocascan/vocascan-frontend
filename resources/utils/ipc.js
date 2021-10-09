const { ipcMain, dialog, clipboard } = require("electron");
const { autoUpdater } = require("electron-updater");
const fs = require("fs");

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

  ipcMain.handle("save-file", async (event, arg) => {
    await dialog
      .showSaveDialog({
        title: arg.head,
        defaultPath: `./${arg.title}`,
        // Restricting the user to only json Files.
        filters: [
          {
            name: "JSON file",
            extensions: ["json"],
          },
        ],
        properties: [],
      })
      .then((file) => {
        if (!file.canceled) {
          // Creating and Writing to the json file
          fs.writeFile(file.filePath.toString(), arg.text, (err) => {
            if (err) throw err;
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  });

  ipcMain.handle("open-file", async (event, arg) => {
    return new Promise((resolve, reject) => {
      dialog
        .showOpenDialog({
          filters: [
            {
              name: "JSON file",
              extensions: ["json"],
            },
          ],
          properties: ["openFile"],
        })
        .then((file) => {
          fs.readFile(file.filePaths[0], "utf8", (err, data) => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              // Catch error in case file doesn't exist or isn't valid JSON
              reject(e);
            }
          });
        })
        .catch((err) => {
          throw err;
        });
    });
  });
};

module.exports = {
  RegisterIpcHandler,
};
