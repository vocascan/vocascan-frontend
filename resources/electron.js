const path = require("path");
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

app.allowRendererProcessReuse = true;
log.transports.file.level = "debug";
autoUpdater.logger = log;
autoUpdater.autoDownload = false;

const windows = {
  main: null,
  splash: null,
};

const timerIds = {
  showInterval: null,
  checkForUpdates: null,
};

const TIMES = {
  beforeQuitAndUpdate: 2000,
  beforeStart: 2000,
  checkLaunchingInterval: 500,
  checkUpdate: 1 * 60 * 60 * 1000, // every hour
};

let mainIsReady = false;
let splashShowEnough = false;
let updateAvailable = false;

const createWindow = () => {
  // Create the main window.
  windows.main = new BrowserWindow({
    width: 1440,
    height: 900,
    icon: path.join(__dirname, "../src/images/logo/vocascan-round-linux.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
    show: false,
  });

  // Create the main window.
  windows.splash = new BrowserWindow({
    width: 350,
    height: 450,
    icon: path.join(__dirname, "../src/images/logo/vocascan-round-linux.png"),
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    show: false,
  });

  windows.splash.loadURL(
    `file://${path.join(__dirname, "../resources/splash/splash-screen.html")}`
  );

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
        windows.main.webContents.openDevTools();

        // load dev server with hot reload
        windows.main.loadURL("http://localhost:3000");
      })
      .catch((err) => console.log("An error occurred: ", err));
  } else {
    // load static react build from build folder
    windows.main.loadURL(
      `file://${path.join(__dirname, "../build/index.html")}`
    );
  }

  // clear memory
  windows.main.on("closed", () => (windows.main = null));
  windows.splash.on("closed", () => (windows.splash = null));

  windows.splash.once("ready-to-show", () => {
    if (!isDev) {
      windows.splash.show();

      setTimeout(() => {
        splashShowEnough = true;
      }, TIMES.beforeStart);

      // start update check
      autoUpdater.checkForUpdates();
    }
  });

  windows.main.once("ready-to-show", () => {
    if (!isDev) {
      mainIsReady = true;
    }
  });
};

const launch = () => {
  timerIds.showInterval = setInterval(() => {
    if (mainIsReady && splashShowEnough) {
      // clear waiting interval
      clearInterval(timerIds.showInterval);

      windows.main.show();
      windows.splash.destroy();
    }
  }, TIMES.checkLaunchingInterval);
};

const updateNotify = (isDarwin, info) => {
  // clear check for updates interval
  clearInterval(timerIds.checkForUpdates);

  // send notification to main window
  windows.main.webContents.send("update-available", isDarwin, info);

  // show push notification
  const notification = {
    title: `Vocascan ${info.version} is available!`,
  };

  if (isDarwin) {
    notification.body = "You have to download and install the update yourself.";
  } else {
    notification.body = "Update will be automatically installed on exit";
  }

  new Notification(notification).show();
};

app.on("ready", () => {
  createWindow();

  if (isDev) {
    windows.main.show();
  }

  // check for updates interval
  if (!isDev) {
    timerIds.checkForUpdates = setInterval(() => {
      autoUpdater.checkForUpdates();
    }, TIMES.checkUpdate);
  }
});

ipcMain.on("start-update", () => {
  if (updateAvailable && !isDev) {
    autoUpdater.quitAndInstall();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (windows.main === null) {
    createWindow();
  }
});

autoUpdater.on("checking-for-update", () => {
  if (windows.splash) {
    windows.splash.webContents.send("check");
  }
});

autoUpdater.on("update-available", (info) => {
  if (process.platform !== "darwin") {
    // download update if platform is not darwin
    autoUpdater.downloadUpdate();
  }

  if (windows.splash) {
    // check if mac -> cannot update without certificate
    if (process.platform !== "darwin") {
      windows.splash.webContents.send("download", info);
    } else {
      launch();
    }
  }

  if (windows.main && process.platform === "darwin") {
    updateNotify(true, info);
  }
});

autoUpdater.on("update-not-available", (info) => {
  if (windows.splash) {
    windows.splash.webContents.send("launch", info);

    launch();
  }
});

autoUpdater.on("download-progress", (progress) => {
  if (windows.splash) {
    const formatted = Math.floor(progress.percent);
    windows.splash.webContents.send("progress", formatted);
    windows.splash.setProgressBar(formatted);
  }
});

autoUpdater.on("update-downloaded", (info) => {
  updateAvailable = true;

  if (windows.splash) {
    windows.splash.webContents.send("relaunch", info);

    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, TIMES.beforeQuitAndUpdate);
  }

  if (windows.main) {
    updateNotify(false, info);
  }
});
