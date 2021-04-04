const { ipcRenderer } = require("electron");

const header = document.getElementById("header");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");

ipcRenderer.on("check", (_event) => {
  header.textContent = "Checking for updates...";
});

ipcRenderer.on("skipCheck", (_event) => {
  header.textContent = "Skipping update checks...";
});

ipcRenderer.on("launch", (_event) => {
  header.textContent = "Starting...";
});

ipcRenderer.on("relaunch", (_event) => {
  header.textContent = "Restarting...";
});

ipcRenderer.on("download", (_event) => {
  header.textContent = "Downloading update...";
});

ipcRenderer.on("progress", (_event, percentage) => {
  progress.style.display = "inherit";
  header.textContent = `Downloading update... (${percentage}%)`;
  progressBar.style.width = `${percentage}%`;
});
