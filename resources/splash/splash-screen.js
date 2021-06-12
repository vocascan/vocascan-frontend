const { ipcRenderer } = require("electron");

const header = document.getElementById("header");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const launchBtn = document.getElementById("launch");

let locale;

launchBtn.addEventListener("click", () => {
  ipcRenderer.send("skip-check");
});

ipcRenderer.on("translations", (_event, translations) => {
  locale = translations;
  launchBtn.innerText = locale.skipButton;
});

ipcRenderer.on("check", (_event) => {
  header.textContent = locale.check;
  launchBtn.style.display = "initial";
});

ipcRenderer.on("skipCheck", (_event) => {
  header.textContent = locale.skipCheck;
  launchBtn.style.display = "none";
});

ipcRenderer.on("launch", (_event) => {
  header.textContent = locale.starting;
  launchBtn.style.display = "none";
});

ipcRenderer.on("relaunch", (_event) => {
  header.textContent = locale.restarting;
  launchBtn.style.display = "none";
});

ipcRenderer.on("download", (_event) => {
  header.textContent = locale.download;
  launchBtn.style.display = "none";
});

ipcRenderer.on("progress", (_event, percentage) => {
  progress.style.display = "inherit";
  launchBtn.style.display = "none";
  header.textContent = `${locale.download} (${percentage}%)`;
  progressBar.style.width = `${percentage}%`;
});
