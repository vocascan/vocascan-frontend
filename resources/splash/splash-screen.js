const { ipcRenderer } = require("electron");

const header = document.getElementById("header");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const launchBtn = document.getElementById("launch");

launchBtn.addEventListener("click", () => {
  ipcRenderer.send("skip-check");
});

ipcRenderer.on("check", (_event) => {
  header.textContent = "Checking for updates...";
  launchBtn.style.display = "initial";
});

ipcRenderer.on("skipCheck", (_event) => {
  header.textContent = "Skipping update checks...";
  launchBtn.style.display = "none";
});

ipcRenderer.on("launch", (_event) => {
  header.textContent = "Launching...";
  launchBtn.style.display = "none";
});

ipcRenderer.on("relaunch", (_event) => {
  header.textContent = "Restarting...";
  launchBtn.style.display = "none";
});

ipcRenderer.on("download", (_event) => {
  header.textContent = "Downloading update...";
  launchBtn.style.display = "none";
});

ipcRenderer.on("progress", (_event, percentage) => {
  progress.style.display = "inherit";
  launchBtn.style.display = "none";
  header.textContent = `Downloading update... (${percentage}%)`;
  progressBar.style.width = `${percentage}%`;
});
