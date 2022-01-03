let openFile = () => Promise.reject();

if (window.VOCASCAN_CONFIG.ENV === "electron") {
  openFile = () => {
    return window.electron.invoke("open-file");
  };
}

const saveFile = ({ input, name, type }) => {
  //create temp a tag to download file
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(input)], {
    type,
  });
  element.href = URL.createObjectURL(file);
  element.href = URL.createObjectURL(file);
  element.download = `${name}.json`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

export { openFile, saveFile };
