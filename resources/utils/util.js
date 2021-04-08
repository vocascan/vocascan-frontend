const os = require("os");
const { app } = require("electron");

const { commit, date } = require("../../package.json");

/**
 * Calculate day difference between two dates
 * See: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
 * @param {Date} date1 first date
 * @param {Date} date2 second date
 * @returns {Number}
 */
const dayDateDiff = (date1, date2) => {
  const timeDiff = date2.getTime() - date1.getTime();

  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

/**
 * Get app version string
 * @returns {String}
 */
const getVersionString = () => {
  let dateString = "unknown";

  if (date && !isNaN(new Date(date))) {
    const jsDate = new Date(date);
    dateString = `${jsDate.toISOString()} (${dayDateDiff(
      jsDate,
      new Date()
    )} days ago)`;
  }

  const versionString = `
      Version: ${app.getVersion()}
      Commit: ${commit || "unknown"}
      Date: ${dateString}
      Electron: ${process.versions.electron}
      Chrome: ${process.versions.chrome}
      Node.js: ${process.versions.node}
      V8: ${process.versions.v8}
      OS: ${os.type()} ${os.arch()} ${os.release()}
    `;

  return versionString;
};

module.exports = {
  dayDateDiff,
  getVersionString,
};
