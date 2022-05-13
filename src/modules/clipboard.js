let copyToClip = () => Promise.reject();

if (window.VOCASCAN_CONFIG.ENV === "electron") {
  copyToClip = ({ text }) => {
    return window.electron.ipcRenderer.invoke("copy-to-clip", { text });
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
