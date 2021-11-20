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
  ...(isMac
    ? [
        { role: "appMenu", label: "Vocascan" },
        {
          label: "Edit",
          submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            {
              label: "Redo",
              accelerator: "Shift+CmdOrCtrl+Z",
              selector: "redo:",
            },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            {
              label: "Select All",
              accelerator: "CmdOrCtrl+A",
              selector: "selectAll:",
            },
          ],
        },
      ]
    : []),
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
