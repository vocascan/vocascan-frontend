// See: https://stackoverflow.com/questions/34828722/how-can-i-make-webpack-skip-a-require/34830466
export const nodeRequire = eval("require"); // eslint-disable-line no-eval

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
