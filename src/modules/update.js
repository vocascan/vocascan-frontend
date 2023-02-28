let updateNotifier = null;
let startUpdate = null;
const available = window.VOCASCAN_CONFIG.ENV === "electron";

if (available) {
  updateNotifier = window.electron.ipcRenderer;

  startUpdate = () => {
    window.electron.ipcRenderer.send("start-update");
  };
}

export { updateNotifier, startUpdate, available };
