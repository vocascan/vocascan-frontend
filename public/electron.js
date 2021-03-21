const path = require("path");
const electron = require("electron");
const isDev = require("electron-is-dev");

const { app, BrowserWindow } = electron;
let mainWindow = null;

app.allowRendererProcessReuse = true;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    icon: path.join(__dirname, "../src/images/vocascan-logo.png"),
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
