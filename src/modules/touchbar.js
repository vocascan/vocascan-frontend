let touchbarSelect = () => Promise.reject();
let touchbarReset = () => Promise.reject();

const available = window.VOCASCAN_CONFIG.ENV === "electron";

if (available) {
  touchbarSelect = ({ options }) => {
    return window.electron.invoke("touchbar:select", { options });
  };
  touchbarReset = () => {
    return window.electron.invoke("touchbar:reset");
  };
}

export { touchbarSelect, touchbarReset, available };
