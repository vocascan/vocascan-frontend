/**
 *See: https://stackoverflow.com/questions/34828722/how-can-i-make-webpack-skip-a-require/34830466
 */
export const nodeRequire = eval("require"); // eslint-disable-line no-eval

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
