let openFile = () => Promise.reject();
let saveFile = () => Promise.reject();

if (window.VOCASCAN_CONFIG.ENV === "electron") {
  openFile = () => {
    return window.electron.invoke("open-file");
  };

  saveFile = ({ title, text }) => {
    return window.electron.invoke("save-file", { title, text });
  };
}

export { openFile, saveFile };
