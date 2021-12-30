import { nodeRequire } from "../utils";

let updateNotifier = null;
let startUpdate = null;
const available = window.VOCASCAN_CONFIG.ENV === "electron";

if (available) {
  const { ipcRenderer } = nodeRequire("electron");

  updateNotifier = ipcRenderer;

  startUpdate = () => {
    ipcRenderer.send("start-update");
  };
}

export { updateNotifier, startUpdate, available };
