/* Scale a value from one range to another
 * Example of use:
 *
 * // Convert 33 from a 0-100 range to a 0-65535 range
 * var n = scaleValue(33, [0,100], [0,65535]);
 *
 * // Ranges don't have to be positive
 * var n = scaleValue(0, [-50,+50], [0,65535]);
 *
 * Ranges are defined as arrays of two values, inclusive
 *
 * The ~~ trick on return value does the equivalent of Math.floor, just faster.
 *
 * See: https://gist.github.com/fpillet/993002
 */
export const scaleValue = (value, from, to) => {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
};
/**
 * Format a language object
 * @param {Object} language Language object
 * @returns {String} Language string
 */
export const getLanguageString = (language, nativeNames = true) =>
  nativeNames
    ? `${language?.nativeNames?.[0]} (${language?.name})`
    : `${language?.name}`;

/**
 *
 * @param {String} language language code
 * @param {Array} languages Array of all languages from server
 * @returns {Object} language object
 */
export const findLanguageByCode = (language, languages) =>
  languages.find((lang) => language === lang.code);

/**
 *
 * @param {Integer} ms milliseconds to wait
 * @returns {Promise} Promise object
 */
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Calculate day difference between two dates
 * See: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
 * @param {Date} date1 first date
 * @param {Date} date2 second date
 * @returns {Number}
 */
export const dayDateDiff = (date1, date2) => {
  const timeDiff = date2.getTime() - date1.getTime();

  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

/**
 * Return the length of a string in bytes
 * See: https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
 * @param {String} string string
 * @returns bytesLength
 */
export const bytesLength = (string) => new TextEncoder().encode(string).length;

export const prefersDarkTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;
