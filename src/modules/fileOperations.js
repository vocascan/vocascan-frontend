import { nodeRequire } from "../utils";

let openFile = () => new Promise.reject();
let saveFile = () => new Promise.reject();

if (window.VOCASCAN_CONFIG.ENV === "electron") {
  const { ipcRenderer } = nodeRequire("electron");

  openFile = () => {
    return ipcRenderer.invoke("open-file");
  };

  saveFile = ({ title, text }) => {
    return ipcRenderer.invoke("save-file", { title, text });
  };
}

export { openFile, saveFile };
