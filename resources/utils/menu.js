const { shell, ipcMain } = require("electron");
const {
  DOCUMENTATION_URL,
  ORGANIZATION_URL,
  DISCUSSION_URL,
  ISSUES_URL,
} = require("./constants");

const SEPARATOR = { type: "separator" };

const LINK_ENTRY = (label, url) => ({
  label,
  click: async () => {
    await shell.openExternal(url);
  },
});

const IPC_ENTRY = (label, event) => ({
  label,
  click: () => {
    ipcMain.emit(event);
  },
});

const isMac = process.platform === "darwin";

const MENU_TEMPLATE = [
  ...(isMac ? [{ role: "appMenu", label: "Vocascan" }] : []),
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  {
    label: "Help",
    submenu: [
      LINK_ENTRY("Documentation", DOCUMENTATION_URL),
      LINK_ENTRY("Learn More", ORGANIZATION_URL),
      LINK_ENTRY("Community Discussions", DISCUSSION_URL),
      LINK_ENTRY("Search Issues", ISSUES_URL),
      SEPARATOR,
      IPC_ENTRY("Check for updates", "checkForUpdates"),
      SEPARATOR,
      IPC_ENTRY("About", "openAbout"),
    ],
  },
];

module.exports = {
  MENU_TEMPLATE,
};
