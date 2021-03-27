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

  if (isDev) {
    // load redux and react dev tools
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require("electron-devtools-installer");

    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name) => {
        console.log(`Added Extension:  ${name}`);

        // open dev tools
        mainWindow.webContents.openDevTools();

        mainWindow.loadURL("http://localhost:3000");
      })
      .catch((err) => console.log("An error occurred: ", err));
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
  }

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
