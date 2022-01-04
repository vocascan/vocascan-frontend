let updateNotifier = null;
let startUpdate = null;
const available = window.VOCASCAN_CONFIG.ENV === "electron";

if (available) {
  updateNotifier = window.electron;

  startUpdate = () => {
    window.electron.send("start-update");
  };
}

export { updateNotifier, startUpdate, available };
