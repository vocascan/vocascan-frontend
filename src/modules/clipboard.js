import { nodeRequire } from "../utils";

let copyToClip = () => new Promise.reject();

if (window.VOCASCAN_CONFIG.ENV === "electron") {
  const { ipcRenderer } = nodeRequire("electron");

  copyToClip = ({ text }) => {
    return ipcRenderer.invoke("copy-to-clip", { text });
  };
}

if (window.VOCASCAN_CONFIG.ENV === "web") {
  if (navigator.clipboard) {
    copyToClip = ({ text }) => {
      return navigator.clipboard.writeText(text);
    };
  }
}

export { copyToClip };
